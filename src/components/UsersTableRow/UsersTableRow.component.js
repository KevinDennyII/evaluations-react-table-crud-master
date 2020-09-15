import React from 'react';
import { showActiveForEdit } from './UsersTableRow.module.scss';

const UsersTableRow = ({ userSelected, user, handleSelect }) => {
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
      <td id={email} onClick={userSelected} className={showActiveForEdit}>
        {email}
      </td>
      <td>{name}</td>
      <td>{role}</td>
    </tr>
  );
};

export default UsersTableRow;
