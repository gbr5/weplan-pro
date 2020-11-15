import React from 'react';

import { Container } from './styles';

import CardHeader from './CardHeader';
// import CardSideMenu from './CardSideMenu';
import CardBody from './CardBody';
import IStageCardDTO from '../../dtos/IStageCardDTO';

interface IProps {
  card: IStageCardDTO;
  selectedFunnel: string;
  handleUpdateFunnel: Function;
}

const CardPage: React.FC<IProps> = ({
  card,
  selectedFunnel,
  handleUpdateFunnel,
}) => {
  return (
    <>
      <Container>
        <CardHeader
          handleUpdateFunnel={(e: string) => handleUpdateFunnel(e)}
          card={card}
          selectedFunnel={selectedFunnel}
        />
        {/* <CardSideMenu card={card} /> */}
        <CardBody card={card} selectedFunnel={selectedFunnel} />
      </Container>
    </>
  );
};

export default CardPage;
