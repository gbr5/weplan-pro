import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import SupplierDashboard from '../pages/SupplierDashboard';
import UserForm from '../pages/UserForm';
import SuccessPage from '../pages/SuccessPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignUp} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/form/:id" exact component={UserForm} />
      <Route path="/success-message/:id" exact component={SuccessPage} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/dashboard" exact component={SupplierDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
