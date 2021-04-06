import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
}

const CollectName: React.FC<IProps> = ({ closeWindow }) => {
  const { addToast } = useToast();
  const {
    getUserByName,
    getCompanyInfoByName,
    selectName,
    selectedName,
  } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (name: string) => {
      const findName = getUserByName(name);
      const findCompanyName = getCompanyInfoByName(name);
      if (findName || findCompanyName) {
        addToast({
          type: 'error',
          title: 'Este nome já está cadastrado',
          description: 'Tente novamente!',
        });
      }
      selectName(name);
      closeWindow();
    },
    [addToast, getUserByName, getCompanyInfoByName, selectName, closeWindow],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <strong>Defina o nome da empresa</strong>
        <Input
          name="name"
          defaultValue={selectedName}
          placeholder={selectedName}
        />
        <Button type="submit">Próximo</Button>
      </Container>
    </Form>
  );
};

export default CollectName;
