import React from 'react';
import { useFunnel } from '../../../hooks/funnel';
import { useStageCard } from '../../../hooks/stageCard';
import CardInfoButton from '../CardInfoButton';

import { Container } from './styles';

const CardAditionalInfoSection: React.FC = () => {
  const { selectedFunnelCardInfoFields } = useFunnel();
  const { selectedCard, funnelCardInfos } = useStageCard();

  return (
    <Container>
      <h3>Informações adicionais</h3>

      <div>
        {selectedCard &&
          selectedFunnelCardInfoFields.map(field => {
            const funnelCardInfo = funnelCardInfos.find(
              info => info.funnel_card_field_id === field.id,
            );

            if (funnelCardInfo) {
              return (
                <CardInfoButton
                  key={field.id}
                  cardInfo={funnelCardInfo}
                  funnelCardInfoField={field}
                />
              );
            }
            return '';
          })}
      </div>
    </Container>
  );
};

export default CardAditionalInfoSection;
