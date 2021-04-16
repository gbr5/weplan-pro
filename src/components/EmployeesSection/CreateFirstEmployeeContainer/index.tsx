import React, { useCallback, useState } from 'react';
import CollectEmployeeName from '../CollectEmployeeName';
import CollectEmployeeFamilyName from '../CollectEmployeeFamilyName';
import CreateFirstEmployee from './CreateFirstEmployee';
import CollectFirstEmployeeEmail from '../CollectFirstEmployeeEmail';

import { Container } from './styles';

interface IProps {
  email: string;
}

const CreateFirstEmployeeContainer: React.FC<IProps> = ({ email }) => {
  const [emailContainer, setEmailContainer] = useState(true);
  const [nameContainer, setNameContainer] = useState(false);
  const [familyNameContainer, setFamilyNameContainer] = useState(false);
  const [passContainer, setPassContainer] = useState(false);

  const closeAllComponents = useCallback(() => {
    setEmailContainer(false);
    setNameContainer(false);
    setFamilyNameContainer(false);
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

  const openFamilyNameContainer = useCallback(() => {
    closeAllComponents();
    setFamilyNameContainer(true);
  }, [closeAllComponents]);

  const openPassContainer = useCallback(() => {
    closeAllComponents();
    setPassContainer(true);
  }, [closeAllComponents]);

  return (
    <Container>
      {emailContainer && (
        <CollectFirstEmployeeEmail nextStep={openNameContainer} />
      )}
      {nameContainer && (
        <CollectEmployeeName
          nextStep={() => openFamilyNameContainer()}
          previousStep={() => openEmailContainer()}
        />
      )}
      {familyNameContainer && (
        <CollectEmployeeFamilyName
          nextStep={openPassContainer}
          previousStep={openNameContainer}
        />
      )}
      {passContainer && (
        <CreateFirstEmployee
          companyEmail={email}
          previousComponent={() => openFamilyNameContainer()}
        />
      )}
    </Container>
  );
};

export default CreateFirstEmployeeContainer;
