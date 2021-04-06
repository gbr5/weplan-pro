import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  componentText: string;
  closeWindow: () => void;
  previousComponent: () => void;
}

interface IFormParams {
  name: string;
}

const CollectName: React.FC<IProps> = ({
  closeWindow,
  previousComponent,
  componentText,
}) => {
  const { addToast } = useToast();
  const {
    getUserByName,
    getCompanyInfoByName,
    selectName,
    selectedName,
  } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormParams) => {
      const findName = await getUserByName(data.name);
      const findCompanyName = await getCompanyInfoByName(data.name);
      if (
        (findName && findName.id) ||
        (findCompanyName && findCompanyName.id)
      ) {
        addToast({
          type: 'error',
          title: 'Este nome já está cadastrado',
          description: 'Tente novamente!',
        });
      }
      selectName(data.name);
      closeWindow();
    },
    [addToast, getUserByName, getCompanyInfoByName, selectName, closeWindow],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <span>
          <button type="button" onClick={() => previousComponent()}>
            <FiArrowLeft size={24} />
          </button>
        </span>
        <strong>{componentText}</strong>
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
