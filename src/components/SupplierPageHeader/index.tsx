import React, {
  useCallback,
  useState,
  useContext,
  MouseEventHandler,
} from 'react';
import Swicth from 'react-switch';
import { ThemeContext } from 'styled-components';

import { useHistory } from 'react-router-dom';
import { MdHelp, MdSchedule } from 'react-icons/md';
import {
  FiSettings,
  FiPower,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { Header, Menu, ToggleButton } from './styles';
import { useToggleTheme } from '../../hooks/theme';

import logo from '../../assets/weplan.svg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';
import MenuButton from '../MenuButton';

interface IPropsDTO {
  module: string;
  modulesMenu: boolean;
  handleModulesMenu: MouseEventHandler;
}

const SupplierPageHeader: React.FC<IPropsDTO> = ({
  module,
  modulesMenu,
  handleModulesMenu,
}: IPropsDTO) => {
  const { colors } = useContext(ThemeContext);
  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);

  const { signOut } = useAuth();
  const { toggleTheme, themeBoolean } = useToggleTheme();
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

  const handleNavigateToDashboard = useCallback(() => {
    history.push('/dashboard');
  }, [history]);

  return (
    <>
      <Header>
        <h1>
          <MenuButton />
        </h1>

        <button type="button" onClick={handleNavigateToDashboard}>
          <img src={logo} alt="WePlan" />
          <h1>PRO</h1>
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
          <button type="button" onClick={handleAppointmentsWindow}>
            <MdSchedule />
          </button>
          <button type="button" onClick={handleHelpWindow}>
            <MdHelp />
          </button>
          <button type="button" onClick={handleSettingsWindow}>
            <FiSettings />
          </button>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </Menu>
      </Header>
      {!!helpWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setHelpWindow(false)}
          containerStyle={{
            top: '2%',
            left: '5%',
            height: '96%',
            width: '90%',
          }}
        >
          <h1>Opções de ajuda</h1>
        </WindowContainer>
      )}
      {!!settingsWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setSettingsWindow(false)}
          containerStyle={{
            top: '100px',
            right: '8px',
            height: '200px',
            width: '250px',
          }}
        >
          <ToggleButton>
            <h3>Tema {themeBoolean ? 'Escuro' : 'Claro'}</h3>
            <Swicth
              onChange={toggleTheme}
              checked={themeBoolean}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={40}
              handleDiameter={20}
              offColor={colors.secondary}
              onColor={colors.primary}
            />
          </ToggleButton>
        </WindowContainer>
      )}
    </>
  );
};

export default SupplierPageHeader;
