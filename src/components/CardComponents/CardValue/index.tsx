import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useStageCard } from '../../../hooks/stageCard';
import { formatCurrencyBRL } from '../../../utils/formatCurrencyBRL';
import formatHourDateShort from '../../../utils/formatHourDateShort';
import Button from '../../Button';
import Input from '../../Input';
import WindowContainer from '../../WindowContainer';

import { Container, EditContainer } from './styles';

interface IFormParams {
  value: number;
}

const CardValue: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { myEmployeeContact } = useCompanyContact();
  const { selectedCard, updateCard, createCardHistoryNote } = useStageCard();
  const [editValue, setEditValue] = useState(false);

  const handleEditValue = useCallback((e: boolean) => {
    setEditValue(e);
  }, []);

  const handleSubmit = useCallback(
    ({ value }: IFormParams) => {
      const oldValue = selectedCard.value;
      updateCard({
        ...selectedCard,
        value,
      });
      const note = `${myEmployeeContact.name} ${
        myEmployeeContact.family_name
      } alterou o valor do negócio|||\n.\nValor antigo: ${formatCurrencyBRL(
        oldValue,
      )}\n.\nValor novo: ${formatCurrencyBRL(value)}\n.\n${formatHourDateShort(
        String(new Date()),
      )}`;
      createCardHistoryNote(note, selectedCard.unique_name);
      setEditValue(false);
    },
    [updateCard, selectedCard, myEmployeeContact, createCardHistoryNote],
  );

  return (
    <>
      {editValue ? (
        <WindowContainer
          onHandleCloseWindow={() => handleEditValue(false)}
          containerStyle={{
            zIndex: 15,
            top: '20%',
            left: '5%',
            height: '60%',
            width: '90%',
          }}
        >
          <Form ref={formRef} onSubmit={handleSubmit}>
            <EditContainer>
              <strong>Valor do negócio</strong>
              <Input
                name="value"
                type="number"
                defaultValue={selectedCard.value}
              />
              <Button type="submit">Salvar</Button>
            </EditContainer>
          </Form>
        </WindowContainer>
      ) : (
        <Container type="button" onClick={() => handleEditValue(true)}>
          <p>Valor do negócio</p>
          <strong>{formatCurrencyBRL(selectedCard.value)}</strong>
        </Container>
      )}
    </>
  );
};

export default CardValue;
