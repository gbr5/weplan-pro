import React, { useCallback, useState } from 'react';

import { MdAdd } from 'react-icons/md';
import { useStageCard } from '../../../../../hooks/stageCard';
import { useCompanyContact } from '../../../../../hooks/companyContacts';
import ICompanyContactDTO from '../../../../../dtos/ICompanyContactDTO';
import ContactWindow from '../../../../CompanyContactComponents/ContactWindow';
import SelectCustomer from '../../../../GeneralComponents/SelectCustomer';

import {
  Container,
  CustomerContainer,
  ContainerHeader,
  CustomerButton,
} from './styles';

const CardCustomersDashboard: React.FC = () => {
  const iconsize = 40;
  const { cardCustomers } = useStageCard();
  const { selectContact, selectedContact } = useCompanyContact();
  const [contactWindow, setContactWindow] = useState(false);
  const [addCustomerToCardWindow, setAddCustomerToCardWindow] = useState(false);

  const handleOpenContactWindow = useCallback(
    (e: ICompanyContactDTO) => {
      selectContact(e);
      setContactWindow(true);
    },
    [selectContact],
  );
  const handleOpenAddCustomerToCardWindow = useCallback(() => {
    setAddCustomerToCardWindow(true);
  }, []);
  const handleCloseContactWindow = useCallback(() => {
    setContactWindow(false);
    selectContact({} as ICompanyContactDTO);
  }, [selectContact]);
  const handleCloseAddContactToCardWindow = useCallback(() => {
    setAddCustomerToCardWindow(false);
    if (selectedContact && selectedContact.id) {
      setContactWindow(true);
    }
  }, [selectedContact]);

  return (
    <>
      {contactWindow && selectedContact && selectedContact.id && (
        <ContactWindow closeWindow={handleCloseContactWindow} />
      )}
      {addCustomerToCardWindow && (
        <SelectCustomer closeWindow={handleCloseAddContactToCardWindow} />
      )}
      <Container>
        <ContainerHeader>
          <h2>Clientes</h2>
          <button type="button" onClick={handleOpenAddCustomerToCardWindow}>
            <MdAdd size={iconsize} />
          </button>
        </ContainerHeader>
        <CustomerContainer>
          {cardCustomers.length > 0 &&
            cardCustomers.map(customer => {
              return (
                <CustomerButton
                  onClick={() => handleOpenContactWindow(customer.customer)}
                  key={customer.id}
                  type="button"
                >
                  {customer.customer.name}
                </CustomerButton>
              );
            })}
        </CustomerContainer>
      </Container>
    </>
  );
};

export default CardCustomersDashboard;
