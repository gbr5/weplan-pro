import React, { useCallback } from 'react';
import { MdFlag } from 'react-icons/md';

import { Container } from './styles';
import { useCheckList } from '../../../../hooks/checkList';
import { useToast } from '../../../../hooks/toast';

interface IFormParams {
  priority: string;
}

interface IProps {
  nextStep: () => void;
}

const CreateTaskPriority: React.FC<IProps> = ({ nextStep }: IProps) => {
  const { addToast } = useToast();
  const { selectTaskPriority } = useCheckList();

  const iconSize = 42;

  const handleSubmit = useCallback(
    (priority: string) => {
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
      <h2>Prioridade da tarefa</h2>

      <span>
        <button type="button" onClick={() => handleSubmit('low')}>
          <MdFlag color="green" size={iconSize} />
        </button>
        <button type="button" onClick={() => handleSubmit('neutral')}>
          <MdFlag color="yellow" size={iconSize} />
        </button>
        <button type="button" onClick={() => handleSubmit('high')}>
          <MdFlag color="red" size={iconSize} />
        </button>
      </span>
    </Container>
  );
};

export default CreateTaskPriority;
