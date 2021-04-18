import React, { useCallback, useEffect, useState } from 'react';
import { FiAlertTriangle, FiChevronRight } from 'react-icons/fi';
import { MdFunctions } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import { useFunnel } from '../../hooks/funnel';
import { useHomeController } from '../../hooks/homeController';
import { useManagementModule } from '../../hooks/managementModules';
import { useStageCard } from '../../hooks/stageCard';
import { trimCardName } from '../../utils/trimCardName';
import ButtonCard from './ButtonCard';

import { Container, CardContainer } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
}

const FunnelStage: React.FC<IProps> = ({ stage }) => {
  const { selectedCard, selectCard, getCards } = useStageCard();
  const { employeeModules } = useManagementModule();
  const { selectedFunnel } = useFunnel();
  const [stageCards, setStageCards] = useState<IStageCardDTO[]>([]);

  useEffect(() => {
    const moduleAccessLevel = employeeModules.find(
      module => module.management_module === selectedFunnel.name,
    );

    getCards({
      access_level: moduleAccessLevel?.access_level || 3,
      stage_id: stage.id,
    }).then(response => {
      if (response) {
        setStageCards(response);
      }
    });
  }, [getCards, stage, selectedFunnel, employeeModules]);

  return (
    <Container>
      <h1>
        <strong>
          <FiAlertTriangle size={14} />
        </strong>
        {stage.name}
        <strong>
          <MdFunctions size={14} />
        </strong>
      </h1>
      <CardContainer>
        {stageCards &&
          stageCards.map(card => <ButtonCard key={card.id} card={card} />)}
      </CardContainer>
    </Container>
  );
};

export default FunnelStage;
