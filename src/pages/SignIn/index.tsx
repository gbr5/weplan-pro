import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';
import weplanLogo from '../../assets/WePlanLogo.svg';
import {
  Container,
  ToggleButton,
  Content,
  AnimationContainer,
  Background,
  LogoContainer,
} from './styles';
import GoogleLoginComponent from '../../components/AuthComponents/GoogleLoginComponent';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useEmployeeAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Bem Vindo!',
          description: 'Sua dashboard está pronta!.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credênciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <ToggleButton>
        <Link to="/">
          <h2>Cadastro</h2>
        </Link>
        <h3>Login</h3>
      </ToggleButton>
      <Background />
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <GoogleLoginComponent buttonText="Entre com o Google" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              inputMode="email"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            <p>Cadastrar como empresa de evento</p>
          </Link>
          <a href="https://www.weplan.party" target="blank">
            <FiLogIn />
            <p>Cadastrar como usuário final</p>
          </a>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default SignIn;
