import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiMail } from 'react-icons/fi';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
}

interface IFormData {
  email: string;
}

const CollectEmail: React.FC<IProps> = ({ closeWindow }) => {
  const { addToast } = useToast();
  const { getUserByEmail, selectEmail, selectedEmail } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      const findEmail = await getUserByEmail(data.email);
      if (findEmail && findEmail.id) {
        addToast({
          type: 'error',
          title: 'Este e-mail já está cadastrado',
          description: 'Tente novamente!',
        });
      }
      selectEmail(data.email);
      closeWindow();
    },
    [addToast, getUserByEmail, selectEmail, closeWindow],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <strong>Defina o e-mail da empresa</strong>
        <Input
          icon={FiMail}
          inputMode="email"
          type="email"
          name="email"
          defaultValue={selectedEmail}
          placeholder={selectedEmail}
        />
        <Button type="submit">Próximo</Button>
      </Container>
    </Form>
  );
};

export default CollectEmail;
