import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';

import { Container } from './styles';

interface IProps {
  card: IStageCardDTO;
}

const CardHistorySection: React.FC<IProps> = ({ card }) => {
  return (
    <>
      <Container>
        <h2>Informações do Card</h2>
        <div>
          <div>
            <p>Nome: {card.name}</p>
            <p>Cliente: Fulano de tal</p>
            <p>
              Contatos: <FiChevronDown />
            </p>
            <p>Responsável: </p>
            <p>
              Score <FiChevronDown />
            </p>
          </div>
          <div>
            <p>Value</p>
            <p>
              Risk: <FiChevronDown />
            </p>
            <p>Due_date: 20/04/20</p>
            <p>Última atualização: 15/04/20</p>
            <p>Data de criação: 15/03/20</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CardHistorySection;
