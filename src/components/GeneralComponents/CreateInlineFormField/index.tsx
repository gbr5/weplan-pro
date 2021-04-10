import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { useToast } from '../../../hooks/toast';
import Button from '../../Button';
import Input from '../../Input';

import { Container, ButtonSection } from './styles';

interface IFormParams {
  name: string;
}

interface IProps {
  defaultValue: string;
  placeholder: string;
  handleOnSubmit: (e: string) => void;
  previousComponent: Function;
  isLast: boolean;
  isRequired: boolean;
  isFirst: boolean;
}

const CreateInlineFormField: React.FC<IProps> = ({
  defaultValue,
  handleOnSubmit,
  placeholder,
  previousComponent,
  isFirst,
  isLast,
  isRequired,
}) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (data: IFormParams) => {
      if (isRequired && data.name === '') {
        return addToast({
          type: 'error',
          title: 'Este campo deve ser preenchido!',
        });
      }
      return handleOnSubmit(data.name);
    },
    [isRequired, addToast, handleOnSubmit],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <Input
          containerStyle={{
            border: 'none',
            background: 'transparent',
            borderBottom: '1px solid rgba(0, 0, 0, 0.8)',
            padding: '0.5rem',
            margin: '0 auto',
            minWidth: '6rem',
            boxShadow: 'none',
            borderRadius: '0',
            textAlign: 'center',
            color: 'black',
          }}
          name="name"
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        {isFirst && <Button type="submit">Próximo</Button>}
        <ButtonSection>
          {isLast && !isFirst && (
            <>
              <Button type="button" onClick={() => previousComponent()}>
                Anterior
              </Button>
              <Button type="submit">Enviar</Button>
            </>
          )}
          {!isLast && !isFirst && (
            <>
              <Button type="button" onClick={() => previousComponent()}>
                Anterior
              </Button>
              <Button type="submit">Próximo</Button>
            </>
          )}
        </ButtonSection>
      </Container>
    </Form>
  );
};

export default CreateInlineFormField;
