import React, { useEffect, useMemo, useState } from 'react';
import { MdAdd, MdFunctions } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import { useFunnel } from '../../hooks/funnel';
import { useManagementModule } from '../../hooks/managementModules';
import { useStageCard } from '../../hooks/stageCard';
import { formatCurrencyBRL } from '../../utils/formatCurrencyBRL';
import ButtonCard from './ButtonCard';

import { Container, CardContainer } from './styles';

interface IProps {
  stage: IFunnelStageDTO;
}

const FunnelStage: React.FC<IProps> = ({ stage }) => {
  const { getCards } = useStageCard();
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

  const totalStageValue = useMemo(() => {
    const total = stageCards.map(card => card.value);
    return total.length > 0 ? total.reduce((acc, value) => acc + value) : 0;
  }, [stageCards]);

  const totalCards = useMemo(() => {
    return stageCards.length || 0;
  }, [stageCards]);

  return (
    <Container>
      <h1>
        <strong>
          <MdAdd size={14} />
          {totalCards} Cards
        </strong>
        {stage.name}
        <strong>
          <MdFunctions color="green" size={14} />
          {formatCurrencyBRL(totalStageValue)}
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
