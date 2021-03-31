import React, { createContext, useCallback, useState, useContext } from 'react';
import IUserDTO from '../dtos/IUserDTO';

import api from '../services/api';

interface ICompanyAuthState {
  token: string;
  company: IUserDTO;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IGoogleSignInCredentials {
  email: string;
  googleToken: string;
}

interface ICompanyAuthContextData {
  company: IUserDTO;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateCompany(company: IUserDTO): void;
  signInWithGoogle(credentials: IGoogleSignInCredentials): void;
}

const CompanyAuthContext = createContext<ICompanyAuthContextData>(
  {} as ICompanyAuthContextData,
);

const CompanyAuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ICompanyAuthState>(() => {
    const token = localStorage.getItem('@WP-PRO:token');
    const company = localStorage.getItem('@WP-PRO:company');

    if (token && company) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        company: JSON.parse(company),
      };
    }

    return {} as ICompanyAuthState;
  });

  const signInWithGoogle = useCallback(async ({ email, googleToken }) => {
    const response = await api.post('google-pro-sessions', {
      email,
      token: googleToken,
    });

    const { token, company } = response.data;

    const findSupplier = await api.get(
      `/supplier-companys/company/${company.user.id}/${company.company.id}`,
    );
    const isSupplier = findSupplier.data;

    if (!isSupplier.id || isSupplier === undefined || isSupplier === '') {
      throw new Error('user not found');
    }

    localStorage.setItem('@WP-PRO:token', token);
    localStorage.setItem('@WP-PRO:company', JSON.stringify(company));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      company,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WP-PRO:company');
    localStorage.removeItem('@WP-PRO:token');

    setData({} as ICompanyAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/pro', {
      email,
      password,
    });

    const { token, company } = response.data;

    const findSupplier = await api.get(
      `/supplier-companys/company/${company.user.id}/${company.company.id}`,
    );
    const isSupplier = findSupplier.data;

    if (!isSupplier.id || isSupplier === undefined || isSupplier === '') {
      throw new Error('user not found');
    }

    localStorage.setItem('@WP-PRO:token', token);
    localStorage.setItem('@WP-PRO:company', JSON.stringify(company));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      company,
    });
  }, []);

  const updateCompany = useCallback(
    (updatedUser: IUserDTO) => {
      localStorage.setItem('@WP-PRO:company', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        company: updatedUser,
      });
    },
    [data],
  );

  return (
    <CompanyAuthContext.Provider
      value={{
        company: data.company,
        signIn,
        signOut,
        updateCompany,
        signInWithGoogle,
      }}
    >
      {children}
    </CompanyAuthContext.Provider>
  );
};

function useCompanyAuth(): ICompanyAuthContextData {
  const context = useContext(CompanyAuthContext);

  if (!context) {
    throw new Error(
      'useCompanyAuth must be used within an CompanyAuthProvider',
    );
  }

  return context;
}

export { CompanyAuthProvider, useCompanyAuth };
