import React, { useCallback, useMemo, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import { useCheckList } from '../../../../hooks/checkList';
import SelectField from '../../../FormComponents/SelectField';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../Button';

interface IFormParams {
  status: string;
}

interface IProps {
  nextStep: () => void;
}

const CreateTaskStatus: React.FC<IProps> = ({ nextStep }: IProps) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { selectTaskStatus, taskStatus, taskStatusTypes } = useCheckList();
  const defaultType = useMemo(() => {
    const findDefaultType = taskStatusTypes.find(
      type => type.value === taskStatus,
    );
    if (findDefaultType) {
      return findDefaultType;
    }
    return taskStatusTypes[0];
  }, [taskStatusTypes, taskStatus]);
  const handleSubmit = useCallback(
    ({ status }: IFormParams) => {
      if (status === '') {
        return addToast({
          type: 'error',
          title: 'Selecione o status da tarefa',
        });
      }
      selectTaskStatus(status);
      return nextStep();
    },
    [nextStep, addToast, selectTaskStatus],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <strong>Status da tarefa</strong>
        <SelectField
          name="status"
          defaultValue={defaultType}
          isSearchable={false}
          options={taskStatusTypes}
        />
        <Button type="submit">Pŕoximo</Button>
      </Form>
    </Container>
  );
};

export default CreateTaskStatus;
