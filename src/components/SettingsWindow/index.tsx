import React, { useContext } from 'react';
import Swicth from 'react-switch';
import { ThemeContext } from 'styled-components';

import { MdHelp, MdSchedule } from 'react-icons/md';
import { FiPower } from 'react-icons/fi';
import WindowContainer from '../WindowContainer';
import { useToggleTheme } from '../../hooks/theme';

import { Container, ToggleButton } from './styles';
import { useAuth } from '../../hooks/auth';

interface IProps {
  handleCloseWindow: Function;
  handleContactPageDashboard: Function;
  handleAppointmentsWindow: Function;
  handleHelpWindow: Function;
  handleOpenFormDashboard: Function;
}

const SettingsWindow: React.FC<IProps> = ({
  handleCloseWindow,
  handleContactPageDashboard,
  handleAppointmentsWindow,
  handleHelpWindow,
  handleOpenFormDashboard,
}) => {
  const { signOut } = useAuth();
  const { themeBoolean, toggleTheme } = useToggleTheme();
  const { colors } = useContext(ThemeContext);
  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        top: '5%',
        right: '0%',
        height: '90%',
        width: '90%',
        maxWidth: '400px',
      }}
    >
      <Container>
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
        <button type="button" onClick={() => handleContactPageDashboard()}>
          Página de contato
        </button>
        <button type="button" onClick={() => handleOpenFormDashboard()}>
          Formulários
        </button>

        <button type="button" onClick={() => handleAppointmentsWindow()}>
          <MdSchedule />
        </button>
        <button type="button" onClick={() => handleHelpWindow()}>
          <MdHelp />
        </button>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Container>
    </WindowContainer>
  );
};

export default SettingsWindow;