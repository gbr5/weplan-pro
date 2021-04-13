import React, { useCallback } from 'react';

import { Container } from './styles';
import CreateInlineFormField from '../../../../../../GeneralComponents/CreateInlineFormField';
import { useCheckList } from '../../../../../../../hooks/checkList';

interface IFormParams {
  task: string;
}

interface IProps {
  closeWindow: Function;
  nextStep: () => void;
}

const CreateTaskName: React.FC<IProps> = ({
  closeWindow,
  nextStep,
}: IProps) => {
  const { selectTaskName } = useCheckList();
  const handleSubmit = useCallback(
    (e: string) => {
      selectTaskName(e);
      nextStep();
    },
    [nextStep, selectTaskName],
  );

  return (
    <Container>
      <strong>Nome da tarefa</strong>
      <CreateInlineFormField
        defaultValue=""
        handleOnSubmit={(e: string) => handleSubmit(e)}
        isFirst
        isLast
        isRequired
        placeholder="Nome da tarefa"
        previousComponent={closeWindow}
      />
    </Container>
  );
};

export default CreateTaskName;
