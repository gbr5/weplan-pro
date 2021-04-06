import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErros';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
  previousComponent: () => void;
}

interface IFormData {
  password: string;
  password_confirmation: string;
}

const CreateCompany: React.FC<IProps> = ({
  closeWindow,
  previousComponent,
}) => {
  const { addToast } = useToast();
  const { createCompany } = useSignUp();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        createCompany(data.password);

        closeWindow();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, createCompany, closeWindow],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <span>
          <button type="button" onClick={() => previousComponent()}>
            <FiArrowLeft size={24} />
          </button>
        </span>

        <strong>Defina a senha da empresa</strong>
        <Input name="password" type="password" icon={FiLock} />
        <strong>Confirme a senha</strong>
        <Input
          name="password_confirmation"
          icon={FiLock}
          type="password"
          placeholder="Confirme a sua senha"
        />
        <Button type="submit">Próximo</Button>
      </Container>
    </Form>
  );
};

export default CreateCompany;
