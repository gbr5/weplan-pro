import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useSignUp } from '../../../hooks/signUp';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  componentText: string;
  closeWindow: (e: string) => void;
  previousComponent: () => void;
}

interface IFormParams {
  name: string;
}

const CollectFamilyName: React.FC<IProps> = ({
  closeWindow,
  previousComponent,
  componentText,
}) => {
  const { selectFamilyName, selectedFamilyName } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormParams) => {
      selectFamilyName(data.name);
      closeWindow(data.name);
    },
    [selectFamilyName, closeWindow],
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
          defaultValue={selectedFamilyName}
          placeholder={selectedFamilyName}
        />
        <Button type="submit">Próximo</Button>
      </Container>
    </Form>
  );
};

export default CollectFamilyName;
