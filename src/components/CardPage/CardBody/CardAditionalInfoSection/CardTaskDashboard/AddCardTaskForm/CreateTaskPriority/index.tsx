import React, { useCallback, useMemo, useRef } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import { useCheckList } from '../../../../../../../hooks/checkList';
import SelectField from '../../../../../../FormComponents/SelectField';
import { useToast } from '../../../../../../../hooks/toast';
import Button from '../../../../../../Button';

interface IFormParams {
  priority: string;
}

interface IProps {
  nextStep: () => void;
}

const CreateTaskPriority: React.FC<IProps> = ({ nextStep }: IProps) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const {
    selectTaskPriority,
    taskPriority,
    taskPriorityTypes,
  } = useCheckList();
  const defaultType = useMemo(() => {
    const findDefaultType = taskPriorityTypes.find(
      type => type.value === taskPriority,
    );
    if (findDefaultType) {
      return findDefaultType;
    }
    return taskPriorityTypes[0];
  }, [taskPriorityTypes, taskPriority]);
  const handleSubmit = useCallback(
    ({ priority }: IFormParams) => {
      if (priority === '') {
        return addToast({
          type: 'error',
          title: 'Selecione a prioridade da tarefa',
        });
      }
      selectTaskPriority(priority);
      return nextStep();
    },
    [nextStep, addToast, selectTaskPriority],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <strong>Prioridade da tarefa</strong>
        <SelectField
          name="priority"
          defaultValue={defaultType}
          isSearchable={false}
          options={taskPriorityTypes}
        />
        <Button type="submit">Pŕoximo</Button>
      </Form>
    </Container>
  );
};

export default CreateTaskPriority;
