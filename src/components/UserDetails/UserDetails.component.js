import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  line,
  userDetailsTable,
  userDetailsTableTop,
  saveBtn,
} from './UserDetails.module.scss';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

const UserDetails = ({ location, history, match, user, refreshData }) => {
  const [role, setRole] = useState(user.role);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  // GraphQL query for user
  const USER_QUERY = gql`
    query User($email: ID!) {
      user(email: $email) {
        email
        name
        role
      }
    }
  `;

  // grabbing param Id for querying user
  const { data } = useQuery(USER_QUERY, {
    variables: { email: match.params.emailId },
  });

  useEffect(() => {
    if (data) {
      setRole(data.user.role);
      setName(data.user.name);
      setEmail(data.user.email);
    }
  }, [data]);

  // capturing selected role
  const onChangeValueRoles = (e) => {
    setRole(e.target.value);
  };

  // capturing updated name
  const onChangeValueName = (e) => {
    setName(e.target.value);
  };

  // GraphQL mutation for updating a user
  const UPDATE_USER_QUERY = gql`
    mutation UpdateUser($email: ID!, $name: String!, $role: Role!) {
      updateUser(email: $email, newAttributes: { name: $name, role: $role }) {
        email
        name
        role
      }
    }
  `;
  const [updateUser] = useMutation(UPDATE_USER_QUERY);

  const onSubmit = (e) => {
    e.preventDefault();

    return updateUser({
      variables: { email, name, role },
    }).then(() => refreshData());
  };

  // we want to let the user know there data was save since we are not automatically going back to
  // to a refreshed user page
  // const successMessage = (er) => {
  //   if (er) {
  //     return (
  //       <div>
  //         Uh oh! There's trouble in paradise...
  //         <br />
  //         Error details: {er}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         Data saved Successfully!
  //         <br />
  //         <strong>Name</strong>: {updateUser.name}
  //         <br />
  //         <strong>Role</strong>: {updateUser.role}
  //       </div>
  //     );
  //   }
  // };

  return (
    <form onSubmit={onSubmit}>
      <Link to="/">Back to Users</Link>
      <table className={userDetailsTable}>
        <thead>
          <tr className={userDetailsTableTop}>
            <th>{email}</th>
            <th>
              <button
                className={saveBtn}
                type="submit"
                style={{ float: 'right' }}
              >
                Save
              </button>
            </th>
          </tr>
        </thead>
        <tbody style={{ paddingTop: '2px' }}>
          <tr>
            <td className={line}>
              Name
              <br />
              <input value={name} onChange={onChangeValueName} type="text" />
            </td>
            <td>
              Role
              <br />
              <div>
                <input
                  type="radio"
                  value="ADMIN"
                  onChange={onChangeValueRoles}
                  checked={Object.is(role, 'ADMIN')}
                  name="admin"
                />{' '}
                Admin
                <br />
                <input
                  type="radio"
                  value="DEVELOPER"
                  onChange={onChangeValueRoles}
                  checked={Object.is(role, 'DEVELOPER')}
                  name="developer"
                />{' '}
                Developer
                <br />
                <input
                  type="radio"
                  value="APP_MANAGER"
                  onChange={onChangeValueRoles}
                  checked={Object.is(role, 'APP_MANAGER')}
                  name="app manager"
                />{' '}
                App Manager
                <br />
                <input
                  type="radio"
                  value="MARKETING"
                  onChange={onChangeValueRoles}
                  checked={Object.is(role, 'MARKETING')}
                  name="marketing"
                />{' '}
                Marketing
                <br />
                <input
                  type="radio"
                  value="SALES"
                  onChange={onChangeValueRoles}
                  checked={Object.is(role, 'SALES')}
                  name="sales"
                />{' '}
                Sales
                <br />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/*{successMessage(error)}*/}
    </form>
  );
};
export default UserDetails;
