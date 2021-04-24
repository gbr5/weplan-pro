import React from 'react';

import { Container, ActiveButton } from './styles';

interface IProps {
  handleActiveCards: (e: boolean) => void;
  isActive: boolean;
}

const ActiveCardsMenu: React.FC<IProps> = ({ handleActiveCards, isActive }) => {
  return (
    <Container>
      <ActiveButton
        isActive={isActive}
        type="button"
        onClick={() => handleActiveCards(true)}
      >
        Ativos
      </ActiveButton>
      <ActiveButton
        isActive={!isActive}
        type="button"
        onClick={() => handleActiveCards(false)}
      >
        Finalizados
      </ActiveButton>
    </Container>
  );
};

export default ActiveCardsMenu;
