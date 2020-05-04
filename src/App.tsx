import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import Main from './components/Main';

function App() {

  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Main} />
        {/* <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> */}
      </Switch>
    </Layout>
  );
}

export default App;
