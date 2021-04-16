import React, { useCallback, useState } from 'react';
import CollectFamilyName from '../../SignUpComponents/CollectFamilyName';
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
  const [familyNameContainer, setFamilyNameContainer] = useState(false);
  const [passContainer, setPassContainer] = useState(false);
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');

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

  const openFamilyNameContainer = useCallback(
    (e: string) => {
      setName(e);
      closeAllComponents();
      setFamilyNameContainer(true);
    },
    [closeAllComponents],
  );

  const openPassContainer = useCallback(
    (e: string) => {
      setFamilyName(e);
      closeAllComponents();
      setPassContainer(true);
    },
    [closeAllComponents],
  );

  return (
    <Container>
      {emailContainer && (
        <CollectEmployeeEmail
          closeWindow={() => openNameContainer()}
          createEmployee={() => openNameContainer()}
        />
      )}
      {nameContainer && (
        <CollectName
          componentText="Defina o nome do usuário master"
          closeWindow={(e: string) => openFamilyNameContainer(e)}
          previousComponent={() => openEmailContainer()}
        />
      )}
      {familyNameContainer && (
        <CollectFamilyName
          componentText="Defina o sobrenome do usuário master"
          closeWindow={(e: string) => openPassContainer(e)}
          previousComponent={() => openNameContainer()}
        />
      )}
      {passContainer && (
        <CreateFirstEmployee
          name={name}
          familyName={familyName}
          companyEmail={email}
          previousComponent={(e: string) => openFamilyNameContainer(e)}
        />
      )}
    </Container>
  );
};

export default CreateEmployeeContainer;
