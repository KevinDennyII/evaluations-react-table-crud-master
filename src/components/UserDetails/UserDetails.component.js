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
  // when the page is refreshed the user object is empty so defaults are needed to be set
  const { role = '', name = '', email = '' } = user;

  const [userRole, setUserRole] = useState(user.role || '');
  const [userName, setUserName] = useState(user.name || '');
  const [userEmail, setUserEmail] = useState(user.email || '');

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
      setUserRole(data.user.role);
      setUserName(data.user.name);
      setUserEmail(data.user.email);
    }
  }, [data]);

  // capturing selected role
  const onChangeValueRoles = (e) => {
    setUserRole(e.target.value);
  };

  // capturing updated name
  const onChangeValueName = (e) => {
    setUserName(e.target.value);
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

  return (
    <form onSubmit={onSubmit}>
      <Link to="/">Back to Users</Link>
      <table className={userDetailsTable}>
        <thead>
          <tr className={userDetailsTableTop}>
            <th>{userEmail}</th>
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
              <input
                value={userName}
                onChange={onChangeValueName}
                type="text"
              />
            </td>
            <td>
              Role
              <br />
              <div>
                <input
                  type="radio"
                  value="ADMIN"
                  onChange={onChangeValueRoles}
                  checked={Object.is(userRole, 'ADMIN')}
                  name="admin"
                />{' '}
                Admin
                <br />
                <input
                  type="radio"
                  value="DEVELOPER"
                  onChange={onChangeValueRoles}
                  checked={Object.is(userRole, 'DEVELOPER')}
                  name="developer"
                />{' '}
                Developer
                <br />
                <input
                  type="radio"
                  value="APP_MANAGER"
                  onChange={onChangeValueRoles}
                  checked={Object.is(userRole, 'APP_MANAGER')}
                  name="app manager"
                />{' '}
                App Manager
                <br />
                <input
                  type="radio"
                  value="MARKETING"
                  onChange={onChangeValueRoles}
                  checked={Object.is(userRole, 'MARKETING')}
                  name="marketing"
                />{' '}
                Marketing
                <br />
                <input
                  type="radio"
                  value="SALES"
                  onChange={onChangeValueRoles}
                  checked={Object.is(userRole, 'SALES')}
                  name="sales"
                />{' '}
                Sales
                <br />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
export default UserDetails;
