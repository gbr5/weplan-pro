import React, { MouseEventHandler } from 'react';

import { SideMenu } from './styles';

interface IModuleAccessDTO {
  id: string;
  name: string;
}

interface IMasterUserDTO {
  id: string;
  company: {
    id: string;
    name: string;
    avatar: string;
  };
  isConfirmed: boolean;
}

interface IPropsDTO {
  // 1°
  handleMainDashboard: MouseEventHandler;
  // 2°
  handleUserEmployeeManagementWindow: MouseEventHandler;
  // 3°
  // handleCompanyInfoWindow: Function;
  // 4°
  // handleCompanyEmployeeInfoWindow: Function;
  // 5°
  // handleAppointmentsWindow: Function;
  // 6°
  // handleTasksWindow: Function;
}

const UserEmployeeSideMenu: React.FC<IPropsDTO> = ({
  handleMainDashboard,
  handleUserEmployeeManagementWindow,
}: IPropsDTO) => {
  return (
    <SideMenu>
      <button type="button" onClick={handleMainDashboard}>
        Dashboard Inicial
      </button>
      <button type="button">Informações da empresa</button>
      <button type="button">Eu Colaborador</button>
      <button type="button" onClick={handleUserEmployeeManagementWindow}>
        Gerenciar meus acessos
      </button>
      <button type="button">Agendamentos</button>
      <button type="button">Tarefas</button>
      <button type="button">Opções avançadas</button>
      <button type="button">Ajuda</button>
      <button type="button">Documentação</button>
    </SideMenu>
  );
};

export default UserEmployeeSideMenu;
