import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  Content,
  Modules,
  ModuleTitle,
  MiddlePage,
  BottomPage,
} from './styles';

import SupplierPageHeader from '../../components/SupplierPageHeader';
import { useAuth } from '../../hooks/auth';
import KanbanDashboard from '../../components/KabanDashboard';

const SupplierDashboard: React.FC = () => {
  const { modules } = useAuth();

  const [dashboard, setDashboard] = useState(true);
  const [modulesMenu, setModulesMenu] = useState(true);
  const [comercialSection, setComercialSection] = useState(false);
  const [operationsSection, setOperationsSection] = useState(false);
  const [projectSection, setProjectSection] = useState(false);
  const [financialSection, setFinancialSection] = useState(false);
  const [comercialModule, setComercialModule] = useState(false);
  const [operationsModule, setOperationsModule] = useState(false);
  const [projectsModule, setProjectsModule] = useState(false);
  const [financialModule, setFinancialModule] = useState(false);
  const [title, setTitle] = useState('Dashboard');

  useEffect(() => {
    modules.map(thisModule => {
      thisModule.management_module === 'Comercial' && setComercialModule(true);
      thisModule.management_module === 'Operations' &&
        setOperationsModule(true);
      thisModule.management_module === 'Projects' && setProjectsModule(true);
      thisModule.management_module === 'Financial' && setFinancialModule(true);
      return thisModule;
    });
  }, [modules]);

  const closeAllWindows = useCallback(() => {
    setDashboard(false);
    setComercialSection(false);
    setOperationsSection(false);
    setProjectSection(false);
    setFinancialSection(false);
  }, []);
  const handleChangeModule = useCallback(
    (props: string) => {
      closeAllWindows();
      setTitle(props);
      if (props === 'Dashboard') {
        setDashboard(true);
      }
      if (props === 'Comercial') {
        setComercialSection(true);
      }
      if (props === 'Operações') {
        setOperationsSection(true);
      }
      if (props === 'Projetos') {
        setProjectSection(true);
      }
      if (props === 'Financeiro') {
        setFinancialSection(true);
      }
    },
    [closeAllWindows],
  );

  return (
    <Container>
      <SupplierPageHeader
        handleModulesMenu={() => setModulesMenu(!modulesMenu)}
        module={title}
        modulesMenu={modulesMenu}
      />
      <Content>
        {!!modulesMenu && (
          <Modules>
            <button
              type="button"
              onClick={() => handleChangeModule('Dashboard')}
            >
              <ModuleTitle isActive={title === 'Dashboard'}>
                <strong>Dashboard</strong>
              </ModuleTitle>
            </button>
            {!!comercialModule && (
              <button
                type="button"
                onClick={() => handleChangeModule('Comercial')}
              >
                <ModuleTitle isActive={title === 'Comercial'}>
                  <strong>Comercial</strong>
                </ModuleTitle>
              </button>
            )}
            {!!operationsModule && (
              <button
                type="button"
                onClick={() => handleChangeModule('Operações')}
              >
                <ModuleTitle isActive={title === 'Operações'}>
                  <strong>Operações</strong>
                </ModuleTitle>
              </button>
            )}
            {!!projectsModule && (
              <button
                type="button"
                onClick={() => handleChangeModule('Projetos')}
              >
                <ModuleTitle isActive={title === 'Projetos'}>
                  <strong>Projetos</strong>
                </ModuleTitle>
              </button>
            )}
            {!!financialModule && (
              <button
                type="button"
                onClick={() => handleChangeModule('Financeiro')}
              >
                <ModuleTitle isActive={title === 'Financeiro'}>
                  <strong>Financeiro</strong>
                </ModuleTitle>
              </button>
            )}
          </Modules>
        )}

        {/* <UpperPage>
          <div>
            <h3>KPI_1</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_2</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_3</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_4</h3>
            <span>x</span>
          </div>
          <div>
            <h3>KPI_5</h3>
            <span>x</span>
          </div>
        </UpperPage> */}
        <MiddlePage>
          {!!dashboard && (
            <div>
              <h1>Dashboard</h1>
            </div>
          )}
          {!!comercialSection && (
            <KanbanDashboard funnel="Comercial">
              <h1>Comercial KanbanDashboard</h1>
            </KanbanDashboard>
          )}
          {!!operationsSection && (
            <KanbanDashboard funnel="Operations">
              <h1>Operations KanbanDashboard</h1>
            </KanbanDashboard>
          )}
          {!!projectSection && (
            <KanbanDashboard funnel="Projects">
              <h1>Projects KanbanDashboard</h1>
            </KanbanDashboard>
          )}
          {!!financialSection && (
            <KanbanDashboard funnel="Financial">
              <h1>Finance KanbanDashboard</h1>
            </KanbanDashboard>
          )}
        </MiddlePage>

        <BottomPage>
          <button type="button">
            <ModuleTitle isActive={title === 'Tarefas'}>
              <strong>Tarefas</strong>
            </ModuleTitle>
          </button>
          <button type="button">
            <ModuleTitle isActive={title === 'Performance'}>
              <strong>Performance</strong>
            </ModuleTitle>
          </button>
          <button type="button" onClick={() => handleChangeModule('Pessoal')}>
            <ModuleTitle isActive={title === 'Pessoal'}>
              <strong>Mensagens</strong>
            </ModuleTitle>
          </button>
        </BottomPage>
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
