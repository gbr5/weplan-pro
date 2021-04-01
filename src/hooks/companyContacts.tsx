import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import ICompanyContactDTO from '../dtos/ICompanyContactDTO';
import ICompanyContactInfoDTO from '../dtos/ICompanyContactInfoDTO';
import ICreateCompanyContactDTO from '../dtos/ICreateCompanyContactDTO';
import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';

interface ICompanyContactContextData {
  selectedContact: ICompanyContactDTO;
  customersContacts: ICompanyContactDTO[];
  suppliersContacts: ICompanyContactDTO[];
  employeesContacts: ICompanyContactDTO[];
  othersContacts: ICompanyContactDTO[];
  outsourcedsContacts: ICompanyContactDTO[];
  weplanUsersContacts: ICompanyContactDTO[];
  companyContacts: ICompanyContactDTO[];
  selectContact(data: ICompanyContactDTO): void;
  createCompanyContact(data: ICreateCompanyContactDTO): void;
  createCompanyContactInfo(data: Omit<ICompanyContactInfoDTO, 'id'>): void;
  getCompanyContacts(): void;
}

const CompanyContactContext = createContext({} as ICompanyContactContextData);

const CompanyContactContextProvider: React.FC = ({ children }) => {
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
      setCompanyContacts(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [employee]);

  const createCompanyContact = useCallback(
    async (data: ICreateCompanyContactDTO) => {
      try {
        const response = await api.post(`company/contact`, {
          company_id: employee.company.id,
          name: data.name,
          description: data.description,
          company_contact_type: data.company_contact_type,
          weplanUser: data.weplanUser,
          isCompany: data.isCompany,
        });
        setSelectedContact(response.data);
        getCompanyContacts();
      } catch (err) {
        throw new Error(err);
      }
    },
    [employee, getCompanyContacts],
  );

  const createCompanyContactInfo = useCallback(
    async (data: Omit<ICompanyContactInfoDTO, 'id'>) => {
      try {
        await api.post(`company/contacts/info`, {
          company_contact_id: selectedContact.id,
          info_type: data.info_type,
          info: data.info,
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectedContact],
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
  useEffect(() => {
    if (companyContacts && companyContacts.length > 0) {
      setCustomersContacts(
        companyContacts.filter(
          contact => contact.company_contact_type === 'Customer',
        ),
      );
      setSuppliersContacts(
        companyContacts.filter(
          contact => contact.company_contact_type === 'Supplier',
        ),
      );
      setEmployeesContacts(
        companyContacts.filter(
          contact => contact.company_contact_type === 'Employee',
        ),
      );
      setOutsourcedsContacts(
        companyContacts.filter(
          contact => contact.company_contact_type === 'Outsourced',
        ),
      );
      setOthersContacts(
        companyContacts.filter(
          contact => contact.company_contact_type === 'Other',
        ),
      );
      setWeplanUsersContacts(
        companyContacts.filter(contact => contact.weplanUser),
      );
    }
  }, [companyContacts]);

  return (
    <CompanyContactContext.Provider
      value={{
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
        createCompanyContactInfo,
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