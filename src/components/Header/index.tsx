import React, { useCallback, useState } from 'react';

import { FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Menu } from './styles';
import CreateComercialCard from '../CardComponents/CreateComercialCard';
import SelectEmployee from '../GeneralComponents/SelectEmployee';

import logo from '../../assets/weplan.svg';

import SettingsWindow from '../SettingsWindow';
import { useHomeController } from '../../hooks/homeController';
import { useCompanyEmployee } from '../../hooks/companyEmployee';
import { useCompanyContact } from '../../hooks/companyContacts';
import IEmployeeDTO from '../../dtos/IEmployeeDTO';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';

const Header: React.FC = () => {
  const history = useHistory();
  const {
    getCompanyContacts,
    selectContact,
    selectedContact,
  } = useCompanyContact();
  const {
    selectedCompanyEmployee,
    selectCompanyEmployee,
  } = useCompanyEmployee();
  const { selectPage } = useHomeController();

  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);
  const [createComercialCardWindow, setCreateComercialCardWindow] = useState(
    false,
  );
  const closeAllWindows = useCallback(() => {
    setHelpWindow(false);
    setSettingsWindow(false);
  }, []);

  const handleAppointmentsWindow = useCallback(() => {
    closeAllWindows();
    setHelpWindow(!helpWindow);
  }, [closeAllWindows, helpWindow]);

  const handleSettingsWindow = useCallback(() => {
    closeAllWindows();
    setSettingsWindow(!settingsWindow);
  }, [closeAllWindows, settingsWindow]);

  const handleOpenContactPageDashboard = useCallback(() => {
    closeAllWindows();
    selectPage('Contacts');
  }, [closeAllWindows, selectPage]);

  const handleOpenFormDashboard = useCallback(() => {
    closeAllWindows();
    selectPage('Forms');
  }, [closeAllWindows, selectPage]);

  const navigateHome = useCallback(() => {
    selectPage('Home');
    history.push('/dashboard');
  }, [history, selectPage]);

  const handleCreateComercialCard = useCallback(
    (e: boolean) => {
      if (e) {
        getCompanyContacts();
        closeAllWindows();
      } else {
        selectCompanyEmployee({} as IEmployeeDTO);
        selectContact({} as ICompanyContactDTO);
      }
      setCreateComercialCardWindow(e);
    },
    [closeAllWindows, selectCompanyEmployee, selectContact, getCompanyContacts],
  );
  return (
    <>
      <Container>
        <button type="button" onClick={navigateHome}>
          <img src={logo} alt="WePlan" />
          <h1>PRO</h1>
        </button>

        <Menu>
          <button type="button" onClick={handleSettingsWindow}>
            <FiSettings />
          </button>
        </Menu>
      </Container>
      {!!settingsWindow && (
        <SettingsWindow
          handleCreateComercialCard={() => handleCreateComercialCard(true)}
          handleAppointmentsWindow={handleAppointmentsWindow}
          handleHelpWindow={() => selectPage('Home')}
          handleCloseWindow={handleSettingsWindow}
          handleContactPageDashboard={handleOpenContactPageDashboard}
          handleOpenFormDashboard={handleOpenFormDashboard}
        />
      )}
      {createComercialCardWindow &&
        (selectedCompanyEmployee &&
        selectedCompanyEmployee.id &&
        selectedContact &&
        selectedContact.id ? (
          <CreateComercialCard
            closeWindow={() => handleCreateComercialCard(false)}
          />
        ) : (
          <SelectEmployee
            closeWindow={() => handleCreateComercialCard(false)}
          />
        ))}
    </>
  );
};

export default Header;
