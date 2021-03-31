import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
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
  ToggleButton,
} from './styles';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

interface IContactInfo {
  contact_info: string;
}

interface IContractOrder {
  company_id: string;
  name: string;
}

interface ICompanyEmployee {
  employee_id: string;
  company_id: string;
}

interface ICompanyUser {
  company_id: string;
  name: string;
}

const SignUp: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState<SignUpForm>({} as SignUpForm);
  const [options, setOptions] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signIn } = useEmployeeAuth();

  const handleSubmitContactInfo = useCallback(
    async (data: IContactInfo) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          contact_info: Yup.string().required('número é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`/profile/contact-info/add/${userId}`, {
          contact_info: data.contact_info,
          contact_type: 'phone',
        });
        setUserId('');

        setContactInfo(false);
        setOptions(true);
        signIn({ email: userInfo.email, password: userInfo.password });

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
    [addToast, userId, signIn, userInfo],
  );

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
        setCompanyInfo(false);
        setContactInfo(true);

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
    [addToast, userId],
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
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
        });

        setOptions(false);
        setCompanyInfo(true);

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

  const containerStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <Container>
      <ToggleButton>
        <h3>Cadastro</h3>
        <Link to="/signin">
          <h2>Login</h2>
        </Link>
      </ToggleButton>
      <Background />
      <Content>
        <AnimationContainer>
          {!!options && (
            <>
              <h1>
                WePlan <strong>PRO</strong>
              </h1>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <div>
                  <h3>Work</h3> <h1>SMART!</h1>
                </div>
                <div>
                  <h2>A genialidade está na simplicidade,</h2>
                </div>
                <div>
                  <h2>A excelência nos detalhes !</h2>
                </div>

                <Input
                  name="name"
                  icon={FiUser}
                  type="text"
                  placeholder="Nome"
                  containerStyle={containerStyle}
                />
                <Input
                  name="email"
                  icon={FiMail}
                  type="text"
                  placeholder="E-mail"
                  containerStyle={containerStyle}
                />
                <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  containerStyle={containerStyle}
                  placeholder="Senha"
                />
                <Input
                  name="password_confirmation"
                  icon={FiLock}
                  type="password"
                  placeholder="Confirme a sua senha"
                  containerStyle={containerStyle}
                />

                <Button type="submit">Cadastrar</Button>
              </Form>
              <Link to="/signin">Fazer login</Link>
              <a href="https://www.weplan.party" target="blank">
                <p>Não sou empresa de eventos</p>
              </a>
            </>
          )}

          {!options && !!companyInfo && (
            <Form ref={formRef} onSubmit={handleSubmitCompanyInfo}>
              <QuestionTitle>Informações da empresa</QuestionTitle>
              <div>
                <h3>Work</h3> <h1>Smart!</h1>
              </div>
              <h3>Party Hard!</h3>
              <p>Razão Social</p>
              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Razão social"
              />
              <p>CNPJ</p>
              <Input
                name="company_id"
                icon={FiUser}
                type="text"
                placeholder="CNPJ"
              />

              <Button type="submit">Próximo</Button>
            </Form>
          )}
          {!options && !!contactInfo && (
            <Form ref={formRef} onSubmit={handleSubmitContactInfo}>
              <QuestionTitle>Informações da empresa</QuestionTitle>
              <div>
                <h3>Work</h3> <h1>Smart!</h1>
              </div>
              <h3>Party Hard!</h3>
              <p>Por último,</p>
              <p>precisamos de um telefone de contato, pode ser whatsapp</p>
              <Input
                name="contact_info"
                type="text"
                placeholder="Telefone com DDD"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>
          )}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
