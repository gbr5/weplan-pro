import React, { useCallback } from 'react';

import sleepyTask from '../../../../assets/sleepyTask1.svg';
import runningTask from '../../../../assets/runningTask1.svg';
import doneTask from '../../../../assets/doneTask1.svg';
import { Container } from './styles';
import { useCheckList } from '../../../../hooks/checkList';
import { useToast } from '../../../../hooks/toast';

interface IFormParams {
  status: string;
}

interface IProps {
  nextStep: () => void;
}

const CreateTaskStatus: React.FC<IProps> = ({ nextStep }: IProps) => {
  const { addToast } = useToast();
  const { selectTaskStatus } = useCheckList();
  const handleSubmit = useCallback(
    (status: string) => {
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
      <h2>Status da tarefa</h2>

      <span>
        <button type="button" onClick={() => handleSubmit('1')}>
          <img src={sleepyTask} alt="" />
        </button>
        <button type="button" onClick={() => handleSubmit('2')}>
          <img src={runningTask} alt="" />
        </button>
        <button type="button" onClick={() => handleSubmit('3')}>
          <img src={doneTask} alt="" />
        </button>
      </span>
    </Container>
  );
};

export default CreateTaskStatus;
