import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
import { trimCardName } from '../../../../../utils/trimCardName';

interface IProps {
  openNotesSection: Function;
}

const CardCustomersDashboard: React.FC<IProps> = ({ openNotesSection }) => {
  const history = useHistory();
  const location = useLocation();

  const iconsize = 40;
  const { cardCustomers, selectedCard, getCardCustomers } = useStageCard();
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
    history.push(`/card/${trimCardName(selectedCard.name)}`);
    openNotesSection();
  }, [selectContact, selectedCard, openNotesSection, history]);
  const handleCloseAddContactToCardWindow = useCallback(() => {
    setAddCustomerToCardWindow(false);
    if (selectedContact && selectedContact.id) {
      setContactWindow(true);
    } else {
      openNotesSection();
      history.push(`/card/${trimCardName(selectedCard.name)}`);
    }
  }, [selectedContact, openNotesSection, selectedCard, history]);

  const handleNewCard = useCallback(() => {
    const params = location.pathname.includes(
      `/card/new/${trimCardName(selectedCard.name)}`,
    );
    if (params && cardCustomers.length <= 0) {
      handleOpenAddCustomerToCardWindow();
    }
  }, [
    location,
    cardCustomers,
    handleOpenAddCustomerToCardWindow,
    selectedCard,
  ]);

  useEffect(() => {
    getCardCustomers();
  }, [getCardCustomers]);

  useEffect(() => {
    handleNewCard();
  }, [handleNewCard]);

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
