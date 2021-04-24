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
import ComercialKanbanDashboard from '../components/ComercialKabanDashboard';
import SettingsPage from '../pages/SettingsPage';
import ComercialFunnelSettings from '../components/FunnelSettingsComponents/ComercialFunnelSettings';
import EmployeesSection from '../components/EmployeesSection';
import ContactPageDashboard from '../components/ContactPageComponents/ContactPageDashboard';

const Routes: React.FC = () => {
  const { employee } = useEmployeeAuth();
  const { selectedCard } = useStageCard();
  const { selectedFunnel } = useFunnel();
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/form/:id" exact component={UserForm} />
      <Route path="/success-message/:id" exact component={SuccessPage} />
      <Route path="/welcome" exact component={WelcomePage} />
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />
      {employee && employee.id && selectedCard && selectedCard.id && (
        <Route path="/card/:card_name" exact component={CardPage} isPrivate />
      )}
      {employee && employee.id && selectedCard && selectedCard.id && (
        <Route
          path="/card/new/:card_name/"
          exact
          component={CardPage}
          isPrivate
        />
      )}
      {employee && employee.id && selectedFunnel && selectedFunnel.id && (
        <Route
          path="/funnel/:funnel_name"
          exact
          component={ComercialKanbanDashboard}
          isPrivate
        />
      )}
      <Route path="/e-links" exact component={ContactPageDashboard} isPrivate />
      <Route path="/settings" exact component={SettingsPage} isPrivate />
      <Route path="/employees" exact component={EmployeesSection} isPrivate />
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
