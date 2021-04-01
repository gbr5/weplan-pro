import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiChevronRight } from 'react-icons/fi';
import { MdFunctions } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import { useManagementModule } from '../../hooks/managementModules';
import { useStageCard } from '../../hooks/stageCard';

import { Container, Card, CardContainer } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
  handleCardPage: Function;
}

const FunnelStage: React.FC<IProps> = ({ stage, handleCardPage }) => {
  const { selectedCard, selectCard, getCards } = useStageCard();
  const { employeeModules } = useManagementModule();
  const [stageCards, setStageCards] = useState<IStageCardDTO[]>([]);

  useEffect(() => {
    const moduleAccessLevel = employeeModules.find(
      module => module.management_module === stage.name,
    );

    getCards({
      access_level: moduleAccessLevel?.access_level || 3,
      stage_id: stage.id,
    }).then(response => {
      if (response) {
        setStageCards(response);
      }
    });
  }, [getCards, stage, employeeModules]);

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
          stageCards.map(card => (
            <Card isActive={selectedCard.id === card.id} key={card.id}>
              <button type="button" onClick={() => selectCard(card)}>
                <h3>{card.name}</h3>
                <strong>{card.weplanEvent ? 'WP' : ''}</strong>
              </button>
              <button type="button" onClick={() => handleCardPage(card)}>
                <FiChevronRight size={28} />
              </button>
            </Card>
          ))}
      </CardContainer>
    </Container>
  );
};

export default FunnelStage;
