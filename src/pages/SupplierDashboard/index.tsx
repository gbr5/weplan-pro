import React, { useCallback, useEffect, useState } from 'react';

import { Container, Content, Modules, ModuleTitle } from './styles';

import SupplierPageHeader from '../../components/SupplierPageHeader';
import { useAuth } from '../../hooks/auth';
import KanbanDashboard from '../../components/KabanDashboard';
import MenuButton from '../../components/MenuButton';
import MainDashboard from '../../components/MainDashboard';
import ComercialBottomSection from '../../components/ComercialBottomSection';

const SupplierDashboard: React.FC = () => {
  const { modules, company, companyInfo } = useAuth();

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
      if (props === 'Dashboard') {
        setDashboard(true);
        setTitle(props);
      }
      if (props === 'Comercial') {
        setComercialSection(true);
        setTitle(props);
      }
      if (props === 'Operações') {
        setOperationsSection(true);
        setTitle('Operations');
      }
      if (props === 'Projetos') {
        setProjectSection(true);
        setTitle('Projects');
      }
      if (props === 'Financeiro') {
        setFinancialSection(true);
        setTitle('Financial');
      }
    },
    [closeAllWindows],
  );

  return (
    <Container>
      <MenuButton />
      <SupplierPageHeader
        handleModulesMenu={() => setModulesMenu(!modulesMenu)}
        module={title}
        modulesMenu={modulesMenu}
      />
      <Content>
        {!!modulesMenu && (
          <Modules>
            <img src={companyInfo.logo_url} alt={company.name} />
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
        {!!dashboard && <MainDashboard />}
        {!!comercialSection && (
          <>
            <KanbanDashboard funnel="Comercial">
              <h1>Comercial KanbanDashboard</h1>
            </KanbanDashboard>
            <ComercialBottomSection />
          </>
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
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
