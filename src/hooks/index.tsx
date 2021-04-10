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
import { HomeControllerProvider } from './homeController';
import { TaskProvider } from './task';
import { CompanyEmployeeProvider } from './companyEmployee';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <ToastProvider>
      <SignUpProvider>
        <EmployeeAuthProvider>
          <CompanyEmployeeProvider>
            <CompanyContactContextProvider>
              <FormProvider>
                <ManagementModuleProvider>
                  <TaskProvider>
                    <FunnelProvider>
                      <StageCardProvider>
                        <ContactPageProvider>
                          <HomeControllerProvider>
                            {children}
                          </HomeControllerProvider>
                        </ContactPageProvider>
                      </StageCardProvider>
                    </FunnelProvider>
                  </TaskProvider>
                </ManagementModuleProvider>
              </FormProvider>
            </CompanyContactContextProvider>
          </CompanyEmployeeProvider>
        </EmployeeAuthProvider>
      </SignUpProvider>
    </ToastProvider>
  </ThemeModeProvider>
);

export default AppProvider;
