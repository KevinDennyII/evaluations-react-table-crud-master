import React from 'react';
import { Link } from 'react-router-dom';
import { showActiveForEdit, rectangle } from './UsersTableRow.module.scss';

const UsersTableRow = ({ userSelected, user, handleSelect }) => {
  // setting up a default to avoid undefined error if the user object hsa no data

  const printRoleName = (role) => {
    if (Object.is(role, 'DEVELOPER')) return 'Developer';
    if (Object.is(role, 'APP_MANAGER')) return 'App Manager';
    if (Object.is(role, 'SALES')) return 'Sales';
    if (Object.is(role, 'MARKETING')) return 'Marketing';
    if (Object.is(role, 'ADMIN')) return 'Admin';
  };

  const { email = '', name = '', role = '' } = user;

  return (
    <tr className={rectangle}>
      <td style={{ width: '4px' }}>
        <input
          name={email}
          type="checkbox"
          onChange={handleSelect}
          style={{ margin: '15px' }}
        />
      </td>
      <td>
        <Link
          className={showActiveForEdit}
          id={email}
          to={`/user-details/${email}`}
          onClick={userSelected}
        >
          {email}
        </Link>
      </td>
      <td>{name}</td>
      <td>{printRoleName(role)}</td>
    </tr>
  );
};

export default UsersTableRow;
