import React, { createContext, useCallback, useState, useContext } from 'react';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import IUserDTO from '../dtos/IUserDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

interface ICompanyMaster {
  id: string;
  user_id: string;
}

interface ICompanyEmployeeContextData {
  selectedUser: IUserDTO;
  selectedCompanyEmployee: IEmployeeDTO;
  companyEmployees: IEmployeeDTO[];
  companyMasters: ICompanyMaster[];
  selectCompanyEmployee(employee: IEmployeeDTO): void;
  createCompanyEmployee(data: ICreateEmployeeDTO): void;
  createUserEmployee(data: ICreateEmployeeDTO): void;
  getCompanyMasters(): Promise<void>;
  getCompanyEmployees(): Promise<void>;
}

const CompanyEmployeeContext = createContext<ICompanyEmployeeContextData>(
  {} as ICompanyEmployeeContextData,
);

const CompanyEmployeeProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { addToast } = useToast();
  const [selectedCompanyEmployee, setSelectedCompanyEmployee] = useState(
    {} as IEmployeeDTO,
  );
  const [selectedUser, setSelectedUser] = useState({} as IUserDTO);
  const [companyEmployees, setCompanyEmployees] = useState<IEmployeeDTO[]>([]);
  const [companyMasters, setCompanyMasters] = useState<ICompanyMaster[]>([]);

  const selectCompanyEmployee = useCallback((data: IEmployeeDTO) => {
    setSelectedCompanyEmployee(data);
  }, []);

  const getCompanyEmployees = useCallback(async () => {
    try {
      const response = await api.get<IEmployeeDTO[]>(
        `/company-employees/${employee.company.id}`,
      );
      setCompanyEmployees(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const getCompanyMasters = useCallback(async () => {
    try {
      const response = await api.get<ICompanyMaster[]>(`/`);

      setCompanyMasters(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const createCompanyEmployee = useCallback(
    // Olhar Como é feito no Enterprise !!
    async (data: ICreateEmployeeDTO) => {
      try {
        const response = await api.post('/users', {
          user_id: data.user_id,
          email: data.email,
          position: data.position,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Colaborador criado com sucesso!',
        });
        setSelectedCompanyEmployee(response.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast],
  );

  const createUserEmployee = useCallback(
    // This function is called in case the e-mail of the employee does not have a user associated with it.
    // This user is a normal the password is the a hash
    async (data: ICreateEmployeeDTO) => {
      try {
        const response = await api.post('/users', {
          user_id: data.user_id,
          email: data.email,
          position: data.position,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Colaborador criado com sucesso!',
        });
        setSelectedUser(response.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast],
  );

  return (
    <CompanyEmployeeContext.Provider
      value={{
        companyMasters,
        companyEmployees,
        selectedCompanyEmployee,
        selectedUser,
        selectCompanyEmployee,
        getCompanyEmployees,
        getCompanyMasters,
        createCompanyEmployee,
        createUserEmployee,
      }}
    >
      {children}
    </CompanyEmployeeContext.Provider>
  );
};

function useCompanyEmployee(): ICompanyEmployeeContextData {
  const context = useContext(CompanyEmployeeContext);

  if (!context) {
    throw new Error(
      'useCompanyEmployee must be used within an CompanyEmployeeProvider',
    );
  }

  return context;
}

export { CompanyEmployeeProvider, useCompanyEmployee };
