import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

import EventHostDashboard from '../pages/EventHostDashboard';
import SupplierDashboard from '../pages/SupplierDashboard';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/profile" exact component={Profile} isPrivate />
      <Route
        path="/dashboard/my-event/:name"
        exact
        component={EventHostDashboard}
        isPrivate
      />
      <Route path="/dashboard" exact component={SupplierDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
