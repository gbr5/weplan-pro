import React, { useCallback, useMemo } from 'react';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useSignUp } from '../../../hooks/signUp';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';

import { Container } from './styles';

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

const CollectEmployeeFamilyName: React.FC<IProps> = ({
  nextStep,
  previousStep,
}) => {
  const { selectedUser } = useSignUp();
  const { selectEmployeeFamilyName } = useCompanyEmployee();

  const placeholder = useMemo(() => {
    if (
      selectedUser &&
      selectedUser.personInfo &&
      selectedUser.personInfo.last_name
    ) {
      return selectedUser.personInfo.last_name;
    }
    return 'Sobrenome do colaborador';
  }, [selectedUser]);

  const defaultValue = useMemo(() => {
    if (
      selectedUser &&
      selectedUser.personInfo &&
      selectedUser.personInfo.last_name
    ) {
      return selectedUser.personInfo.last_name;
    }
    return '';
  }, [selectedUser]);

  const handleSubmit = useCallback(
    async (e: string) => {
      selectEmployeeFamilyName(e);
      return nextStep();
    },
    [nextStep, selectEmployeeFamilyName],
  );

  return (
    <Container>
      <strong>Sobrenome do colaborador</strong>
      <CreateInlineFormField
        defaultValue={defaultValue}
        handleOnSubmit={(e: string) => handleSubmit(e)}
        isFirst={false}
        isLast={false}
        isRequired
        placeholder={placeholder}
        previousComponent={previousStep}
      />
    </Container>
  );
};

export default CollectEmployeeFamilyName;
