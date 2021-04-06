import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import IManagementModuleDTO from '../dtos/IManagementModuleDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';

interface IManagementModuleContextData {
  employeeModules: IManagementModuleDTO[];
  getEmployeeModules(): Promise<void>;
}

const ManagementModuleContext = createContext<IManagementModuleContextData>(
  {} as IManagementModuleContextData,
);

const ManagementModuleProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const [employeeModules, setEmployeeModules] = useState<
    IManagementModuleDTO[]
  >([]);

  const getEmployeeModules = useCallback(async () => {
    try {
      const response = await api.get<IManagementModuleDTO[]>(
        `employee-management-modules/${employee.id}`,
      );
      setEmployeeModules(response.data);
      localStorage.setItem(
        '@WP-PRO:employee-modules',
        JSON.stringify(response.data),
      );
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  useEffect(() => {
    const modules = localStorage.getItem('@WP-PRO:employee-modules');
    if (modules) {
      const parsedModules = JSON.parse(modules);
      setEmployeeModules(parsedModules);
    } else {
      getEmployeeModules();
    }
  }, [getEmployeeModules]);

  return (
    <ManagementModuleContext.Provider
      value={{
        employeeModules,
        getEmployeeModules,
      }}
    >
      {children}
    </ManagementModuleContext.Provider>
  );
};

function useManagementModule(): IManagementModuleContextData {
  const context = useContext(ManagementModuleContext);

  if (!context) {
    throw new Error(
      'useManagementModule must be used within an ManagementModuleProvider',
    );
  }

  return context;
}

export { ManagementModuleProvider, useManagementModule };
