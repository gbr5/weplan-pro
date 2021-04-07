import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';
import { useStageCard } from '../../../../hooks/stageCard';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container } from './styles';

interface IProps {
  closeComponent: Function;
}

const EditCardTitle: React.FC<IProps> = ({ closeComponent }) => {
  const formRef = useRef<FormHandles>(null);
  const { updateCard, selectedCard } = useStageCard();

  const handleSubmit = useCallback(
    (e: IStageCardDTO) => {
      updateCard({
        ...selectedCard,
        name: e.name,
      });
      closeComponent();
    },
    [updateCard, selectedCard, closeComponent],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <Input
          name="name"
          defaultValue={selectedCard.name}
          placeholder={selectedCard.name}
        />
        <Button type="submit">Salvar</Button>
      </Container>
    </Form>
  );
};

export default EditCardTitle;
