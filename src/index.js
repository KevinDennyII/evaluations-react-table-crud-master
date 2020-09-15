import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
//import env from '.env';

import Users from './components/UsersComponent/Users.component';

// process.env.REACT_APP_GRAPHQL_ENDPOINT
// process.env.REACT_APP_GRAPHQL_API_KEY

const client = new ApolloClient({
  uri:
    'https://dn6jtahorvekvabij3ziq3rsk4.appsync-api.us-east-1.amazonaws.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        'x-api-key': 'da2-jfxhcmqg6jhgjjzdca2w2d5o7m',
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
