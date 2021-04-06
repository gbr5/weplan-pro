import React, { useCallback, useEffect, useState } from 'react';
import { useSignUp } from '../../../hooks/signUp';
import CollectEmail from '../CollectEmail';
import CollectName from '../CollectName';
import CreateCompany from '../CreateCompany';

import { Container } from './styles';

const SignUpContainer: React.FC = () => {
  const { companyCreated } = useSignUp();
  const [emailContainer, setEmailContainer] = useState(true);
  const [nameContainer, setNameContainer] = useState(false);
  const [passContainer, setPassContainer] = useState(false);

  const closeAllComponents = useCallback(() => {
    setEmailContainer(false);
    setNameContainer(false);
    setPassContainer(false);
  }, []);

  const openEmailContainer = useCallback(() => {
    closeAllComponents();
    setEmailContainer(true);
  }, [closeAllComponents]);

  const openNameContainer = useCallback(() => {
    closeAllComponents();
    setNameContainer(true);
  }, [closeAllComponents]);

  const openPassContainer = useCallback(() => {
    closeAllComponents();
    setPassContainer(true);
  }, [closeAllComponents]);

  useEffect(() => {
    if (companyCreated) {
      closeAllComponents();
    }
  }, [closeAllComponents, companyCreated]);

  return (
    <Container>
      {emailContainer && <CollectEmail closeWindow={openNameContainer} />}
      {nameContainer && (
        <CollectName
          componentText="Defina o nome da empresa"
          previousComponent={openEmailContainer}
          closeWindow={openPassContainer}
        />
      )}
      {passContainer && (
        <CreateCompany
          closeWindow={openPassContainer}
          previousComponent={openNameContainer}
        />
      )}
      {companyCreated && (
        <section>
          <h1>Empresa criada com sucesso</h1>

          <p>Te enviamos um e-mail de confirmação</p>

          <p>Acesse para ter acesso à WePlan PRO</p>
        </section>
      )}
    </Container>
  );
};

export default SignUpContainer;
