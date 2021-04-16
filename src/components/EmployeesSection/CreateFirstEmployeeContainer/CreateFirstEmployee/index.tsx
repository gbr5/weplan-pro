import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useCompanyEmployee } from '../../../../hooks/companyEmployee';
import { useSignUp } from '../../../../hooks/signUp';
import { useToast } from '../../../../hooks/toast';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErros';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container } from './styles';

interface IProps {
  companyEmail: string;
  previousComponent: (e: string) => void;
}

interface IFormData {
  password: string;
  password_confirmation: string;
}

const CreateFirstEmployee: React.FC<IProps> = ({
  previousComponent,
  companyEmail,
}) => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { createUser, selectedUser } = useSignUp();
  const { employeeName, employeeFamilyName } = useCompanyEmployee();

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

        if (!selectedUser || (selectedUser && !selectedUser.id)) {
          const response = await createUser(data.password);

          await api.post(`/first-master`, {
            companyEmail,
            user_id: response.id,
            password: data.password,
            email: response.email,
            name: employeeName,
            family_name: employeeFamilyName,
          });
        } else {
          await api.post(`/first-master`, {
            companyEmail,
            user_id: selectedUser.id,
            password: data.password,
            email: selectedUser.email,
            name: employeeName,
            family_name: employeeFamilyName,
          });
        }
        history.push('/');
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
    [
      addToast,
      createUser,
      companyEmail,
      history,
      selectedUser,
      employeeName,
      employeeFamilyName,
    ],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <span>
          <button type="button" onClick={() => previousComponent('')}>
            <FiArrowLeft size={24} />
          </button>
        </span>

        <strong>Defina a senha</strong>
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

export default CreateFirstEmployee;
