import React, { MouseEventHandler } from 'react';

import { BottomPage, ModuleTitle } from './styles';

interface IPropsDTO {
  title: string;
  handleTasksDashboard?: MouseEventHandler;
  handlePerformanceDashboard?: MouseEventHandler;
  handleHRDashboard?: MouseEventHandler;
  handleAccountantDashboard?: MouseEventHandler;
  handleMarketingDashboard?: MouseEventHandler;
}

const BottomPageMenu: React.FC<IPropsDTO> = ({
  title,
  handleTasksDashboard,
  handlePerformanceDashboard,
  handleHRDashboard,
  handleAccountantDashboard,
  handleMarketingDashboard,
}: IPropsDTO) => {
  return (
    <BottomPage>
      <button type="button" onClick={handleTasksDashboard}>
        <ModuleTitle isActive={title === 'Tarefas'}>
          <strong>Tarefas</strong>
        </ModuleTitle>
      </button>
      <button type="button" onClick={handlePerformanceDashboard}>
        <ModuleTitle isActive={title === 'Performance'}>
          <strong>Performance</strong>
        </ModuleTitle>
      </button>
      <button type="button" onClick={handleHRDashboard}>
        <ModuleTitle isActive={title === 'Pessoal'}>
          <strong>Pessoal</strong>
        </ModuleTitle>
      </button>
      <button type="button" onClick={handleMarketingDashboard}>
        <ModuleTitle isActive={title === 'Marketing'}>
          <strong>Marketing</strong>
        </ModuleTitle>
      </button>
      <button type="button" onClick={handleAccountantDashboard}>
        <ModuleTitle isActive={title === 'Contabilidade'}>
          <strong>Contabilidade</strong>
        </ModuleTitle>
      </button>
    </BottomPage>
  );
};

export default BottomPageMenu;
