import React, { createContext, useCallback, useState, useContext } from 'react';
import IEmployeeDTO from '../dtos/IEmployeeDTO';

import api from '../services/api';

interface IEmployeeAuthState {
  token: string;
  employee: IEmployeeDTO;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IGoogleSignInCredentials {
  email: string;
  googleToken: string;
}

interface IEmployeeAuthContextData {
  employee: IEmployeeDTO;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  getEmployee(id: string): void;
  updateEmployee(employee: IEmployeeDTO): void;
  signInWithGoogle(credentials: IGoogleSignInCredentials): void;
}

const EmployeeAuthContext = createContext<IEmployeeAuthContextData>(
  {} as IEmployeeAuthContextData,
);

const EmployeeAuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IEmployeeAuthState>(() => {
    const token = localStorage.getItem('@WP-PRO:token');
    const employee = localStorage.getItem('@WP-PRO:employee');

    if (token && employee) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        employee: JSON.parse(employee),
      };
    }

    return {} as IEmployeeAuthState;
  });

  const getEmployee = useCallback(async (id: string) => {
    try {
      const response = await api.get<IEmployeeDTO>(`supplier-employees/${id}`);

      localStorage.setItem('@WP-PRO:employee', JSON.stringify(response.data));
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const signInWithGoogle = useCallback(async ({ email, googleToken }) => {
    const response = await api.post('google-employee-pro-sessions', {
      email,
      token: googleToken,
    });

    const { token, employee } = response.data;

    const findSupplier = await api.get(
      `/supplier-employees/employee/${employee.user.id}/${employee.company.id}`,
    );
    const isSupplier = findSupplier.data;

    if (!isSupplier.id || isSupplier === undefined || isSupplier === '') {
      throw new Error('user not found');
    }

    localStorage.setItem('@WP-PRO:token', token);
    localStorage.setItem('@WP-PRO:employee', JSON.stringify(employee));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      employee,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@WP-PRO:employee');
    localStorage.removeItem('@WP-PRO:token');

    setData({} as IEmployeeAuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('employee-pro-sessions', {
      email,
      password,
    });

    const { token, employee } = response.data;

    const findSupplier = await api.get(
      `/supplier-employees/employee/${employee.id}`,
    );
    const isSupplier = findSupplier.data;

    if (!isSupplier.id || isSupplier === undefined || isSupplier === '') {
      throw new Error('user not found');
    }

    localStorage.setItem('@WP-PRO:token', token);
    localStorage.setItem('@WP-PRO:employee', JSON.stringify(employee));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      employee,
    });
  }, []);

  const updateEmployee = useCallback(
    (updatedUser: IEmployeeDTO) => {
      localStorage.setItem('@WP-PRO:employee', JSON.stringify(updatedUser));

      setData({
        token: data.token,
        employee: updatedUser,
      });
    },
    [data],
  );

  return (
    <EmployeeAuthContext.Provider
      value={{
        employee: data.employee,
        signIn,
        signOut,
        updateEmployee,
        getEmployee,
        signInWithGoogle,
      }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
};

function useEmployeeAuth(): IEmployeeAuthContextData {
  const context = useContext(EmployeeAuthContext);

  if (!context) {
    throw new Error(
      'useEmployeeAuth must be used within an EmployeeAuthProvider',
    );
  }

  return context;
}

export { EmployeeAuthProvider, useEmployeeAuth };
