import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface IModules {
  id: string;
  management_module: string;
  access_level: number;
}
interface IConfirmation {
  id: string;
  sender_id: string;
  receiver_id: string;
  isConfirmed: boolean;
  title: string;
  message: string;
}
interface ICompanyInfo {
  name: string;
  company_id: string;
  logo_url: string;
}
interface IPersonInfo {
  first_name: string;
  last_name: string;
  person_id: string;
}
interface IUserEmployee {
  id: string;
  email: string;
  position: string;
  employee_avatar: string;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface IAuthState {
  token: string;
  userEmployee: IUserEmployee;
  company: IUser;
  companyInfo: ICompanyInfo;
  person: IUser;
  personInfo: IPersonInfo;
  modules: IModules[];
  confirmation: IConfirmation;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  userEmployee: IUserEmployee;
  company: IUser;
  companyInfo: ICompanyInfo;
  person: IUser;
  personInfo: IPersonInfo;
  modules: IModules[];
  confirmation: IConfirmation;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUserEmployee(userEmployee: IUserEmployee): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@WP-PRO:token');
    const userEmployee = localStorage.getItem('@WP-PRO:userEmployee');
    const company = localStorage.getItem('@WP-PRO:company');
    const companyInfo = localStorage.getItem('@WP-PRO:companyInfo');
    const person = localStorage.getItem('@WP-PRO:person');
    const personInfo = localStorage.getItem('@WP-PRO:personInfo');
    const modules = localStorage.getItem('@WP-PRO:modules');
    const confirmation = localStorage.getItem('@WP-PRO:confirmation');

    if (
      token &&
      userEmployee &&
      company &&
      companyInfo &&
      person &&
      personInfo &&
      modules &&
      confirmation
    ) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        userEmployee: JSON.parse(userEmployee),
        company: JSON.parse(company),
        companyInfo: JSON.parse(companyInfo),
        person: JSON.parse(person),
        personInfo: JSON.parse(personInfo),
        modules: JSON.parse(modules),
        confirmation: JSON.parse(confirmation),
      };
    }

    return {} as IAuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@WP-PRO:token');
    localStorage.removeItem('@WP-PRO:userEmployee');
    localStorage.removeItem('@WP-PRO:company');
    localStorage.removeItem('@WP-PRO:companyInfo');
    localStorage.removeItem('@WP-PRO:person');
    localStorage.removeItem('@WP-PRO:personInfo');
    localStorage.removeItem('@WP-PRO:modules');
    localStorage.removeItem('@WP-PRO:confirmation');

    setData({} as IAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions/pro', {
      email,
      password,
    });
    console.log(response.data);

    const {
      token,
      userEmployee,
      company,
      companyInfo,
      person,
      personInfo,
      modules,
      confirmation,
    } = response.data;

    const findSupplier = await api.get(
      `/supplier-employees/employee/${person.id}/${company.id}`,
    );
    const isSupplier = findSupplier.data;
    console.log(isSupplier);

    if (!isSupplier.id || isSupplier === undefined || isSupplier === '') {
      throw new Error('user not found');
    }

    localStorage.setItem('@WP-PRO:token', token);
    localStorage.setItem('@WP-PRO:userEmployee', JSON.stringify(userEmployee));
    localStorage.setItem('@WP-PRO:company', JSON.stringify(company));
    localStorage.setItem('@WP-PRO:companyInfo', JSON.stringify(companyInfo));
    localStorage.setItem('@WP-PRO:person', JSON.stringify(person));
    localStorage.setItem('@WP-PRO:personInfo', JSON.stringify(personInfo));
    localStorage.setItem('@WP-PRO:modules', JSON.stringify(modules));
    localStorage.setItem('@WP-PRO:confirmation', JSON.stringify(confirmation));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      userEmployee,
      company,
      companyInfo,
      person,
      personInfo,
      modules,
      confirmation,
    });
  }, []);

  const updateUserEmployee = useCallback(
    (updatedUser: IUserEmployee) => {
      localStorage.setItem('@WP-PRO:userEmployee', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        userEmployee: updatedUser,
        company: data.company,
        companyInfo: data.companyInfo,
        person: data.person,
        personInfo: data.personInfo,
        modules: data.modules,
        confirmation: data.confirmation,
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        userEmployee: data.userEmployee,
        company: data.company,
        companyInfo: data.companyInfo,
        person: data.person,
        personInfo: data.personInfo,
        modules: data.modules,
        confirmation: data.confirmation,
        signIn,
        signOut,
        updateUserEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must bu used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
