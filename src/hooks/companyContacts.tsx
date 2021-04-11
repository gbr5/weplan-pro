import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';

import ICompanyContactDTO from '../dtos/ICompanyContactDTO';
import ICompanyContactInfoDTO from '../dtos/ICompanyContactInfoDTO';
import ICompanyContactNoteDTO from '../dtos/ICompanyContactNoteDTO';
import ICreateCompanyContactDTO from '../dtos/ICreateCompanyContactDTO';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import api from '../services/api';
import { useCompanyEmployee } from './companyEmployee';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

interface IEmployeeContactConectionDTO {
  contact_id: string;
  employee_id: string;
}

interface ICompanyContactContextData {
  contactTypes: ICheckBoxOptionDTO[];
  contactInfoTypes: ICheckBoxOptionDTO[];
  employeeContact: ICompanyContactDTO;
  selectedContact: ICompanyContactDTO;
  customersContacts: ICompanyContactDTO[];
  suppliersContacts: ICompanyContactDTO[];
  employeesContacts: ICompanyContactDTO[];
  othersContacts: ICompanyContactDTO[];
  outsourcedsContacts: ICompanyContactDTO[];
  weplanUsersContacts: ICompanyContactDTO[];
  companyContacts: ICompanyContactDTO[];
  selectContact(data: ICompanyContactDTO): void;
  deleteCompanyContact(data: ICompanyContactDTO): void;
  createCompanyContact(
    data: ICreateCompanyContactDTO,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactIsNew(data: ICompanyContactDTO): void;
  updateCompanyContactIsCompany(id: string): void;
  updateCompanyContactName(id: string, name: string): void;
  updateCompanyContactFamilyName(id: string, family_name: string): void;
  updateCompanyContactDescription(id: string, description: string): void;
  updateCompanyContactType(id: string, company_contact_type: string): void;
  updateCompanyContactWeplanUser(id: string): void;
  createCompanyEmployeeContactConection(
    data: IEmployeeContactConectionDTO,
  ): void;
  createCompanyEmployeeContact(data: ICreateCompanyContactDTO): void;
  createCompanyContactInfo(data: Omit<ICompanyContactInfoDTO, 'id'>): void;
  createCompanyContactNote(note: string): void;
  updateCompanyContactInfo(data: ICompanyContactInfoDTO): void;
  updateCompanyContactNote(data: ICompanyContactNoteDTO): void;
  getCompanyContacts(): void;
  getEmployeeContact(employee_id: string): Promise<ICompanyContactDTO>;
  getCompanyEmployeeContact(company_contact_id: string): Promise<IEmployeeDTO>;
}

const CompanyContactContext = createContext({} as ICompanyContactContextData);

const CompanyContactContextProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const { selectedCompanyEmployee, getCompanyEmployees } = useCompanyEmployee();
  const { employee } = useEmployeeAuth();
  const [employeeContact, setEmployeeContact] = useState(() => {
    const findEmployeeContact = localStorage.getItem(
      '@WP-PRO:employee-contact',
    );

    if (findEmployeeContact) {
      return JSON.parse(findEmployeeContact);
    }
    return {} as ICompanyContactDTO;
  });
  const [selectedContact, setSelectedContact] = useState(() => {
    const findContact = localStorage.getItem('@WP-PRO:selected-contact');

    if (findContact) {
      return JSON.parse(findContact);
    }
    return {} as ICompanyContactDTO;
  });
  const [companyContacts, setCompanyContacts] = useState<ICompanyContactDTO[]>(
    () => {
      const findCompanyContacts = localStorage.getItem(
        '@WP-PRO:company-contacts',
      );

      if (findCompanyContacts) {
        return JSON.parse(findCompanyContacts);
      }
      return [];
    },
  );

  const [customersContacts, setCustomersContacts] = useState<
    ICompanyContactDTO[]
  >(() => {
    const findCustomersContacts = localStorage.getItem(
      '@WP-PRO:company-customers-contacts',
    );

    if (findCustomersContacts) {
      return JSON.parse(findCustomersContacts);
    }
    return [];
  });
  const [suppliersContacts, setSuppliersContacts] = useState<
    ICompanyContactDTO[]
  >(() => {
    const findSuppliersContacts = localStorage.getItem(
      '@WP-PRO:company-suppliers-contacts',
    );

    if (findSuppliersContacts) {
      return JSON.parse(findSuppliersContacts);
    }
    return [];
  });
  const [outsourcedsContacts, setOutsourcedsContacts] = useState<
    ICompanyContactDTO[]
  >(() => {
    const findOutsourcedsContacts = localStorage.getItem(
      '@WP-PRO:company-outsourceds-contacts',
    );

    if (findOutsourcedsContacts) {
      return JSON.parse(findOutsourcedsContacts);
    }
    return [];
  });
  const [employeesContacts, setEmployeesContacts] = useState<
    ICompanyContactDTO[]
  >(() => {
    const findEmployeesContacts = localStorage.getItem(
      '@WP-PRO:company-employees-contacts',
    );

    if (findEmployeesContacts) {
      return JSON.parse(findEmployeesContacts);
    }
    return [];
  });
  const [othersContacts, setOthersContacts] = useState<ICompanyContactDTO[]>(
    () => {
      const findOthersContacts = localStorage.getItem(
        '@WP-PRO:company-others-contacts',
      );

      if (findOthersContacts) {
        return JSON.parse(findOthersContacts);
      }
      return [];
    },
  );
  const [weplanUsersContacts, setWeplanUsersContacts] = useState<
    ICompanyContactDTO[]
  >(() => {
    const findWePlanContacts = localStorage.getItem(
      '@WP-PRO:company-weplan-contacts',
    );

    if (findWePlanContacts) {
      return JSON.parse(findWePlanContacts);
    }
    return [];
  });

