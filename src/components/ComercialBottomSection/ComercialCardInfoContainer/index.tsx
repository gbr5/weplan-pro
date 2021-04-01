import React, { useCallback, useEffect, useState } from 'react';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';
import IUserDTO from '../../../dtos/IUserDTO';
import { useStageCard } from '../../../hooks/stageCard';
import api from '../../../services/api';

import { Container, Main } from './styles';

interface ICardCustomer {
  id: string;
  customer: ICompanyContactDTO;
  description: string;
}

const ComercialCardInfoContainer: React.FC = () => {
  const { selectedCard } = useStageCard();
  const [cardOwner, setCardOwner] = useState<IUserDTO>({} as IUserDTO);
  const [cardCustomers, setCardCustomers] = useState<ICardCustomer[]>([]);

  const getCardOwner = useCallback(() => {
    try {
      api.get<IUserDTO>(`users/${selectedCard.card_owner}`).then(response => {
        setCardOwner(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

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

  useEffect(() => {
    getCardCustomer();
  }, [getCardCustomer]);

  return (
    <Main>
      <h2>Informações do Card</h2>
      <Container>
        <div>
          <p>Nome</p>
          <p>{selectedCard && selectedCard.name}</p>
        </div>
        <div>
          <p>Última alteração</p>
          <p>{selectedCard && selectedCard.updated_at}</p>
        </div>
        <div>
          <p>Responsável</p>
          <p>{cardOwner.name}</p>
        </div>
        <div>
          <p>Cliente</p>
          {cardCustomers.map(customer => {
            return <p key={customer.id}>{customer.customer.name}</p>;
          })}
        </div>
        <div>
          <p>Cliente Weplan</p>
          <p>{selectedCard && selectedCard.weplanEvent}</p>
        </div>
      </Container>
    </Main>
  );
};

export default ComercialCardInfoContainer;
