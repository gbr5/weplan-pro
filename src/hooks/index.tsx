import React from 'react';

import { EmployeeAuthProvider } from './employeeAuth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { FormProvider } from './form';
import { ContactPageProvider } from './contactPages';
import { ManagementModuleProvider } from './managementModules';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <EmployeeAuthProvider>
      <ToastProvider>
        <FormProvider>
          <ManagementModuleProvider>
            <ContactPageProvider>{children}</ContactPageProvider>
          </ManagementModuleProvider>
        </FormProvider>
      </ToastProvider>
    </EmployeeAuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
