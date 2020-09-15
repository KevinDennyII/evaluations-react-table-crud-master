import React, { useState } from 'react';
import {
  userDetailsTable,
  userDetailsTableTop,
  line,
} from './UserDetails.module.scss';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const UserDetails = ({ user }) => {
  // grabbing state of role to capture current role or submit a change in the role
  // grabbing state of name to capture current name or submit a change in the name
  const [role, setRole] = useState(user.role);
  const [name, setName] = useState(user.name);

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

  const onSubmit = () => {
    return updateUser({
      variables: { email: user.email, name: name, role: role },
    }).then((r) => console.log(r));
  };

  return (
    <form onSubmit={onSubmit}>
      <table className={userDetailsTable}>
        <thead>
          <tr className={userDetailsTableTop}>
            <th>{user.email}</th>
            <th>
              <button type="submit" style={{ float: 'right' }}>
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
    </form>
  );
};
export default UserDetails;
