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
  updateCompanyContactIsCompany(data: ICompanyContactDTO): void;
  updateCompanyContactName(data: ICompanyContactDTO): void;
  updateCompanyContactFamilyName(data: ICompanyContactDTO): void;
  updateCompanyContactDescription(data: ICompanyContactDTO): void;
  updateCompanyContactType(data: ICompanyContactDTO): void;
  updateCompanyContactWeplanUser(data: ICompanyContactDTO): void;
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/is-company/${data.id}`);
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/weplan-user/${data.id}`);
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/type/${data.id}`, {
          company_contact_type: data.company_contact_type,
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/description/${data.id}`, {
          description: data.description,
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/family-name/${data.id}`, {
          family_name: data.family_name,
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
    async (data: ICompanyContactDTO) => {
      try {
        await api.put(`company/contacts/name/${data.id}`, {
          name: data.name,
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
