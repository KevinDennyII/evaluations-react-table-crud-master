import React from 'react';
import { Link } from 'react-router-dom';
import { showActiveForEdit } from './UsersTableRow.module.scss';

const UsersTableRow = ({ userSelected, user, handleSelect }) => {
  // setting up a default to avoid undefined error if the user object hsa no data

  // const printRoleName = (role) => {
  //   if (Object.is(role, 'DEVELOPER')) return 'Developer';
  //   if (Object.is(role, 'APP_MANAGER')) return 'App Manager';
  //   if (Object.is(role, 'SALES')) return 'Sales';
  //   if (Object.is(role, 'MARKETING')) return 'Marketing';
  //   if (Object.is(role, 'ADMIN')) return 'Admin';
  // };

  const { email = '', name = '', role = '' } = user;
  return (
    <tr>
      <td style={{ width: '4px' }}>
        <input
          name={email}
          type="checkbox"
          onChange={handleSelect}
          style={{ margin: '15px' }}
        />
      </td>
      <td className={showActiveForEdit}>
        <Link id={email} to="/user-details" onClick={userSelected}>
          {email}
        </Link>
      </td>
      <td>{name}</td>
      <td>{role}</td>
    </tr>
  );
};

export default UsersTableRow;
