import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Container, Task, Main } from './styles';

const MainMessageContainer: React.FC = () => {
  return (
    <Main>
      <h2>Últimas Mensagens</h2>
      <Container>
        <Task>
          <div>
            <h2>Selecionar fornecedores</h2>

            <span>
              <p>Data de entrega: 15/04/2021</p>
              <p>Módulo Comercial</p>
            </span>
          </div>
          <button type="button">
            <FiChevronRight size={30} />
          </button>
        </Task>
        <Task>
          <div>
            <h2>Selecionar fornecedores</h2>

            <span>
              <p>Data de entrega: 15/04/2021</p>
              <p>Módulo Comercial</p>
            </span>
          </div>
          <button type="button">
            <FiChevronRight size={30} />
          </button>
        </Task>
        <Task>
          <div>
            <h2>Selecionar fornecedores</h2>

            <span>
              <p>Data de entrega: 15/04/2021</p>
              <p>Módulo Comercial</p>
            </span>
          </div>
          <button type="button">
            <FiChevronRight size={30} />
          </button>
        </Task>
      </Container>
    </Main>
  );
};

export default MainMessageContainer;
