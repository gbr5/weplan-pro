import React, { useCallback } from 'react';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';

import { Container } from './styles';

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

const CollectEmployeePosition: React.FC<IProps> = ({
  nextStep,
  previousStep,
}) => {
  const { selectEmployeePosition } = useCompanyEmployee();

  const handleSubmit = useCallback(
    (e: string) => {
      selectEmployeePosition(e);
      nextStep();
    },
    [nextStep, selectEmployeePosition],
  );
  return (
    <Container>
      <strong>Cargo do colaborador</strong>
      <CreateInlineFormField
        defaultValue=""
        handleOnSubmit={(e: string) => handleSubmit(e)}
        isFirst
        isLast={false}
        isRequired
        placeholder="Defina o cargo do colaborador"
        previousComponent={previousStep}
      />
    </Container>
  );
};

export default CollectEmployeePosition;
