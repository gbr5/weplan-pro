import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { FormProvider } from './form';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>
        <FormProvider>{children}</FormProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
