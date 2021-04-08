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
import { useStageCard } from '../hooks/stageCard';
import CardPage from '../components/CardPage';
import { useEmployeeAuth } from '../hooks/employeeAuth';
import { useFunnel } from '../hooks/funnel';
import KanbanDashboard from '../components/KabanDashboard';
import SettingsPage from '../pages/SettingsPage';
import ComercialFunnelSettings from '../components/FunnelSettingsComponents/ComercialFunnelSettings';

const Routes: React.FC = () => {
  const { employee } = useEmployeeAuth();
  const { selectedCard } = useStageCard();
  const { selectedFunnel } = useFunnel();
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/form/:id" exact component={UserForm} />
      <Route path="/success-message/:id" exact component={SuccessPage} />
      <Route path="/wellcome" exact component={WelcomePage} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
      {employee && employee.id && selectedCard && selectedCard.id && (
        <Route path="/card/:card_name" exact component={CardPage} isPrivate />
      )}
      {employee && employee.id && selectedFunnel && selectedFunnel.id && (
        <Route
          path="/funnel/:funnel_name"
          exact
          component={KanbanDashboard}
          isPrivate
        />
      )}
      <Route path="/settings" exact component={SettingsPage} isPrivate />
      <Route
        path="/settings/comercial"
        exact
        component={ComercialFunnelSettings}
        isPrivate
      />
      <Route path="/dashboard" exact component={SupplierDashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
