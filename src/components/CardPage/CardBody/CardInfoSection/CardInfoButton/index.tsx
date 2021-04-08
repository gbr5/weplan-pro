import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import IFunnelCardInfoDTO from '../../../../../dtos/IFunnelCardInfoDTO';
import IFunnelCardInfoFieldDTO from '../../../../../dtos/IFunnelCardInfoFieldDTO';
import { useStageCard } from '../../../../../hooks/stageCard';
import InlineFormField from '../../../../GeneralComponents/InlineFormField';

import { Container, CardInfoField, EditField } from './styles';

interface IFormParams {
  response: string;
}

interface IProps {
  cardInfo: IFunnelCardInfoDTO;
  funnelCardInfoField: IFunnelCardInfoFieldDTO;
}

const CardInfoButton: React.FC<IProps> = ({
  cardInfo,
  funnelCardInfoField,
}) => {
  const { updateFunnelCardInfo } = useStageCard();
  const [editField, setEditField] = useState(false);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleUpdateFunnelCardInfo = useCallback(
    (response: string) => {
      updateFunnelCardInfo({
        ...cardInfo,
        response,
      });
    },
    [cardInfo, updateFunnelCardInfo],
  );

  return (
    <Container>
      <button onClick={() => handleEditField(!editField)} type="button">
        <MdEdit />
      </button>
      {editField ? (
        <EditField>
          <strong>{funnelCardInfoField.name}</strong>
          <InlineFormField
            closeComponent={() => handleEditField(false)}
            defaultValue={cardInfo.response}
            handleOnSubmit={handleUpdateFunnelCardInfo}
            placeholder={cardInfo.response}
          />
        </EditField>
      ) : (
        <CardInfoField>
          <strong>{funnelCardInfoField.name}:</strong>
          <p>{cardInfo.response}</p>
        </CardInfoField>
      )}
    </Container>
  );
};

export default CardInfoButton;