  const getCompanyContacts = useCallback(async () => {
    try {
      const response = await api.get<ICompanyContactDTO[]>(
        `/company/contacts/${employee.company.id}`,
      );
      localStorage.setItem(
        '@WP-PRO:company-contacts',
        JSON.stringify(response.data),
      );
      setCompanyContacts(
        response.data.sort((a: ICompanyContactDTO, b: ICompanyContactDTO) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      );
      const sortedCustomers = response.data.filter(
        contact => contact.company_contact_type === 'Customer',
      );
      localStorage.setItem(
        '@WP-PRO:company-customers-contacts',
        JSON.stringify(sortedCustomers),
      );
      setCustomersContacts(sortedCustomers);
      const sortedSuppliers = response.data.filter(
        contact => contact.company_contact_type === 'Supplier',
      );
      localStorage.setItem(
        '@WP-PRO:company-suppliers-contacts',
        JSON.stringify(sortedSuppliers),
      );
      setSuppliersContacts(sortedSuppliers);
      const sortedEmployees = response.data.filter(
        contact => contact.company_contact_type === 'Employee',
      );
      localStorage.setItem(
        '@WP-PRO:company-employees-contacts',
        JSON.stringify(sortedEmployees),
      );
      setEmployeesContacts(sortedEmployees);
      const sortedOutsourceds = response.data.filter(
        contact => contact.company_contact_type === 'Outsourced',
      );
      localStorage.setItem(
        '@WP-PRO:company-outsourceds-contacts',
        JSON.stringify(sortedOutsourceds),
      );
      setOutsourcedsContacts(sortedOutsourceds);
      const sortedOthers = response.data.filter(
        contact => contact.company_contact_type === 'Other',
      );
      localStorage.setItem(
        '@WP-PRO:company-others-contacts',
        JSON.stringify(sortedOthers),
      );
      setOthersContacts(sortedOthers);
      const sortedWePlan = response.data.filter(contact => contact.weplanUser);
      localStorage.setItem(
        '@WP-PRO:company-weplan-contacts',
        JSON.stringify(sortedWePlan),
      );
      setWeplanUsersContacts(sortedWePlan);
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const getEmployeeContact = useCallback(async (employee_id: string) => {
    try {
      const response = await api.get<ICompanyContactDTO>(
        `/company-employee-contact/employee/${employee_id}`,
      );
      localStorage.setItem(
        '@WP-PRO:employee-contact',
        JSON.stringify(response.data),
      );
      setEmployeeContact(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getCompanyEmployeeContact = useCallback(
    async (company_contact_id: string) => {
      try {
        const response = await api.get<IEmployeeDTO>(
          `/company-employee-contact/${company_contact_id}`,
        );
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );

  const deleteCompanyContact = useCallback(
    async (data: ICompanyContactDTO) => {
      try {
        await api.delete(`company/contacts/${data.id}`);
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato deletado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const createCompanyContact = useCallback(
    async (data: ICreateCompanyContactDTO) => {
      try {
        const response = await api.post(`company/contacts`, {
          company_id: employee.company.id,
          name: data.name,
          family_name: data.family_name,
          description: data.description,
          company_contact_type: data.company_contact_type,
          weplanUser: data.weplanUser,
          isCompany: data.isCompany,
        });
        setSelectedContact(response.data);
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato criado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, employee, addToast],
  );

  const createCompanyEmployeeContact = useCallback(
    async (data: ICreateCompanyContactDTO) => {
      try {
        const response = await createCompanyContact(data);
        await api.post('/company-employee-contact', {
          company_contact_id: response.id,
          employee_id: selectedCompanyEmployee.id,
        });
        getCompanyEmployees();
      } catch (err) {
        throw new Error(err);
      }
    },
    [getCompanyEmployees, createCompanyContact, selectedCompanyEmployee],
  );

  const createCompanyEmployeeContactConection = useCallback(
    async ({ contact_id, employee_id }: IEmployeeContactConectionDTO) => {
      try {
        await api.post('/company-employee-contact', {
          company_contact_id: contact_id,
          employee_id,
        });
        getCompanyEmployees();
        getCompanyContacts();
      } catch (err) {
        throw new Error(err);
      }
    },
    [getCompanyEmployees, getCompanyContacts],
  );

  const updateCompanyContactIsCompany = useCallback(
    async (id: string) => {
      try {
        await api.put(`company/contacts/is-company/${id}`);
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactWeplanUser = useCallback(
    async (id: string) => {
      try {
        await api.put(`company/contacts/weplan-user/${id}`);
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactType = useCallback(
    async (id: string, company_contact_type: string) => {
      try {
        await api.put(`company/contacts/type/${id}`, {
          company_contact_type,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactDescription = useCallback(
    async (id: string, description: string) => {
      try {
        await api.put(`company/contacts/description/${id}`, {
          description,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactFamilyName = useCallback(
    async (id: string, family_name: string) => {
      try {
        await api.put(`company/contacts/family-name/${id}`, {
          family_name,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactName = useCallback(
    async (id: string, name: string) => {
      try {
        await api.put(`company/contacts/name/${id}`, {
          name,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactIsNew = useCallback(
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/is-new/${data.id}`);
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const createCompanyContactNote = useCallback(
    async (note: string) => {
      try {
        await api.post(`company/contacts/notes`, {
          company_contact_id: selectedContact.id,
          note,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Nota criada com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar nota',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectedContact, addToast],
  );

  const createCompanyContactInfo = useCallback(
    async (data: Omit<ICompanyContactInfoDTO, 'id'>) => {
      try {
        await api.post(`company/contacts/info`, {
          company_contact_id: selectedContact.id,
          info_type: data.info_type,
          info: data.info,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato criado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectedContact, addToast],
  );

  const updateCompanyContactNote = useCallback(
    async (data: ICompanyContactNoteDTO) => {
      try {
        await api.put(`company/contacts/notes/${data.id}`, {
          isNew: data.isNew,
          note: data.note,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Nota atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar nota',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const updateCompanyContactInfo = useCallback(
    async (data: ICompanyContactInfoDTO) => {
      try {
        await api.put(`company/contacts/info/${data.id}`, {
          info_type: data.info_type,
          info: data.info,
        });
        getCompanyContacts();
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast],
  );

  const selectContact = useCallback(
    (data: ICompanyContactDTO) => {
      if (selectedContact.id === data.id) {
        localStorage.removeItem('@WP-PRO:selected-contact');
        return setSelectedContact({} as ICompanyContactDTO);
      }
      localStorage.setItem('@WP-PRO:selected-contact', JSON.stringify(data));
      return setSelectedContact(data);
    },
    [selectedContact],
  );

  const contactInfoTypes: ICheckBoxOptionDTO[] = [
    { id: 'Phone', label: 'Telefone', value: 'Phone' },
    { id: 'Email', label: 'Email', value: 'Email' },
    { id: 'Address', label: 'Endereço', value: 'Address' },
    { id: 'Whatsapp', label: 'Whatsapp', value: 'Whatsapp' },
    { id: 'Facebook', label: 'Facebook', value: 'Facebook' },
    { id: 'Instagram', label: 'Instagram', value: 'Instagram' },
    { id: 'Linkedin', label: 'Linkedin', value: 'Linkedin' },
    { id: 'Twitter', label: 'Twitter', value: 'Twitter' },
  ];

  const contactTypes: ICheckBoxOptionDTO[] = [
    { id: 'Customers', label: 'Clientes', value: 'Customers' },
    { id: 'Suppliers', label: 'Fornecedores', value: 'Suppliers' },
    { id: 'Employees', label: 'Colaboradores', value: 'Employees' },
    { id: 'Outsourceds', label: 'Terceirizados', value: 'Outsourceds' },
    { id: 'Others', label: 'Outros', value: 'Others' },
  ];

  useEffect(() => {
    if (employee && employee.id && employeeContact && !employeeContact.id) {
      getEmployeeContact(employee.id);
    }
  }, [getEmployeeContact, employeeContact, employee]);

  return (
    <CompanyContactContext.Provider
      value={{
        contactInfoTypes,
        contactTypes,
        getEmployeeContact,
        getCompanyEmployeeContact,
        employeeContact,
        selectContact,
        customersContacts,
        suppliersContacts,
        othersContacts,
        employeesContacts,
        weplanUsersContacts,
        outsourcedsContacts,
        selectedContact,
        companyContacts,
        getCompanyContacts,
        createCompanyContact,
        createCompanyEmployeeContactConection,
        deleteCompanyContact,
        createCompanyEmployeeContact,
        updateCompanyContactName,
        updateCompanyContactFamilyName,
        updateCompanyContactDescription,
        updateCompanyContactType,
        updateCompanyContactWeplanUser,
        updateCompanyContactIsNew,
        updateCompanyContactIsCompany,
        createCompanyContactInfo,
        createCompanyContactNote,
        updateCompanyContactInfo,
        updateCompanyContactNote,
      }}
    >
      {children}
    </CompanyContactContext.Provider>
  );
};

function useCompanyContact(): ICompanyContactContextData {
  const context = useContext(CompanyContactContext);

  if (!context) {
    throw new Error(
      'useCompanyContact must be used within a companyContact provider',
    );
  }

  return context;
}

export { CompanyContactContextProvider, useCompanyContact };
