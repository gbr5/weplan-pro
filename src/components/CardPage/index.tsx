import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import CardHeader from './CardHeader';
import CardBody from './CardBody';
import Header from '../Header';
import { useHomeController } from '../../hooks/homeController';
import { useFunnel } from '../../hooks/funnel';

import { Container, BackButton } from './styles';
import ComercialCardResultsButton from '../CardComponents/ComercialCardResultsButton';
import { useStageCard } from '../../hooks/stageCard';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import ICardCheckListDTO from '../../dtos/ICardCheckListDTO';
import ICardNotesDTO from '../../dtos/ICardNotesDTO';

const CardPage: React.FC = () => {
  const history = useHistory();
  const { selectPage } = useHomeController();
  const { selectedFunnel } = useFunnel();
  const { selectCard, selectCardCheckList, selectNote } = useStageCard();

  const navigateBack = useCallback(() => {
    selectedFunnel.name === 'Comercial' && selectPage('Comercial');
    selectedFunnel.name === 'Comercial' && history.push('/funnel/comercial');
    selectCard({} as IStageCardDTO);
    selectCardCheckList({} as ICardCheckListDTO);
    selectNote({} as ICardNotesDTO);
  }, [
    history,
    selectedFunnel,
    selectCardCheckList,
    selectNote,
    selectPage,
    selectCard,
  ]);

  return (
    <>
      <Header />
      <Container>
        <BackButton type="button" onClick={navigateBack}>
          <FiChevronLeft size={55} /> Voltar
        </BackButton>
        <ComercialCardResultsButton />
        <CardHeader />
        <CardBody />
      </Container>
    </>
  );
};

export default CardPage;
