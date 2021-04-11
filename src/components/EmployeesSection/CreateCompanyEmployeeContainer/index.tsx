import React, { useCallback, useState } from 'react';
import CollectEmployeeEmail from '../CollectEmployeeEmail';
import WindowContainer from '../../WindowContainer';
import CollectEmployeePosition from '../CollectEmployeePosition';

import { Container } from './styles';
import CollectEmployeeAccessLevel from '../CollectEmployeeAccessLevel';
import CollectEmployeeName from '../CollectEmployeeName';
import CollectEmployeeFamilyName from '../CollectEmployeeFamilyName';
import CollectEmployeePassword from '../CollectEmployeePassword';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useSignUp } from '../../../hooks/signUp';
import IUserDTO from '../../../dtos/IUserDTO';
import { useCompanyContact } from '../../../hooks/companyContacts';
import IEmployeeDTO from '../../../dtos/IEmployeeDTO';
import ICompanyContactDTO from '../../../dtos/ICompanyContactDTO';

interface IProps {
  closeWindow: Function;
}

const CreateCompanyEmployeeContainer: React.FC<IProps> = ({ closeWindow }) => {
  const {
    selectEmployeePosition,
    selectEmployeeName,
    selectEmployeeFamilyName,
    selectEmployeeEmail,
    selectEmployeeAccessLevel,
    selectCompanyEmployee,
  } = useCompanyEmployee();
  const { selectContact } = useCompanyContact();
  const { selectName, selectEmail, selectUser } = useSignUp();
  const [positionContainer, setPositionContainer] = useState(true);
  const [accessLevelContainer, setAccessLevelContainer] = useState(false);
  const [emailContainer, setEmailContainer] = useState(false);
  const [nameContainer, setNameContainer] = useState(false);
  const [familyNameContainer, setFamilyNameContainer] = useState(false);
  const [passContainer, setPassContainer] = useState(false);

  const closeAllComponents = useCallback(() => {
    setPositionContainer(false);
    setAccessLevelContainer(false);
    setEmailContainer(false);
    setNameContainer(false);
    setFamilyNameContainer(false);
  }, []);
  const openPositionContainer = useCallback(() => {
    closeAllComponents();
    setPositionContainer(true);
  }, [closeAllComponents]);
  const openAccessLevelContainer = useCallback(() => {
    closeAllComponents();
    setAccessLevelContainer(true);
  }, [closeAllComponents]);
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

  const handleCloseWindow = useCallback(() => {
    closeWindow();
    selectEmployeePosition('');
    selectEmployeeName('');
    selectEmployeeFamilyName('');
    selectEmployeeEmail('');
    selectEmployeeAccessLevel(3);
    selectName('');
    selectEmail('');
    selectUser({} as IUserDTO);
    selectContact({} as ICompanyContactDTO);
    selectCompanyEmployee({} as IEmployeeDTO);
  }, [
    closeWindow,
    selectContact,
    selectCompanyEmployee,
    selectEmployeePosition,
    selectEmployeeName,
    selectEmployeeFamilyName,
    selectEmployeeEmail,
    selectEmployeeAccessLevel,
    selectEmail,
    selectName,
    selectUser,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 11,
        top: '20%',
        left: '5%',
        height: '60%',
        width: '90%',
      }}
    >
      <Container>
        <h1>Novo Colaborador</h1>
        {positionContainer && (
          <CollectEmployeePosition
            nextStep={() => openAccessLevelContainer()}
            previousStep={() => handleCloseWindow()}
          />
        )}
        {accessLevelContainer && (
          <CollectEmployeeAccessLevel
            nextStep={() => openEmailContainer()}
            previousStep={() => openPositionContainer()}
          />
        )}
        {emailContainer && (
          <CollectEmployeeEmail
            nextStep={() => openNameContainer()}
            previousStep={() => openAccessLevelContainer()}
          />
        )}
        {nameContainer && (
          <CollectEmployeeName
            nextStep={() => openFamilyNameContainer()}
            previousStep={() => openEmailContainer()}
          />
        )}
        {familyNameContainer && (
          <CollectEmployeeFamilyName
            nextStep={() => openPassContainer()}
            previousStep={() => openNameContainer()}
          />
        )}
        {passContainer && (
          <CollectEmployeePassword
            nextStep={() => closeWindow()}
            previousStep={() => openPositionContainer()}
          />
        )}
      </Container>
    </WindowContainer>
  );
};

export default CreateCompanyEmployeeContainer;
