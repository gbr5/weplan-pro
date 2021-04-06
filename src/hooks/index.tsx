import React from 'react';

import { EmployeeAuthProvider } from './employeeAuth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { FormProvider } from './form';
import { ContactPageProvider } from './contactPages';
import { ManagementModuleProvider } from './managementModules';
import { CompanyContactContextProvider } from './companyContacts';
import { StageCardProvider } from './stageCard';
import { FunnelProvider } from './funnel';
import { SignUpProvider } from './signUp';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <ToastProvider>
      <SignUpProvider>
        <EmployeeAuthProvider>
          <CompanyContactContextProvider>
            <FormProvider>
              <ManagementModuleProvider>
                <FunnelProvider>
                  <StageCardProvider>
                    <ContactPageProvider>{children}</ContactPageProvider>
                  </StageCardProvider>
                </FunnelProvider>
              </ManagementModuleProvider>
            </FormProvider>
          </CompanyContactContextProvider>
        </EmployeeAuthProvider>
      </SignUpProvider>
    </ToastProvider>
  </ThemeModeProvider>
);

export default AppProvider;
