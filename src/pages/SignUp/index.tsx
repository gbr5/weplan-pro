import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  Background,
  QuestionTitle,
} from './styles';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface IPersonUser {
  person_id: string;
  first_name: string;
  last_name: string;
}
interface ICompanyUser {
  company_id: string;
  name: string;
}

const SignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [options, setOptions] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmitCompanyInfo = useCallback(
    async (data: ICompanyUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          company_id: Yup.string().required('CNPJ é obrigatório'),
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/company-info', {
          company_id: data.company_id,
          name: data.name,
          user_id: userId,
        });
        setUserId('');

        setOptions(true);

        history.push('/signin');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history, userId],
  );

  const handleSubmit = useCallback(
    async (data: SignUpForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const validatedData = {
          name: data.name,
          email: data.email,
          password: data.password,
          isCompany: true,
        };

        const response = await api.post('/users', validatedData);
        setUserId(response.data.id);

        setOptions(false);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          {!!options && (
            <>
              <h1>WePlan</h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <p>Software de gestão para empresas de evento!</p>
                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Nome"
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
                />
                <Input
                  name="password_confirmation"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirme a sua senha"
                />

                <Button type="submit">Cadastrar</Button>
              </Form>
            </>
          )}

          {!options && (
            <Form ref={formRef} onSubmit={handleSubmitCompanyInfo}>
              <QuestionTitle>Informações da empresa</QuestionTitle>

              <strong>Razão Social</strong>
              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Razão social"
              />
              <strong>CNPJ</strong>
              <Input
                name="company_id"
                icon={FiUser}
                type="text"
                placeholder="CNPJ"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>
          )}

          <a href="https://www.we-plan.io" target="blank">
            <FiArrowLeft />
            Não sou empresa de eventos
          </a>
          <Link to="/signin">
            Já sou cadastrado(a)
            <FiArrowRight />
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
