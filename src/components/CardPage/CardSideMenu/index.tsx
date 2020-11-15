import React from 'react';
import IStageCardDTO from '../../../dtos/IStageCardDTO';

import { Container } from './styles';

interface IProps {
  card: IStageCardDTO;
}

const CardSideMenu: React.FC<IProps> = ({ card }) => {
  return (
    <>
      <Container>
        <h3>{card.name}</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
        <h3>Card Info</h3>
      </Container>
    </>
  );
};

export default CardSideMenu;
