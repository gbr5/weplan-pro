import React, { useCallback, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import { useCheckList } from '../../../../../../../hooks/checkList';
import Input from '../../../../../../Input';
import Button from '../../../../../../Button';

interface IFormParams {
  time: string;
}

interface IProps {
  nextStep: (e: string) => void;
}

const CreateTaskDueTime: React.FC<IProps> = ({ nextStep }: IProps) => {
  const formRef = useRef<FormHandles>(null);
  const { selectTaskDueDate, taskDueDate } = useCheckList();
  const handleSubmit = useCallback(
    ({ time }: IFormParams) => {
      const newDate = new Date(taskDueDate);
      newDate.setHours(Number(time));
      const tryDate = String(newDate);
      selectTaskDueDate(tryDate);
      nextStep(tryDate);
    },
    [nextStep, taskDueDate, selectTaskDueDate],
  );

  return (
    <Container>
      <strong>Horário de entrega</strong>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="time"
          containerStyle={{
            maxWidth: '4rem',
            fontSize: '1.2rem',
            margin: '1rem auto',
            padding: '0 auto',
          }}
          mask="hour"
          defaultValue="10"
          pattern="\d*"
        />
        <Button type="submit">Próximo</Button>
      </Form>
    </Container>
  );
};

export default CreateTaskDueTime;
