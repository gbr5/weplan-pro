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
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';

interface ICreateUserEmployeeDTO extends ICreateEmployeeDTO {
  name: string;
  password: string;
}

interface ICompanyEmployeeContextData {
  accessLevelTypes: ICheckBoxOptionDTO[];
  employeeAccessLevel: number;
  employeeName: string;
  employeeFamilyName: string;
  employeePosition: string;
  employeeEmail: string;
  selectedUser: IUserDTO;
  selectedCompanyEmployee: IEmployeeDTO;
  companyEmployees: IEmployeeDTO[];
  companyMasters: ICompanyMasterDTO[];
  master: ICompanyMasterDTO;
  selectEmployeeName(name: string): void;
  selectEmployeeFamilyName(familyName: string): void;
  selectEmployeeEmail(email: string): void;
  selectEmployeePosition(position: string): void;
  selectEmployeeAccessLevel(accessLevel: number): void;
  selectCompanyEmployee(data: IEmployeeDTO): void;
  createCompanyEmployee(data: ICreateEmployeeDTO): Promise<IEmployeeDTO>;
  createUserEmployee(data: Omit<ICreateUserEmployeeDTO, 'user_id'>): void;
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
  const [employeeName, setEmployeeName] = useState('');
  const [employeeFamilyName, setEmployeeFamilyName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [employeeAccessLevel, setEmployeeAccessLevel] = useState(3);
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
    if (data && !data.id) {
      localStorage.removeItem('@WP-PRO:selected-employee');
      setSelectedCompanyEmployee({} as IEmployeeDTO);
    }
    localStorage.setItem('@WP-PRO:selected-employee', JSON.stringify(data));
    setSelectedCompanyEmployee(data);
  }, []);
  const selectEmployeeAccessLevel = useCallback((accessLevel: number) => {
    setEmployeeAccessLevel(accessLevel);
  }, []);
  const selectEmployeeName = useCallback((name: string) => {
    setEmployeeName(name);
  }, []);
  const selectEmployeeFamilyName = useCallback((familyName: string) => {
    setEmployeeFamilyName(familyName);
  }, []);
  const selectEmployeePosition = useCallback((position: string) => {
    setEmployeePosition(position);
  }, []);
  const selectEmployeeEmail = useCallback((email: string) => {
    setEmployeeEmail(email);
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
    async (data: ICreateEmployeeDTO) => {
      try {
        const response = await api.post(
          `/company-employees/${employee.company.id}/${data.user_id}`,
          {
            email: data.email,
            access_key: data.password,
            password: data.password,
            position: data.position,
            title: 'Olá! Temos uma novidade para você',
            message: `A empresa ${employee.company.name} convidou você para acessar o seu sistema na WePlan!`,
          },
        );
        addToast({
          type: 'success',
          title: 'Colaborador criado com sucesso!',
        });
        selectCompanyEmployee(response.data);
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast, employee, selectCompanyEmployee],
  );
  const createUserEmployee = useCallback(
    // This function is called in case the e-mail of the employee does not have a user associated with it.
    // This user is a normal the password is the a hash
    async (data: Omit<ICreateUserEmployeeDTO, 'user_id'>) => {
      try {
        const response = await api.post('/users', {
          name: data.name,
          email: data.email,
          password: `${data.name}&${data.email}`,
          isCompany: false,
        });
        const employeeResponse = await api.post('/company-employees', {
          user_id: response.data.id,
          email: data.email,
          position: data.position,
          isActive: true,
        });
        addToast({
          type: 'success',
          title: 'Colaborador criado com sucesso!',
        });
        selectCompanyEmployee(employeeResponse.data);
        setSelectedUser(response.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    [addToast, selectCompanyEmployee],
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

  const accessLevelTypes: ICheckBoxOptionDTO[] = [
    { id: '1', label: 'Global', value: '1' },
    { id: '2', label: 'Equipe', value: '2' },
    { id: '3', label: 'Individual', value: '3' },
  ];

  return (
    <CompanyEmployeeContext.Provider
      value={{
        accessLevelTypes,
        master,
        companyMasters,
        companyEmployees,
        selectedCompanyEmployee,
        selectedUser,
        selectCompanyEmployee,
        employeeAccessLevel,
        employeeEmail,
        employeeFamilyName,
        employeeName,
        employeePosition,
        selectEmployeeAccessLevel,
        selectEmployeeEmail,
        selectEmployeeFamilyName,
        selectEmployeeName,
        selectEmployeePosition,
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
