import React from 'react';

import { Container } from './styles';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

const CardPage: React.FC = () => {
  return (
    <>
      <Container>
        <CardHeader />
        <CardBody />
      </Container>
    </>
  );
};

export default CardPage;
