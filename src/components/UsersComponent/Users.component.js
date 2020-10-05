import React, { useState } from 'react';
import ResetUsers from '../ResetUsers/ResetUsers.component';
import {
  userHeaderRow,
  userGrid,
  userGridTitle,
  userTableTitle,
  deleteBtn,
} from './Users.module.scss';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import UsersTableRow from '../UsersTableRow/UsersTableRow.component';

const Users = ({ users, setEditThisUser, refreshData }) => {
  const [selected, setSelected] = useState({});
  const [disableBtnValue, setDisableBtnValue] = useState(true);

  // capture all users that have been selected for deletion
  // email has a boolean flag for true(checked) or false(unchecked)
  const handleSelectedUsersForDelete = (e) => {
    selected[e.target.name] = e.target.checked;
    setSelected(selected);

    // saving flag for disable attribute of delete button
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
      // if a users flag is true
      if (selectedUser[1]) {
        deleteTheseUsers = [...deleteTheseUsers, selectedUser[0]];
      }
      setSelected({}); //reset selected list to empty
      return deleteTheseUsers;
    });

    // execute GraphQL mutation
    return deleteUsers({
      variables: { emails: deleteTheseUsers },
    }).then(() => refreshData());
  };

  return (
    <div>
      <ResetUsers refreshData={refreshData} />
      <form onSubmit={onDelete}>
        <div style={{ padding: '3rem' }}>
          <div className={userGridTitle}>
            <div className={userTableTitle}>Users</div>
            <div>
              <button
                type="submit"
                className={deleteBtn}
                style={{ float: 'right' }}
                disabled={disableBtnValue}
              >
                Delete
              </button>
            </div>
          </div>
          <div className={`${userGrid} ${userHeaderRow}`}>
            <label> </label>
            <label>Email</label>
            <label>Name</label>
            <label>Role</label>
          </div>
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
        </div>
      </form>
    </div>
  );
};
export default Users;
