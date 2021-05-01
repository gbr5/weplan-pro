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
import CreateCompanyContactForm from '../CompanyContactComponents/CreateCompanyContactForm';
import { useStageCard } from '../../hooks/stageCard';
import { useCheckList } from '../../hooks/checkList';
import ICardCheckListDTO from '../../dtos/ICardCheckListDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import ICardNotesDTO from '../../dtos/ICardNotesDTO';
import SelectNewTaskCheckList from '../TaskDashboard/AllTasksSection/SelectNewTaskCheckList';

const Header: React.FC = () => {
  const history = useHistory();
  const { selectCard, selectCardCheckList, selectNote } = useStageCard();
  const { unSelectAllCheckLists } = useCheckList();
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
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [createCompanyContactWindow, setCreateCompanyContactWindow] = useState(
    false,
  );
  const closeAllWindows = useCallback(() => {
    setHelpWindow(false);
    setSettingsWindow(false);
    setCreateTaskWindow(false);
    setCreateCompanyContactWindow(false);
  }, []);

  const handleCreateTaskWindow = useCallback(
    (e: boolean) => {
      closeAllWindows();
      setCreateTaskWindow(e);
    },
    [closeAllWindows],
  );

  const handleCreateCompanyContactWindow = useCallback(
    (e: boolean) => {
      closeAllWindows();
      setCreateCompanyContactWindow(e);
    },
    [closeAllWindows],
  );

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
    selectCard({} as IStageCardDTO);
    selectCardCheckList({} as ICardCheckListDTO);
    selectNote({} as ICardNotesDTO);
    unSelectAllCheckLists();
  }, [
    history,
    selectCard,
    selectCardCheckList,
    selectNote,
    unSelectAllCheckLists,
    selectPage,
  ]);

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
      {createTaskWindow && (
        <SelectNewTaskCheckList
          closeWindow={() => handleCreateTaskWindow(false)}
        />
      )}
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
          handleCreateTask={() => handleCreateTaskWindow(!createTaskWindow)}
          handleCreateCompanyContactWindow={() =>
            handleCreateCompanyContactWindow(!createCompanyContactWindow)
          }
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
      {createCompanyContactWindow && (
        <CreateCompanyContactForm
          handleCloseWindow={() => handleCreateCompanyContactWindow(false)}
        />
      )}
    </>
  );
};

export default Header;
