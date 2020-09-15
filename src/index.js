import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
//import env from '.env';

import Users from './components/UsersComponent/Users.component';

//const apolloEndPoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const apolloApiKey = process.env.REACT_APP_GRAPHQL_API_KEY;
const apolloEndPoint =
  process.env.NODE_ENV === 'production'
    ? 'https://dn6jtahorvekvabij3ziq3rsk4.appsync-api.us-east-1.amazonaws.com/graphql'
    : process.env.REACT_APP_GRAPHQL_ENDPOINT;

console.log(process.env);
const client = new ApolloClient({
  uri: apolloEndPoint,
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': apolloApiKey,
      },
    });
  },
});

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Users users={data.allUsers} />
    </div>
  );
};

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
