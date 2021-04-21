import React, { useCallback, useEffect } from 'react';

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
  handleCreateComercialCard: () => void;
  handleCreateTask: () => void;
  handleCreateCompanyContactWindow: () => void;
}

const SettingsWindow: React.FC<IProps> = ({
  handleCloseWindow,
  handleContactPageDashboard,
  handleAppointmentsWindow,
  handleHelpWindow,
  handleOpenFormDashboard,
  handleCreateComercialCard,
  handleCreateTask,
  handleCreateCompanyContactWindow,
}) => {
  const history = useHistory();
  const { signOut, employee } = useEmployeeAuth();

  const handleSignout = useCallback(() => {
    localStorage.clear();
    signOut();
    history.push('/');
  }, [signOut, history]);

  useEffect(() => {
    // Quando finalizar o processo para adicionar task, remover esse useEffect
    if (!employee) {
      console.log(handleCreateTask);
    }
  }, [employee, handleCreateTask]);

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
        <button type="button" onClick={() => handleCreateComercialCard()}>
          Novo Negócio
        </button>
        {/* <button type="button" onClick={() => handleCreateTask()}>
          Nova Tarefa
        </button> */}
        {/*                 // Para utilizar o createtask fora do card, tem que selecionar a
        // checkList à qual a task será associada
        // Estou pensando em criar uma check list dp colaborador
        // Então antes de criar a task, o colaborador terá de selecionar entre
        // a sua check list ou a de algum card que ele tenha acesso
 */}
        <button type="button" onClick={handleCreateCompanyContactWindow}>
          Criar Contato
        </button>
        <button type="button" onClick={() => handleContactPageDashboard()}>
          e-Links
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
