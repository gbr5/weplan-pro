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
  contactEmployee: IEmployeeDTO;
  myEmployeeContact: ICompanyContactDTO;
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
  deleteCompanyContactInfo(id: string): void;
  createCompanyContact(
    data: ICreateCompanyContactDTO,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactIsNew(
    data: ICompanyContactDTO,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactIsCompany(id: string): Promise<ICompanyContactDTO>;
  updateCompanyContactName(name: string): Promise<ICompanyContactDTO>;
  updateCompanyContactFamilyName(
    family_name: string,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactDescription(
    description: string,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactType(
    company_contact_type: string,
  ): Promise<ICompanyContactDTO>;
  updateCompanyContactWeplanUser(id: string): Promise<ICompanyContactDTO>;
  createCompanyEmployeeContactConection(
    data: IEmployeeContactConectionDTO,
  ): void;
  createCompanyEmployeeContact(data: ICreateCompanyContactDTO): void;
  createCompanyContactInfo(data: Omit<ICompanyContactInfoDTO, 'id'>): void;
  createCompanyContactNote(note: string): void;
  updateCompanyContactInfo(data: ICompanyContactInfoDTO): void;
  getCompanyContact(): Promise<ICompanyContactDTO | undefined>;
  updateCompanyContactNote(data: ICompanyContactNoteDTO): void;
  getCompanyContacts(): void;
  getEmployeeContact(
    employee_id: string,
  ): Promise<ICompanyContactDTO | undefined>;
  getCompanyEmployeeContact(
    company_contact_id: string,
  ): Promise<IEmployeeDTO | undefined>;
}

const CompanyContactContext = createContext({} as ICompanyContactContextData);

const CompanyContactContextProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const { selectedCompanyEmployee, getCompanyEmployees } = useCompanyEmployee();
  const { employee } = useEmployeeAuth();
  const [myEmployeeContact, setMyEmployeeContact] = useState(() => {
    const findEmployeeContact = localStorage.getItem(
      '@WP-PRO:my-employee-contact',
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

  const [contactEmployee, setContactEmployee] = useState(() => {
    const findContactEmployee = localStorage.getItem(
      '@WP-PRO:contact-employee',
    );
    if (findContactEmployee) {
      return JSON.parse(findContactEmployee);
    }
    return {} as IEmployeeDTO;
  });

  const getEmployeeContact = useCallback(async (employee_id: string) => {
    try {
      const response = await api.get<ICompanyContactDTO | undefined>(
        `/company-employee-contact/employee/${employee_id}`,
      );

      setSelectedContact(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const selectContact = useCallback((data: ICompanyContactDTO) => {
    if (data && !data.id) {
      localStorage.removeItem('@WP-PRO:contact-employee');
      localStorage.removeItem('@WP-PRO:selected-contact');
      setContactEmployee({} as IEmployeeDTO);
      return setSelectedContact({} as ICompanyContactDTO);
    }
    localStorage.setItem('@WP-PRO:selected-contact', JSON.stringify(data));
    return setSelectedContact(data);
  }, []);

  const getCompanyContact = useCallback(async () => {
    if (selectedContact && selectedContact.id) {
      try {
        const response = await api.get<ICompanyContactDTO | undefined>(
          `/company/contacts/show/${selectedContact.id}`,
        );
        response.data && selectContact(response.data);
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    }
    return undefined;
  }, [selectContact, selectedContact]);

  // const getContact = useCallback(async (id: string) => {
  //   try {
  //     const response = await api.get<ICompanyContactDTO>(
  //       `/company/contacts/show/${id}`,
  //     );
  //     localStorage.setItem(
  //       '@WP-PRO:selected-contact',
  //       JSON.stringify(response.data),
  //     );
  //     return response.data;
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }, []);

  // Apenas Para o employee que estiver utilizando o sistema
  const getMyEmployeeContact = useCallback(async () => {
    try {
      const response = await api.get<ICompanyContactDTO>(
        `/company-employee-contact/employee/${employee.id}`,
      );
      localStorage.setItem(
        '@WP-PRO:my-employee-contact',
        JSON.stringify(response.data),
      );
      setMyEmployeeContact(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const getCompanyContacts = useCallback(async () => {
    try {
      const response = await api.get<ICompanyContactDTO[]>(
        `/company/contacts/${employee.company.id}`,
      );
      const sortedContacts = response.data.sort(
        (a: ICompanyContactDTO, b: ICompanyContactDTO) => {
          if (a.name.toLocaleUpperCase() > b.name.toLocaleUpperCase()) {
            return 1;
          }
          if (a.name.toLocaleUpperCase() < b.name.toLocaleUpperCase()) {
            return -1;
          }
          if (
            a.family_name.toLocaleUpperCase() >
            b.family_name.toLocaleUpperCase()
          ) {
            return 1;
          }
          if (a.family_name < b.family_name) {
            return -1;
          }
          return 0;
        },
      );
      localStorage.setItem(
        '@WP-PRO:company-contacts',
        JSON.stringify(sortedContacts),
      );
      setCompanyContacts(sortedContacts);
      const sortedCustomers = sortedContacts.filter(
        contact => contact.company_contact_type === 'Customer',
      );
      localStorage.setItem(
        '@WP-PRO:company-customers-contacts',
        JSON.stringify(sortedCustomers),
      );
      setCustomersContacts(sortedCustomers);
      const sortedSuppliers = sortedContacts.filter(
        contact => contact.company_contact_type === 'Supplier',
      );
      localStorage.setItem(
        '@WP-PRO:company-suppliers-contacts',
        JSON.stringify(sortedSuppliers),
      );
      setSuppliersContacts(sortedSuppliers);
      const sortedEmployees = sortedContacts.filter(
        contact => contact.company_contact_type === 'Employee',
      );
      localStorage.setItem(
        '@WP-PRO:company-employees-contacts',
        JSON.stringify(sortedEmployees),
      );
      setEmployeesContacts(sortedEmployees);
      const sortedOutsourceds = sortedContacts.filter(
        contact => contact.company_contact_type === 'Outsourced',
      );
      localStorage.setItem(
        '@WP-PRO:company-outsourceds-contacts',
        JSON.stringify(sortedOutsourceds),
      );
      setOutsourcedsContacts(sortedOutsourceds);
      const sortedOthers = sortedContacts.filter(
        contact => contact.company_contact_type === 'Other',
      );
      localStorage.setItem(
        '@WP-PRO:company-others-contacts',
        JSON.stringify(sortedOthers),
      );
      setOthersContacts(sortedOthers);
      const sortedWePlan = sortedContacts.filter(contact => contact.weplanUser);
      localStorage.setItem(
        '@WP-PRO:company-weplan-contacts',
        JSON.stringify(sortedWePlan),
      );
      setWeplanUsersContacts(sortedWePlan);
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const getCompanyEmployeeContact = useCallback(
    async (company_contact_id: string) => {
      try {
        const response = await api.get<IEmployeeDTO | undefined>(
          `/company-employee-contact/${company_contact_id}`,
        );
        localStorage.setItem(
          '@WP-PRO:contact-employee',
          JSON.stringify(response.data),
        );
        setContactEmployee(response.data);
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
        const response = await api.put(`company/contacts/is-company/${id}`);
        selectContact(response.data);
        getCompanyContacts();
        // getContact(response.data.id);
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectContact, addToast],
  );

  const updateCompanyContactWeplanUser = useCallback(
    async (id: string) => {
      try {
        const response = await api.put(`company/contacts/weplan-user/${id}`);
        getCompanyContacts();
        selectContact(response.data);
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast, selectContact],
  );

  const updateCompanyContactType = useCallback(
    async (company_contact_type: string) => {
      try {
        const response = await api.put(
          `company/contacts/type/${selectedContact.id}`,
          {
            company_contact_type,
          },
        );
        getCompanyContacts();
        selectContact(response.data);
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectContact, addToast, selectedContact.id],
  );

  const updateCompanyContactDescription = useCallback(
    async (description: string) => {
      try {
        const response = await api.put(
          `company/contacts/description/${selectedContact.id}`,
          {
            description,
          },
        );
        getCompanyContacts();
        selectContact(response.data);

        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast, selectContact, selectedContact],
  );

  const updateCompanyContactFamilyName = useCallback(
    async (family_name: string) => {
      try {
        const response = await api.put(
          `company/contacts/family-name/${selectedContact.id}`,
          {
            family_name,
          },
        );
        getCompanyContacts();
        selectContact(response.data);
        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, addToast, selectContact, selectedContact],
  );

  const updateCompanyContactName = useCallback(
    async (name: string) => {
      try {
        const response = await api.put(
          `company/contacts/name/${selectedContact.id}`,
          {
            name,
          },
        );
        getCompanyContacts();
        selectContact(response.data);

        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectContact, addToast, selectedContact],
  );

  const updateCompanyContactIsNew = useCallback(
    async (data: ICompanyContactDTO) => {
      try {
        const response = await api.put(`company/contacts/is-new/${data.id}`);
        getCompanyContacts();
        selectContact(response.data);

        addToast({
          type: 'success',
          title: 'Contato atualizado com sucesso',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar contato',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getCompanyContacts, selectContact, addToast],
  );

  const createCompanyContactNote = useCallback(
    async (note: string) => {
      try {
        await api.post(`company/contacts/notes`, {
          company_contact_id: selectedContact.id,
          note,
        });
        getCompanyContacts();
        getCompanyContact();
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
    [getCompanyContacts, getCompanyContact, selectedContact, addToast],
  );

  const createCompanyContactInfo = useCallback(
    async (data: Omit<ICompanyContactInfoDTO, 'id'>) => {
      if (
        data !== undefined &&
        data.info !== undefined &&
        data.info_type !== undefined
      ) {
        try {
          await api.post(`company/contacts/info`, {
            company_contact_id: selectedContact.id,
            info_type: data.info_type,
            info: data.info,
          });
          getCompanyContacts();
          getCompanyContact();
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
      }
    },
    [getCompanyContact, getCompanyContacts, selectedContact, addToast],
  );

  const updateCompanyContactNote = useCallback(
    async (data: ICompanyContactNoteDTO) => {
      try {
        await api.put(`company/contacts/notes/${data.id}`, {
          isNew: data.isNew,
          note: data.note,
        });
        getCompanyContacts();
        getCompanyContact();
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
    [getCompanyContacts, getCompanyContact, addToast],
  );

  const updateCompanyContactInfo = useCallback(
    async (data: ICompanyContactInfoDTO) => {
      try {
        await api.put(`company/contacts/info/${data.id}`, {
          info_type: data.info_type,
          info: data.info,
        });
        getCompanyContacts();
        getCompanyContact();
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
    [getCompanyContacts, addToast, getCompanyContact],
  );

  const deleteCompanyContactInfo = useCallback(
    async (id: string) => {
      try {
        await api.delete(`company/contacts/info/${id}`);
        getCompanyContacts();
        getCompanyContact();
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
    [getCompanyContacts, getCompanyContact, addToast],
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
    { id: 'Customer', label: 'Clientes', value: 'Customer' },
    { id: 'Supplier', label: 'Fornecedores', value: 'Supplier' },
    { id: 'Employee', label: 'Colaboradores', value: 'Employee' },
    { id: 'Outsourced', label: 'Terceirizados', value: 'Outsourced' },
    { id: 'Other', label: 'Outros', value: 'Other' },
  ];

  // useEffect(() => {
  //   if (selectedContact && selectedContact.id) {
  //     const findContactEmployee = localStorage.getItem(
  //       '@WP-PRO:contact-employee',
  //     );
  //     if (findContactEmployee) {
  //       const parsedEmployee = JSON.parse(findContactEmployee);
  //       setContactEmployee(parsedEmployee);
  //     } else {
  //       getCompanyEmployeeContact(selected);
  //     }
  //   }
  // }, [getCompanyEmployeeContact, selectedContact]);

  useEffect(() => {
    if (employee && employee.id && myEmployeeContact && !myEmployeeContact.id) {
      const findContactEmployee = localStorage.getItem(
        '@WP-PRO:my-employee-contact',
      );
      if (findContactEmployee) {
        const parsedContact = JSON.parse(findContactEmployee);
        setMyEmployeeContact(parsedContact);
      } else {
        getMyEmployeeContact();
      }
    }
  }, [getMyEmployeeContact, myEmployeeContact, employee]);

  return (
    <CompanyContactContext.Provider
      value={{
        contactInfoTypes,
        getCompanyContact,
        myEmployeeContact,
        deleteCompanyContactInfo,
        contactEmployee,
        contactTypes,
        getEmployeeContact,
        getCompanyEmployeeContact,
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
