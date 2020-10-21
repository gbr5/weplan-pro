import React, {
  useCallback,
  useState,
  useContext,
  MouseEventHandler,
} from 'react';
import Swicth from 'react-switch';
import { ThemeContext } from 'styled-components';

import { useHistory } from 'react-router-dom';
import { MdHelp } from 'react-icons/md';
import {
  FiSettings,
  FiPower,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { Header, HeaderContent, Menu, ToggleButton } from './styles';
import { useToggleTheme } from '../../hooks/theme';

import logo from '../../assets/weplan.svg';
import { useAuth } from '../../hooks/auth';

import WindowContainer from '../WindowContainer';
import supplierLogo from '../../assets/elefante.png';

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
  const history = useHistory();
  const { user } = useAuth();

  const [helpWindow, setHelpWindow] = useState(false);
  const [settingsWindow, setSettingsWindow] = useState(false);

  const { signOut } = useAuth();
  const { toggleTheme, themeBoolean } = useToggleTheme();

  const closeAllWindows = useCallback(() => {
    setHelpWindow(false);
    setSettingsWindow(false);
  }, []);

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
        <HeaderContent>
          <img src={supplierLogo} alt="WePlanPRO" />

          <button type="button" onClick={handleNavigateToDashboard}>
            <img src={logo} alt="WePlan" />
            <h1>PRO</h1>
          </button>

          {!user.isCompany ? (
            <>
              {module}
              <button type="button" onClick={handleModulesMenu}>
                {modulesMenu ? (
                  <FiChevronDown size={40} />
                ) : (
                  <FiChevronUp size={40} />
                )}
              </button>
            </>
          ) : (
            <h2>{user.name}</h2>
          )}
          {!user.isCompany ? (
            <Menu>
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
          ) : (
            <Menu>
              <button type="button" onClick={signOut}>
                <FiPower />
              </button>
            </Menu>
          )}
        </HeaderContent>
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
