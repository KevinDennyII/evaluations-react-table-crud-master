import React, { useState } from 'react';
import UsersTableRow from '../UsersTableRow/UsersTableRow.component';
import UserDetails from '../UserDetails/UserDetails.component';
import ResetUsers from '../ResetUsers/ResetUsers.component';
import { userTable, userTableTop, userHeaderRow } from './Users.module.scss';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const Users = ({ users }) => {
  const [selected, setSelected] = useState({});
  const [editThisUser, setEditThisUser] = useState(users[0]);
  const [disableBtnValue, setDisableBtnValue] = useState(true);

  // capture all users that have been selected for deletion
  // email has a boolean flag for true(checked) or false(unchecked)
  const handleSelectedUsersForDelete = (e) => {
    selected[e.target.name] = e.target.checked;
    setSelected(selected);

    // saving flag for disable attribute of button
    let val = Object.values(selected).every(isSelected);
    setDisableBtnValue(val);
  };
  // Helper function for handleSelectedUsersForDelete
  const isSelected = (currentValue) => {
    if (currentValue === false) return true;
  };

  // saving user selected for editing
  const userSelectedForEditing = (e) => {
    let result = users.find((user) => Object.is(user.email, e.target.id));
    setEditThisUser(result);
  };

  // GraphQL mutation for updating a user
  const DELETE_USERS_QUERY = gql`
    mutation DeleteUsers($emails: [ID]!) {
      deleteUsers(emails: $emails)
    }
  `;
  const [deleteUsers] = useMutation(DELETE_USERS_QUERY);

  const onDelete = (e) => {
    e.preventDefault();
    // grab selected users for delete
    let deleteTheseUsers = [];
    Object.entries(selected).map((selectedUser) => {
      if (selectedUser[1]) {
        deleteTheseUsers = [...deleteTheseUsers, selectedUser[0]];
      }
      return deleteTheseUsers;
    });

    // execute GraphQL mutation
    return deleteUsers({
      variables: { emails: deleteTheseUsers },
    }).then((r) => console.log(r));
  };

  return (
    <div>
      <ResetUsers />
      <form onSubmit={onDelete}>
        <table className={userTable}>
          <thead>
            <tr className={userTableTop}>
              <th>Users</th>
              <th />
              <th />
              <th>
                <button
                  type="submit"
                  style={{ float: 'right' }}
                  disabled={disableBtnValue}
                >
                  Delete
                </button>
              </th>
            </tr>
            <tr className={userHeaderRow}>
              <th />
              <th>EMAIL</th>
              <th>NAME</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {/* mapping of user */}
            {users.map((user) => {
              return (
                <UsersTableRow
                  key={user.email}
                  userSelected={userSelectedForEditing}
                  user={user}
                  selected={selected[user.email]}
                  handleSelect={handleSelectedUsersForDelete}
                />
              );
            })}
          </tbody>
        </table>
      </form>
      <UserDetails user={editThisUser} />
    </div>
  );
};
export default Users;
