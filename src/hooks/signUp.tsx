import React, { createContext, useCallback, useState, useContext } from 'react';
import ICompanyInfoDTO from '../dtos/ICompanyInfoDTO';
import IUserDTO from '../dtos/IUserDTO';

import api from '../services/api';
import { useToast } from './toast';

interface IEmailProps {
  email: string;
}

interface INameProps {
  name: string;
}

interface ISignUpContextData {
  companyCreated: boolean;
  masterCreated: boolean;
  selectedEmail: string;
  selectedName: string;
  selectedUser: IUserDTO;
  selectEmail(email: string): void;
  selectName(name: string): void;
  selectUser(user: IUserDTO): void;
  createCompany(pass: string): void;
  createUser(pass: string): Promise<IUserDTO>;
  getUserByEmail(email: string): Promise<IUserDTO | undefined>;
  getUserByName(name: string): Promise<IUserDTO | undefined>;
  getUserProfile(id: string): Promise<IUserDTO | undefined>;
  getCompanyInfoByName(name: string): Promise<ICompanyInfoDTO | undefined>;
}

const SignUpContext = createContext<ISignUpContextData>(
  {} as ISignUpContextData,
);

const SignUpProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [companyCreated, setCompanyCreated] = useState(false);
  const [masterCreated, setMasterCreated] = useState(false);
  const [selectedUser, setSelectedUser] = useState({} as IUserDTO);

  const selectEmail = useCallback((email: string) => {
    setSelectedEmail(email);
  }, []);
  const selectName = useCallback((name: string) => {
    setSelectedName(name);
  }, []);

  const selectUser = useCallback((user: IUserDTO) => {
    if (user && !user.id) {
      setSelectedUser({} as IUserDTO);
    }
    setSelectedUser(user);
  }, []);

  const getUserByEmail = useCallback(async (email: string) => {
    try {
      const response = await api.get<IUserDTO | undefined>(
        `/user/name-or-email?email=${email}`,
      );
      if (response.data && response.data.id) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getUserProfile = useCallback(async (id: string) => {
    try {
      const response = await api.get<IUserDTO | undefined>(
        `/profile/external/${id}`,
      );

      if (response.data) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getUserByName = useCallback(async (name: string) => {
    try {
      const response = await api.get<IUserDTO | undefined>(
        `/user/name-or-email?name=${name}`,
      );

      if (response.data) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getCompanyInfoByName = useCallback(async (name: string) => {
    try {
      const response = await api.get<ICompanyInfoDTO | undefined>(
        `/find-company-info-by-name/${name.trim()}`,
      );

      if (response && response.data && response.data.id) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const createCompany = useCallback(
    async (pass: string) => {
      try {
        const hash = Math.random() * 1000000;
        const now = new Date();
        const response = await api.post('/users', {
          name: selectedName,
          email: selectedEmail,
          password: pass,
          isCompany: true,
        });
        await api.post(`/company-info`, {
          name: selectedName,
          company_id: `${hash}-${selectedName}-${now}`,
          user_id: response.data.id,
        });
        await api.post(`/company/activation`, {
          email: selectedEmail,
        });
        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
        });
        setCompanyCreated(true);
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast, selectedName, selectedEmail],
  );

  const createUser = useCallback(
    async (pass: string) => {
      try {
        const response = await api.post('/users', {
          name: selectedName,
          email: selectedEmail,
          password: pass,
          isCompany: false,
        });
        setSelectedUser(response.data);
        await api.post(`/user/activation`, {
          email: selectedEmail,
        });
        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
        });
        setMasterCreated(true);
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast, selectedName, selectedEmail],
  );

  return (
    <SignUpContext.Provider
      value={{
        companyCreated,
        getUserProfile,
        selectedEmail,
        selectEmail,
        selectedName,
        selectedUser,
        selectUser,
        selectName,
        getUserByEmail,
        getUserByName,
        getCompanyInfoByName,
        createCompany,
        createUser,
        masterCreated,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

function useSignUp(): ISignUpContextData {
  const context = useContext(SignUpContext);

  if (!context) {
    throw new Error('useSignUp must be used within an SignUpProvider');
  }

  return context;
}

export { SignUpProvider, useSignUp };
