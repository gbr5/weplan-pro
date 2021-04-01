import React from 'react';
import CardAditionalInfoSection from './CardAditionalInfoSection';
import CardInfoSection from './CardInfoSection';

import { Container, LeftSide } from './styles';

interface IProps {
  selectedFunnel: string;
}

const CardBody: React.FC<IProps> = ({ selectedFunnel }) => {
  return (
    <Container>
      <LeftSide>
        <CardInfoSection selectedFunnel={selectedFunnel} />
      </LeftSide>
      <CardAditionalInfoSection />
    </Container>
  );
};

export default CardBody;
