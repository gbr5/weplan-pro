import React, { useCallback, useState, MouseEventHandler } from 'react';

import { useHistory } from 'react-router-dom';
import { FiSettings, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Container, Menu } from './styles';

import logo from '../../assets/weplan.svg';

import SettingsWindow from '../SettingsWindow';

interface IPropsDTO {
  module: string;
  modulesMenu: boolean;
  handleModulesMenu: MouseEventHandler;
  handleContactPageDashboard: Function;
  handleFormDashboard: Function;
}

const Header: React.FC<IPropsDTO> = ({
  module,
  modulesMenu,
  handleModulesMenu,
  handleContactPageDashboard,
  handleFormDashboard,
}: IPropsDTO) => {
  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);

  const history = useHistory();

  const closeAllWindows = useCallback(() => {
    setHelpWindow(false);
    setSettingsWindow(false);
  }, []);

  const handleAppointmentsWindow = useCallback(() => {
    closeAllWindows();
    setHelpWindow(!helpWindow);
  }, [closeAllWindows, helpWindow]);

  const handleHelpWindow = useCallback(() => {
    closeAllWindows();
    setHelpWindow(!helpWindow);
  }, [closeAllWindows, helpWindow]);

  const handleSettingsWindow = useCallback(() => {
    closeAllWindows();
    setSettingsWindow(!settingsWindow);
  }, [closeAllWindows, settingsWindow]);

  const handleOpenContactPageDashboard = useCallback(() => {
    closeAllWindows();
    handleContactPageDashboard();
  }, [closeAllWindows, handleContactPageDashboard]);

  const handleOpenFormDashboard = useCallback(() => {
    closeAllWindows();
    handleFormDashboard();
  }, [closeAllWindows, handleFormDashboard]);

  const handleNavigateToDashboard = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <>
      <Container>
        <button type="button" onClick={handleNavigateToDashboard}>
          <img src={logo} alt="WePlan" />
          {/* <h1>PRO</h1> */}
        </button>

        <h2>
          {module}

          <button type="button" onClick={handleModulesMenu}>
            {modulesMenu ? (
              <FiChevronDown size={40} />
            ) : (
              <FiChevronUp size={40} />
            )}
          </button>
        </h2>

        <Menu>
          <button type="button" onClick={handleSettingsWindow}>
            <FiSettings />
          </button>
        </Menu>
      </Container>
      {!!settingsWindow && (
        <SettingsWindow
          handleAppointmentsWindow={handleAppointmentsWindow}
          handleHelpWindow={handleHelpWindow}
          handleCloseWindow={handleSettingsWindow}
          handleContactPageDashboard={handleOpenContactPageDashboard}
          handleOpenFormDashboard={handleOpenFormDashboard}
        />
      )}
    </>
  );
};

export default Header;
