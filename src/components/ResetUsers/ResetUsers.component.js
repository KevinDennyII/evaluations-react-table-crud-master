import React from 'react';
import { editTip } from './ResetUsers.module.scss';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const ResetUsers = () => {
  // GraphQL mutation for updating a user
  const RESET_USERS_QUERY = gql`
    mutation ResetUsers {
      resetUsers
    }
  `;
  const [resetUsers] = useMutation(RESET_USERS_QUERY);

  const reset = () => {
    return resetUsers().then((r) => console.log(r));
  };

  return (
    <form onSubmit={reset}>
      <button type="submit" style={{ margin: '5px' }}>
        Reset Users
      </button>
      <br />
      <span className={editTip}>
        * To edit a user please click on the user's email address
      </span>
    </form>
  );
};

export default ResetUsers;
