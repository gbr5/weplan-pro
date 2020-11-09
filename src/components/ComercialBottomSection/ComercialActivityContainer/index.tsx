import React from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';
import { MdArrowForward } from 'react-icons/md';

import { Container, Task, Main } from './styles';

const ComercialActivityContainer: React.FC = () => {
  return (
    <Main>
      <h2>Histórico</h2>
      <Container>
        <Task>
          <div>
            <p>16:34 - 19/10/20</p>
            <h3>| Arquivo enviado</h3>
          </div>

          <span>
            <p>Far_East-Orçamento-19.10.20.pdf</p>
            <FiCheck />
          </span>
        </Task>
        <Task>
          <div>
            <p>16:47 - 19/10/20</p>
            <h3>| Mensagem</h3>
          </div>

          <span>
            <p>Confirmo o Recebimento. Muito obrigado Corinta ...</p>
            <FiCheck />
          </span>
        </Task>
        <Task>
          <div>
            <p>16:47 - 19/10/20</p>
            <h3>| Etapa do Funil</h3>
          </div>

          <span>
            <p>
              1° Contato{' '}
              <strong>
                <MdArrowForward />
              </strong>{' '}
              Orçamento Enviado
            </p>
            <FiCheck />
          </span>
        </Task>
      </Container>
    </Main>
  );
};

export default ComercialActivityContainer;
