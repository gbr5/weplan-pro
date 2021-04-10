import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import IUserDTO from '../dtos/IUserDTO';
import ICompanyMasterDTO from '../dtos/ICompanyMasterDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

interface ICompanyEmployeeContextData {
  selectedUser: IUserDTO;
  selectedCompanyEmployee: IEmployeeDTO;
  companyEmployees: IEmployeeDTO[];
  companyMasters: ICompanyMasterDTO[];
  master: ICompanyMasterDTO;
  selectCompanyEmployee(employee: IEmployeeDTO): void;
  createCompanyEmployee(data: ICreateEmployeeDTO): void;
  createUserEmployee(data: ICreateEmployeeDTO): void;
  getCompanyMasters(): Promise<void>;
  getEmployeeAsMaster(): Promise<ICompanyMasterDTO | undefined>;
  getCompanyEmployees(): Promise<void>;
}

const CompanyEmployeeContext = createContext<ICompanyEmployeeContextData>(
  {} as ICompanyEmployeeContextData,
);

const CompanyEmployeeProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();

  const { addToast } = useToast();
  const [selectedCompanyEmployee, setSelectedCompanyEmployee] = useState(() => {
    const findSelectedEmployee = localStorage.getItem(
      '@WP-PRO:selected-employee',
    );

    if (findSelectedEmployee) {
      return JSON.parse(findSelectedEmployee);
    }
    return {} as IEmployeeDTO;
  });
  const [selectedUser, setSelectedUser] = useState(() => {
    const findSelectedUser = localStorage.getItem('@WP-PRO:selected-user');

    if (findSelectedUser) {
      return JSON.parse(findSelectedUser);
    }
    return {} as IUserDTO;
  });
  const [master, setMaster] = useState(() => {
    const findMaster = localStorage.getItem('@WP-PRO:me-as-master');
    if (findMaster) {
      return JSON.parse(findMaster);
    }
    return {} as ICompanyMasterDTO;
  });
  const [companyEmployees, setCompanyEmployees] = useState<IEmployeeDTO[]>(
    () => {
      const findCompanyEmployees = localStorage.getItem(
        '@WP-PRO:company-employees',
      );
      if (findCompanyEmployees) {
        return JSON.parse(findCompanyEmployees);
      }
      return [];
    },
  );
  const [companyMasters, setCompanyMasters] = useState<ICompanyMasterDTO[]>(
    () => {
      const findMasters = localStorage.getItem('@WP-PRO:company-masters');

      if (findMasters) {
        return JSON.parse(findMasters);
      }
      return [];
    },
  );
  const selectCompanyEmployee = useCallback((data: IEmployeeDTO) => {
    setSelectedCompanyEmployee(data);
  }, []);

  const getCompanyEmployees = useCallback(async () => {
    try {
      const response = await api.get<IEmployeeDTO[]>(
        `/company-employees/${employee.company.id}`,
      );
      setCompanyEmployees(response.data);
      localStorage.setItem(
        '@WP-PRO:company-employees',
        JSON.stringify(response.data),
      );
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const getCompanyMasters = useCallback(async () => {
    try {
      const response = await api.get<ICompanyMasterDTO[]>(
        `/suppliers/master/users/${employee.company.id}`,
      );
      setCompanyMasters(response.data);
      localStorage.setItem(
        '@WP-PRO:company-masters',
        JSON.stringify(response.data),
      );
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

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

  const getEmployeeAsMaster = useCallback(async () => {
    try {
      const response = await api.get<ICompanyMasterDTO>(
        `/suppliers/show/me-as-master`,
      );
      if (response.data && response.data.id) {
        setMaster(response.data);

        localStorage.setItem(
          '@WP-PRO:me-as-master',
          JSON.stringify(response.data),
        );
        return response.data;
      }
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    if (employee && employee.id) {
      const findMaster = localStorage.getItem('@WP-PRO:me-as-master');

      if (findMaster) {
        setMaster(JSON.parse(findMaster));
      } else {
        getEmployeeAsMaster();
      }
    }
  }, [getEmployeeAsMaster, employee]);
  useEffect(() => {
    if (master && master.id && employee && employee.id) {
      const findMasters = localStorage.getItem('@WP-PRO:company-masters');

      findMasters && setCompanyMasters(JSON.parse(findMasters));
      !findMasters && getCompanyMasters();
    }
  }, [getCompanyMasters, master, employee]);

  useEffect(() => {
    if (employee && employee.id) {
      const findEmployees = localStorage.getItem('@WP-PRO:company-employees');

      findEmployees && setCompanyEmployees(JSON.parse(findEmployees));
      !findEmployees && getCompanyEmployees();
    }
  }, [getCompanyEmployees, employee]);
  return (
    <CompanyEmployeeContext.Provider
      value={{
        master,
        companyMasters,
        companyEmployees,
        selectedCompanyEmployee,
        selectedUser,
        selectCompanyEmployee,
        getCompanyEmployees,
        getEmployeeAsMaster,
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
