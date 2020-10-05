import React from 'react';
import { Link } from 'react-router-dom';
import {
  showActiveForEdit,
  rectangle,
  userRole,
  userName,
  selectUserToDelete,
} from './UsersTableRow.module.scss';
import { userGrid } from '../UsersComponent/Users.module.scss';

const UsersTableGridRow = ({ userSelected, user, handleSelect }) => {
  const { email = '', name = '', role = '' } = user;

  const printRoleName = (role) => {
    if (Object.is(role, 'DEVELOPER')) return 'Developer';
    if (Object.is(role, 'APP_MANAGER')) return 'App Manager';
    if (Object.is(role, 'SALES')) return 'Sales';
    if (Object.is(role, 'MARKETING')) return 'Marketing';
    if (Object.is(role, 'ADMIN')) return 'Admin';
  };
  return (
    <div className={`${userGrid} ${rectangle}`}>
      <div>
        <input
          name={email}
          type="checkbox"
          onChange={handleSelect}
          className={selectUserToDelete}
        />
      </div>
      <div>
        <Link
          className={showActiveForEdit}
          id={email}
          to={`/user-details/${email}`}
          onClick={userSelected}
        >
          {email}
        </Link>
      </div>
      <div className={userRole}>{name}</div>
      <div className={userName}>{printRoleName(role)}</div>
    </div>
  );
};

export default UsersTableGridRow;
