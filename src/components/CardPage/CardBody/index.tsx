import React from 'react';
import IStageCardDTO from '../../../dtos/IStageCardDTO';
import CardAditionalInfoSection from './CardAditionalInfoSection';
import CardInfoSection from './CardInfoSection';

import { Container, LeftSide } from './styles';

interface IProps {
  card: IStageCardDTO;
  selectedFunnel: string;
}

const CardBody: React.FC<IProps> = ({ card, selectedFunnel }) => {
  return (
    <Container>
      <LeftSide>
        <CardInfoSection selectedFunnel={selectedFunnel} card={card} />
      </LeftSide>
      <CardAditionalInfoSection card={card} />
    </Container>
  );
};

export default CardBody;
