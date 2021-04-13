import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import { useCheckList } from '../../../../../../../hooks/checkList';
import Input from '../../../../../../Input';
import formatOnlyDate from '../../../../../../../utils/formatOnlyDate';
import Button from '../../../../../../Button';
import transformBRLDateToDate from '../../../../../../../utils/transformBRLDateToDate';

interface IFormParams {
  due_date: string;
}

interface IProps {
  nextStep: (e: string) => void;
}

const CreateTaskDueDate: React.FC<IProps> = ({ nextStep }: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { selectTaskDueDate } = useCheckList();
  const handleSubmit = useCallback(
    (e: IFormParams) => {
      const tryDate = String(transformBRLDateToDate(`04:05T${e.due_date}`));
      selectTaskDueDate(tryDate);
      nextStep(tryDate);
    },
    [nextStep, selectTaskDueDate],
  );

  const today = new Date().setDate(new Date().getDate() + 3);
  const defaultDate = formatOnlyDate(String(new Date(today)));

  return (
    <Container>
      <strong>Data de entrega</strong>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="due_date"
          mask="brlDateFormat"
          defaultValue={defaultDate}
        />
        <Button type="submit">Próximo</Button>
      </Form>
    </Container>
  );
};

export default CreateTaskDueDate;
