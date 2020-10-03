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
  console.log(match);
  console.log(user);

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

  console.log(data);

  const [role, setRole] = useState(user.role);
  const [name, setName] = useState(user.name);

  // const [role, setRole] = useState(data.user.role);
  // const [name, setName] = useState(data.user.name);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  //
  // if (error) {
  //   return <p>Error: {JSON.stringify(error)}</p>;
  // }

  // grabbing state of role to capture current role or submit a change in the role
  // grabbing state of name to capture current name or submit a change in the name

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
      variables: { email: user.email, name: name, role: role },
    }).then(() => refreshData());
  };

  // we want to let the user know there data was save since we are not automatically going back to
  // to a refreshed user page
  // const successMessage = (er, dat) => {
  //   if (er) {
  //     return (
  //       <div>
  //         Uh oh! There's trouble in paradise...
  //         <br />
  //         Error details: {er}
  //       </div>
  //     );
  //   }
  //   if (dat) {
  //     return (
  //       <div>
  //         Data saved Successfully!
  //         <br />
  //         <strong>Name</strong>: {dat.updateUser.name}
  //         <br />
  //         <strong>Role</strong>: {dat.updateUser.role}
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
            <th>{user.email}</th>
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
      {/*{successMessage(error, data)}*/}
    </form>
  );
};
export default UserDetails;
