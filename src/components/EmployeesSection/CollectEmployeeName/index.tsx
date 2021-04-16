import React, { useCallback, useMemo } from 'react';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useSignUp } from '../../../hooks/signUp';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';

import { Container } from './styles';

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

const CollectEmployeeName: React.FC<IProps> = ({ nextStep, previousStep }) => {
  const { selectedUser, selectName } = useSignUp();
  const { selectEmployeeName } = useCompanyEmployee();

  const placeholder = useMemo(() => {
    if (
      selectedUser &&
      selectedUser.personInfo &&
      selectedUser.personInfo.first_name
    ) {
      return selectedUser.personInfo.first_name;
    }
    if (selectedUser && selectedUser.name) {
      return selectedUser.name;
    }
    return 'Nome do colaborador';
  }, [selectedUser]);

  const defaultValue = useMemo(() => {
    if (
      selectedUser &&
      selectedUser.personInfo &&
      selectedUser.personInfo.first_name
    ) {
      return selectedUser.personInfo.first_name;
    }
    if (selectedUser && selectedUser.name) {
      return selectedUser.name;
    }
    return '';
  }, [selectedUser]);

  const handleSubmit = useCallback(
    async (e: string) => {
      selectEmployeeName(e);
      selectName(e);
      return nextStep();
    },
    [nextStep, selectName, selectEmployeeName],
  );

  return (
    <Container>
      <strong>Defina o nome do colaborador</strong>
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

export default CollectEmployeeName;
