import React from 'react';
import CardAditionalInfoSection from './CardAditionalInfoSection';
import CardInfoSection from './CardInfoSection';

import { Container, LeftSide } from './styles';

const CardBody: React.FC = () => {
  return (
    <Container>
      <LeftSide>
        <CardInfoSection />
      </LeftSide>
      <CardAditionalInfoSection />
    </Container>
  );
};

export default CardBody;
