import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';

import { SignInPage } from './components/pages/SignIn.page';
import { SignUpPage } from './components/pages/SignUp.page';
import { SetupDetailsPage } from './components/pages/SetupDetails.page';
import { AuthenticatedPage } from './components/pages/Authenticated.page';

import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Router>
        <Switch>
          {/* Sign in and sign up */}
          <Route path="/signin" component={SignInPage} />
          <Route path="/signup" component={SignUpPage} />

          {/* Setup */}
          <PrivateRoute exact path="/setupdetails" component={SetupDetailsPage} />

          {/* App */}
          <PrivateRoute path="/" component={AuthenticatedPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
