import React, { useCallback, useMemo } from 'react';
import IFunnelStageDTO from '../../../dtos/IFunnelStageDTO';
import { useFunnel } from '../../../hooks/funnel';
import { useStageCard } from '../../../hooks/stageCard';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import { Container, StageButton } from './styles';

interface IProps {
  selectedFunnel: string;
  handleUpdateFunnel: Function;
}

const CardHeader: React.FC<IProps> = ({
  selectedFunnel,
  handleUpdateFunnel,
}) => {
  const { funnels } = useFunnel();
  const { selectedCard, selectCard } = useStageCard();
  const { addToast } = useToast();

  const handleCompareStageOrder = useCallback(
    (a: IFunnelStageDTO, b: IFunnelStageDTO) => {
      if (Number(a.funnel_order) - Number(b.funnel_order) > 0) {
        return 1;
      }
      if (Number(a.funnel_order) - Number(b.funnel_order) < 0) {
        return -1;
      }
      return 0;
    },
    [],
  );

  const funnelStages = useMemo(() => {
    const currentStages = funnels
      .find(funnel => funnel.name === selectedFunnel)
      ?.stages.sort(handleCompareStageOrder);

    if (currentStages !== undefined) {
      return currentStages;
    }
    return funnels[0].stages;
  }, [funnels, selectedFunnel, handleCompareStageOrder]);

  const handleMoveCardThroughStages = useCallback(
    async (xStage: IFunnelStageDTO) => {
      try {
        const response = await api.put(
          `/funnels/${selectedCard.stage_id}/cards/${selectedCard.id}`,
          {
            weplanEvent: selectedCard.weplanEvent,
            name: selectedCard.name,
            isActive: true,
            new_stage_id: xStage.id,
            new_card_owner: selectedCard.card_owner,
          },
        );

        xStage.name === 'Comercial' && handleUpdateFunnel('Comercial');
        xStage.name === 'Production' && handleUpdateFunnel('Produção');
        xStage.name === 'Projects' && handleUpdateFunnel('Projetos');
        xStage.name === 'Financial' && handleUpdateFunnel('Financeiro');

        selectCard(response.data);

        addToast({
          type: 'success',
          title: 'Card alterado com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao alterar card',
          description: 'Erro ao editar card, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [selectCard, selectedCard, addToast, handleUpdateFunnel],
  );

  return (
    <>
      <Container>
        <h2>{selectedCard.name}</h2>
        <span>
          {funnelStages.map(stage => (
            <StageButton
              isActive={stage.id === selectedCard.stage_id}
              key={stage.id}
            >
              <button
                onClick={() => handleMoveCardThroughStages(stage)}
                type="button"
              >
                {stage.name}
              </button>
            </StageButton>
          ))}
        </span>
      </Container>
    </>
  );
};

export default CardHeader;
