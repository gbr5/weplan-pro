import { differenceInMilliseconds } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useHomeController } from '../../../hooks/homeController';
import { useStageCard } from '../../../hooks/stageCard';
import api from '../../../services/api';
import formatHourDateShort from '../../../utils/formatHourDateShort';
import { trimCardName } from '../../../utils/trimCardName';
import CardAditionalInfoSection from '../../CardComponents/CardAditionalInfoSection';
import ContactWindow from '../../CompanyContactComponents/ContactWindow';

import {
  Container,
  Main,
  CardCustomersSection,
  LastUpdate,
  GoToCardButton,
} from './styles';

interface ICardCustomer {
  id: string;
  customer: ICompanyContactDTO;
  description: string;
}

const ComercialCardInfoContainer: React.FC = () => {
  const history = useHistory();
  const { companyEmployees } = useCompanyEmployee();
  const {
    getEmployeeContact,
    selectContact,
    selectedContact,
  } = useCompanyContact();
  const { selectedCard, cardNotes } = useStageCard();
  const { selectPage } = useHomeController();

  const [cardOwner, setCardOwner] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );
  const [cardCustomers, setCardCustomers] = useState<ICardCustomer[]>([]);
  const [contactWindow, setContactWindow] = useState(false);
  const getCardOwner = useCallback(async () => {
    try {
      const findEmployee = companyEmployees.filter(
        thisEmployee =>
          thisEmployee.employeeUser.id === selectedCard.card_owner,
      );
      const findCardOwner = await getEmployeeContact(findEmployee[0].id);
      findCardOwner && setCardOwner(findCardOwner);
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard, getEmployeeContact, companyEmployees]);

  useEffect(() => {
    if (selectedCard.id !== undefined) {
      getCardOwner();
    }
  }, [getCardOwner, selectedCard]);

  const getCardCustomer = useCallback(() => {
    try {
      api
        .get<ICardCustomer[]>(`card/customers/${selectedCard.unique_name}`)
        .then(response => {
          setCardCustomers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const handleOpenContactWindow = useCallback(
    (e: ICompanyContactDTO) => {
      selectContact(e);
      setContactWindow(true);
    },
    [selectContact],
  );
  const handleCloseContactWindow = useCallback(() => {
    selectContact({} as ICompanyContactDTO);
    setContactWindow(false);
  }, [selectContact]);

  const handleGoToCard = useCallback(() => {
    if (selectedCard && selectedCard.id) {
      selectPage('Card');
      history.push(`/card/${trimCardName(selectedCard.name)}`);
    }
  }, [history, selectedCard, selectPage]);

  useEffect(() => {
    getCardCustomer();
  }, [getCardCustomer]);

  const lastNoteDate = useMemo(() => {
    if (cardNotes.length > 0) {
      const lastNote = cardNotes.sort((a, b) => {
        if (
          differenceInMilliseconds(
            new Date(a.updated_at),
            new Date(b.updated_at),
          ) < 0
        ) {
          return -1;
        }
        if (
          differenceInMilliseconds(
            new Date(a.updated_at),
            new Date(b.updated_at),
          ) > 0
        ) {
          return 1;
        }
        return 0;
      });

      return formatHourDateShort(String(lastNote[0].updated_at));
    }
    return '';
  }, [cardNotes]);

  return (
    <>
      {contactWindow && selectedContact && selectedContact.id && (
        <ContactWindow closeWindow={() => handleCloseContactWindow()} />
      )}
      <Main>
        <h2>Informações do Card</h2>
        <Container>
          <LastUpdate type="button" onClick={handleGoToCard}>
            <strong>Última alteração</strong>
            <p>{lastNoteDate}</p>
          </LastUpdate>
          <GoToCardButton type="button" onClick={handleGoToCard}>
            <p>Nome</p>
            <p>{selectedCard && selectedCard.name}</p>
          </GoToCardButton>

          <GoToCardButton type="button" onClick={handleGoToCard}>
            <p>Responsável</p>
            <p>
              {cardOwner &&
                cardOwner.name &&
                `${cardOwner.name} ${cardOwner.family_name}`}
            </p>
          </GoToCardButton>
          <CardCustomersSection>
            <strong>Clientes</strong>
            <span>
              {cardCustomers.map(customer => {
                return (
                  <button
                    onClick={() => handleOpenContactWindow(customer.customer)}
                    type="button"
                    key={customer.id}
                  >
                    {customer.customer.name}
                  </button>
                );
              })}
            </span>
          </CardCustomersSection>

          <CardAditionalInfoSection />
        </Container>
      </Main>
    </>
  );
};

export default ComercialCardInfoContainer;
