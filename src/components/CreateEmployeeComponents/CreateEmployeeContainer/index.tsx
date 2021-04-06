import React, { useCallback, useState } from 'react';
import CollectName from '../../SignUpComponents/CollectName';
import CollectEmployeeEmail from '../CollectEmployeeEmail';
import CreateFirstEmployee from '../CreateFirstEmployee';

import { Container } from './styles';

interface IProps {
  email: string;
}

const CreateEmployeeContainer: React.FC<IProps> = ({ email }) => {
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

  return (
    <Container>
      {emailContainer && (
        <CollectEmployeeEmail
          closeWindow={() => openNameContainer()}
          createEmployee={() => openPassContainer()}
        />
      )}
      {nameContainer && (
        <CollectName
          componentText="Defina o nome do usuário master"
          closeWindow={() => openPassContainer()}
          previousComponent={() => openEmailContainer()}
        />
      )}
      {passContainer && (
        <CreateFirstEmployee
          companyEmail={email}
          previousComponent={() => openNameContainer()}
        />
      )}
    </Container>
  );
};

export default CreateEmployeeContainer;
