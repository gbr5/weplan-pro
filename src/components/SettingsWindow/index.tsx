import React, { useCallback } from 'react';

import { MdHelp, MdSchedule } from 'react-icons/md';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';
// ToggleButton
import { useEmployeeAuth } from '../../hooks/employeeAuth';

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
  const history = useHistory();
  const { signOut } = useEmployeeAuth();
  // const { themeBoolean, toggleTheme } = useToggleTheme();
  // const { colors } = useContext(ThemeContext);

  const handleSignout = useCallback(() => {
    localStorage.clear();
    signOut();
    history.push('/');
  }, [signOut, history]);
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
        {/* <ToggleButton>
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
        </ToggleButton> */}
        <button type="button" onClick={() => handleContactPageDashboard()}>
          Página de contato
        </button>
        <button type="button" onClick={() => handleOpenFormDashboard()}>
          Formulários
        </button>

        <button type="button" onClick={() => handleAppointmentsWindow()}>
          <MdSchedule size={24} />
        </button>
        <button type="button" onClick={() => handleHelpWindow()}>
          <MdHelp size={24} />
        </button>
        <button type="button" onClick={handleSignout}>
          <FiPower size={24} />
        </button>
      </Container>
    </WindowContainer>
  );
};

export default SettingsWindow;
