import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiMail } from 'react-icons/fi';
import IUserDTO from '../../../dtos/IUserDTO';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
  createEmployee: () => void;
}

interface IFormData {
  email: string;
}

const CollectEmployeeEmail: React.FC<IProps> = ({
  closeWindow,
  createEmployee,
}) => {
  const { addToast } = useToast();
  const {
    getUserByEmail,
    selectEmail,
    selectedEmail,
    selectUser,
    selectedUser,
  } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      const findUser = await getUserByEmail(data.email);
      if (findUser) {
        return selectUser(findUser);
      }
      selectEmail(data.email);
      return closeWindow();
    },
    [closeWindow, selectEmail, selectUser, getUserByEmail],
  );

  const unSelectUser = useCallback(() => {
    selectUser({} as IUserDTO);
    addToast({
      type: 'info',
      title: 'Selecione um outro e-mail',
    });
  }, [selectUser, addToast]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        {selectedUser && selectedUser.id && (
          <>
            <strong>Deseja selecionar este usuário?</strong>
            <h3>{selectedUser.name}</h3>
            <Button type="button" onClick={() => createEmployee()}>
              Sim
            </Button>
            <Button type="button" onClick={unSelectUser}>
              Não
            </Button>
          </>
        )}
        {!selectedUser ||
          (selectedUser && !selectedUser.id && (
            <>
              <strong>Defina o e-mail do master</strong>
              <Input
                icon={FiMail}
                inputMode="email"
                type="email"
                name="email"
                defaultValue={selectedEmail}
                placeholder={selectedEmail}
              />
              <Button type="submit">Próximo</Button>
            </>
          ))}
      </Container>
    </Form>
  );
};

export default CollectEmployeeEmail;
