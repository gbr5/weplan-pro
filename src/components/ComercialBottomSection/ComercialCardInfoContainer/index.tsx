import React from 'react';

import { Container, Main } from './styles';

const ComercialCardInfoContainer: React.FC = () => {
  return (
    <Main>
      <h2>Informações do Card</h2>
      <Container>
        <div>
          <p>Nome</p>
          <p>CardName</p>
        </div>
        <div>
          <p>Data de criação</p>
          <p>10:42 - 14/05/2020</p>
        </div>
        <div>
          <p>Responsável</p>
          <p>Fulano</p>
        </div>
        <div>
          <p>Cliente</p>
          <p>CardClient</p>
        </div>
        <div>
          <p>Cliente Weplan</p>
          <p>Sim</p>
        </div>
      </Container>
    </Main>
  );
};

export default ComercialCardInfoContainer;
