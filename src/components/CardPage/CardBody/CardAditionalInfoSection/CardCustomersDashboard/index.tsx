import React from 'react';

import { Container, CustomerContainer } from './styles';
import { useStageCard } from '../../../../../hooks/stageCard';
import Button from '../../../../Button';

const CardCustomersDashboard: React.FC = () => {
  const { cardCustomers } = useStageCard();

  return (
    <Container>
      <h2>Clientes</h2>

      <CustomerContainer>
        {cardCustomers.length > 0 &&
          cardCustomers.map(customer => {
            return (
              <Button key={customer.id} type="button">
                {customer.customer.name}
              </Button>
            );
          })}
      </CustomerContainer>
    </Container>
  );
};

export default CardCustomersDashboard;
