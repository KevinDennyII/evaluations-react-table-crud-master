import React from 'react';
import { resetNotice } from './ResetUsers.module.scss';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const ResetUsers = ({ refreshData }) => {
  // GraphQL mutation for resetting api data to default
  const RESET_USERS_QUERY = gql`
    mutation ResetUsers {
      resetUsers
    }
  `;
  const [resetUsers] = useMutation(RESET_USERS_QUERY);

  const reset = (e) => {
    e.preventDefault();
    return resetUsers().then(() => refreshData());
  };

  return (
    <form onSubmit={reset}>
      <button type="submit" style={{ margin: '5px' }}>
        Reset Users
      </button>
      <br />
      <span className={resetNotice}>
        * Allow a couple seconds for data to be reset
        <br />* To edit a user click on the email address
      </span>
    </form>
  );
};

export default ResetUsers;
