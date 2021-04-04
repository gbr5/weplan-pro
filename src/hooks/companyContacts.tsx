import React, { createContext, useCallback, useState, useContext } from 'react';
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';

import ICompanyContactDTO from '../dtos/ICompanyContactDTO';
import ICompanyContactInfoDTO from '../dtos/ICompanyContactInfoDTO';
import ICompanyContactNoteDTO from '../dtos/ICompanyContactNoteDTO';
import ICreateCompanyContactDTO from '../dtos/ICreateCompanyContactDTO';
import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

interface ICompanyContactContextData {
  contactTypes: ICheckBoxOptionDTO[];
  contactInfoTypes: ICheckBoxOptionDTO[];
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
  createCompanyContact(data: ICreateCompanyContactDTO): void;
  updateCompanyContactIsNew(data: ICompanyContactDTO): void;
  updateCompanyContactIsCompany(id: string): void;
  updateCompanyContactName(id: string, name: string): void;
  updateCompanyContactFamilyName(id: string, family_name: string): void;
  updateCompanyContactDescription(id: string, description: string): void;
  updateCompanyContactType(id: string, company_contact_type: string): void;
  updateCompanyContactWeplanUser(id: string): void;
  createCompanyContactInfo(data: Omit<ICompanyContactInfoDTO, 'id'>): void;
  createCompanyContactNote(note: string): void;
  updateCompanyContactInfo(data: ICompanyContactInfoDTO): void;
  updateCompanyContactNote(data: ICompanyContactNoteDTO): void;
  getCompanyContacts(): void;
}

const CompanyContactContext = createContext({} as ICompanyContactContextData);

const CompanyContactContextProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();
  const [selectedContact, setSelectedContact] = useState(
    {} as ICompanyContactDTO,
  );
  const [companyContacts, setCompanyContacts] = useState<ICompanyContactDTO[]>(
    [],
  );

  const [customersContacts, setCustomersContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [suppliersContacts, setSuppliersContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [outsourcedsContacts, setOutsourcedsContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [employeesContacts, setEmployeesContacts] = useState<
    ICompanyContactDTO[]
  >([]);
  const [othersContacts, setOthersContacts] = useState<ICompanyContactDTO[]>(
    [],
  );
  const [weplanUsersContacts, setWeplanUsersContacts] = useState<
    ICompanyContactDTO[]
  >([]);

  const getCompanyContacts = useCallback(async () => {
    try {
      const response = await api.get<ICompanyContactDTO[]>(
        `/company/contacts/${employee.company.id}`,
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
      setCustomersContacts(
        response.data.filter(
          contact => contact.company_contact_type === 'Customer',
        ),
      );
      setSuppliersContacts(
        response.data.filter(
          contact => contact.company_contact_type === 'Supplier',
        ),
      );
      setEmployeesContacts(
        response.data.filter(
          contact => contact.company_contact_type === 'Employee',
        ),
      );
      setOutsourcedsContacts(
        response.data.filter(
          contact => contact.company_contact_type === 'Outsourced',
        ),
      );
      setOthersContacts(
        response.data.filter(
          contact => contact.company_contact_type === 'Other',
        ),
      );
      setWeplanUsersContacts(
        response.data.filter(contact => contact.weplanUser),
      );
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

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
        return setSelectedContact({} as ICompanyContactDTO);
      }
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
    { id: 'Employees', label: 'Funcionários', value: 'Employees' },
    { id: 'Outsourceds', label: 'Terceirizados', value: 'Outsourceds' },
    { id: 'Others', label: 'Outros', value: 'Others' },
  ];
  return (
    <CompanyContactContext.Provider
      value={{
        contactInfoTypes,
        contactTypes,
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
        deleteCompanyContact,
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
