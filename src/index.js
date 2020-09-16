import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import env from '.env';
import Users from './components/UsersComponent/Users.component';
import UserDetails from './components/UserDetails/UserDetails.component';

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
  const [editThisUser, setEditThisUser] = useState({});

  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Users
              {...props}
              refreshData={refetch}
              users={data.allUsers}
              setEditThisUser={setEditThisUser}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={(props) => (
            <Users
              {...props}
              users={data.allUsers}
              setEditThisUser={setEditThisUser}
            />
          )}
        />
        <Route
          path="/user-details"
          render={(props) => (
            <UserDetails {...props} user={editThisUser} refreshData={refetch} />
          )}
        />
      </Switch>
    </div>
  );
};

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
