import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import weplanLogo from '../../assets/WePlanLogo.svg';
import CreateEmployeeContainer from '../../components/CreateEmployeeComponents/CreateEmployeeContainer';
import api from '../../services/api';

import {
  Container,
  LogoContainer,
  Content,
  AnimationContainer,
  Background,
} from './styles';
import Button from '../../components/Button';

const WelcomePage: React.FC = () => {
  const { addToast } = useToast();
  const location = useLocation();

  const [createMaster, setCreateMaster] = useState(false);
  const [updateTokenButton, setUpdateTokenButton] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const openCreateMasterButton = useCallback(() => {
    setCreateMaster(true);
  }, []);

  const handleActivate = useCallback(async () => {
    try {
      const queryParams = location.search.replace('?token=', '');
      const token = queryParams.split('&')[0];
      const email = queryParams.split('&')[1].replace('email=', '');
      setUserEmail(email);

      await api.put(`/user/activation/${token}`);

      addToast({
        type: 'success',
        title: 'Conta validada com sucesso!',
        description: 'Você já pode fazer login.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na validação da conta.',
        description:
          'Ocorreu um erro ao tentar realizar da sua conta, tente novamente.',
      });
      setUpdateTokenButton(true);
      throw new Error(err);
    }
  }, [addToast, location]);

  useEffect(() => {
    handleActivate();
  }, [handleActivate]);

  const sendNewActivationEmail = useCallback(async () => {
    try {
      await api.post('user/activation', {
        email: userEmail,
      });

      addToast({
        type: 'success',
        title: 'E-mail enviado com sucesso!',
        description:
          'O token para validação do seu perfil tem validade de 2 horas.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao enviar e-mail.',
        description:
          'Ocorreu um erro ao enviar e-mail de verificação, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, userEmail]);

  // const createFirstEmployee = useCallback(() => {
  //   try {

  //   } catch (err) {

  //   }
  // }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <LogoContainer>
            <img src={weplanLogo} alt="WePlan - Party" />
            <h1>WePlan</h1>
          </LogoContainer>

          {updateTokenButton ? (
            <>
              <h1>Token inválido!</h1>
              <button type="button" onClick={sendNewActivationEmail}>
                Reenviar e-mail de verificação
              </button>
            </>
          ) : (
            <CreateEmployeeContainer email={userEmail} />
          )}
          {!updateTokenButton && createMaster && (
            <Button type="button" onClick={() => openCreateMasterButton()}>
              Criar Master
            </Button>
          )}
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default WelcomePage;
