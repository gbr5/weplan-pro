import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { FormProvider } from './form';
import { ContactPageProvider } from './contactPages';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>
        <FormProvider>
          <ContactPageProvider>{children}</ContactPageProvider>
        </FormProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
