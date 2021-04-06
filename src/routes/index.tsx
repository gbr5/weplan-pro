import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import SupplierDashboard from '../pages/SupplierDashboard';
import UserForm from '../pages/UserForm';
import SuccessPage from '../pages/SuccessPage';
import WelcomePage from '../pages/WelcomePage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/form/:id" exact component={UserForm} />
      <Route path="/success-message/:id" exact component={SuccessPage} />
      <Route path="/wellcome" exact component={WelcomePage} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/dashboard" exact component={SupplierDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
