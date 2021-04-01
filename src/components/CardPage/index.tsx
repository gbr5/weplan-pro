import React from 'react';

import { Container } from './styles';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

interface IProps {
  selectedFunnel: string;
  handleUpdateFunnel: Function;
}

const CardPage: React.FC<IProps> = ({ selectedFunnel, handleUpdateFunnel }) => {
  return (
    <>
      <Container>
        <CardHeader
          handleUpdateFunnel={(e: string) => handleUpdateFunnel(e)}
          selectedFunnel={selectedFunnel}
        />
        <CardBody selectedFunnel={selectedFunnel} />
      </Container>
    </>
  );
};

export default CardPage;
