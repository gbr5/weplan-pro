import React, { useCallback, useState } from 'react';

import { FiSettings } from 'react-icons/fi';
import { Container, Menu } from './styles';

import logo from '../../assets/weplan.svg';

import SettingsWindow from '../SettingsWindow';
import { useHomeController } from '../../hooks/homeController';

const Header: React.FC = () => {
  const { selectPage } = useHomeController();
  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);

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

  return (
    <>
      <Container>
        <button type="button" onClick={() => selectPage('Home')}>
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
          handleAppointmentsWindow={handleAppointmentsWindow}
          handleHelpWindow={() => selectPage('Home')}
          handleCloseWindow={handleSettingsWindow}
          handleContactPageDashboard={handleOpenContactPageDashboard}
          handleOpenFormDashboard={handleOpenFormDashboard}
        />
      )}
    </>
  );
};

export default Header;
