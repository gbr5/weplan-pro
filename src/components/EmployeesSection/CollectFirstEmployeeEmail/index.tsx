import React, { useCallback } from 'react';
import IUserDTO from '../../../dtos/IUserDTO';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';

import { Container } from './styles';

interface IProps {
  nextStep: () => void;
}

const CollectFirstEmployeeEmail: React.FC<IProps> = ({ nextStep }) => {
  const { addToast } = useToast();
  const { getUserByEmail, selectUser, selectEmail, selectedUser } = useSignUp();
  const { selectEmployeeEmail } = useCompanyEmployee();

  const handleSubmit = useCallback(
    async (e: string) => {
      const findByEmail = await getUserByEmail(e);
      selectEmployeeEmail(e);
      selectEmail(e);

      if (findByEmail) {
        return selectUser(findByEmail);
      }
      return nextStep();
    },
    [nextStep, selectEmail, selectEmployeeEmail, selectUser, getUserByEmail],
  );

  const unSelectUser = useCallback(() => {
    selectEmployeeEmail('');
    selectEmail('');
    selectUser({} as IUserDTO);
    addToast({
      type: 'info',
      title: 'Selecione um outro e-mail',
    });
  }, [selectUser, addToast, selectEmail, selectEmployeeEmail]);

  return (
    <Container>
      {selectedUser && selectedUser.id ? (
        <span>
          <strong>Deseja selecionar este usuário?</strong>
          <h3>{selectedUser.name}</h3>
          <section>
            <Button type="button" onClick={() => nextStep()}>
              Sim
            </Button>
            <Button type="button" onClick={() => unSelectUser()}>
              Não
            </Button>
          </section>
        </span>
      ) : (
        <>
          <strong>Email do colaborador</strong>
          <CreateInlineFormField
            defaultValue=""
            handleOnSubmit={(e: string) => handleSubmit(e)}
            isFirst={false}
            isLast={false}
            isRequired
            placeholder="E-mail de acesso"
            previousComponent={unSelectUser}
          />
        </>
      )}
    </Container>
  );
};

export default CollectFirstEmployeeEmail;
