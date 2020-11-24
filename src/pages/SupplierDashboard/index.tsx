import React, { useCallback, useEffect, useState } from 'react';

import { Container, Content, Modules, ModuleTitle } from './styles';

import SupplierPageHeader from '../../components/SupplierPageHeader';
import { useAuth } from '../../hooks/auth';
import KanbanDashboard from '../../components/KabanDashboard';
import MenuButton from '../../components/MenuButton';
import MainDashboard from '../../components/MainDashboard';
import ComercialBottomSection from '../../components/ComercialBottomSection';
import CardPage from '../../components/CardPage';
import IStageCardDTO from '../../dtos/IStageCardDTO';

const SupplierDashboard: React.FC = () => {
  const { modules, company, companyInfo, funnels } = useAuth();

  const [modulesMenu, setModulesMenu] = useState(true);
  const [dashboard, setDashboard] = useState(true);
  const [comercialSection, setComercialSection] = useState(false);
  const [productionSection, setProductionSection] = useState(false);
  const [projectSection, setProjectSection] = useState(false);
  const [financialSection, setFinancialSection] = useState(false);
  const [comercialModule, setComercialModule] = useState(false);
  const [productionModule, setProductionModule] = useState(false);
  const [projectsModule, setProjectsModule] = useState(false);
  const [financialModule, setFinancialModule] = useState(false);
  const [title, setTitle] = useState('Dashboard');
  const [selectedFunnel, setSelectedFunnel] = useState('');
  const [cardPage, setCardPage] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IStageCardDTO>(
    {} as IStageCardDTO,
  );

  useEffect(() => {
    modules.map(thisModule => {
      const thisCompanyFunnel = funnels.find(
        xFunnel => xFunnel.name === thisModule.management_module,
      );
      if (thisCompanyFunnel) {
        thisModule.management_module === 'Comercial' &&
          setComercialModule(true);
        thisModule.management_module === 'Production' &&
          setProductionModule(true);
        thisModule.management_module === 'Projects' && setProjectsModule(true);
        thisModule.management_module === 'Financial' &&
          setFinancialModule(true);
      }
      return thisModule;
    });
  }, [modules, funnels]);

  const closeAllWindows = useCallback(() => {
    setDashboard(false);
    setComercialSection(false);
    setProductionSection(false);
    setProjectSection(false);
    setFinancialSection(false);
    setCardPage(false);
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
      if (props === 'Produção') {
        setProductionSection(true);
        setTitle('Production');
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

  const handleCardPage = useCallback(
    (card: IStageCardDTO) => {
      setSelectedCard(card);
      title === 'Comercial' && setSelectedFunnel('Comercial');
      title === 'Produção' && setSelectedFunnel('Production');
      title === 'Projetos' && setSelectedFunnel('Projects');
      title === 'Financeiro' && setSelectedFunnel('Financial');
      closeAllWindows();
      setCardPage(true);
      return card;
    },
    [closeAllWindows, title],
  );

  const handleSetCurrentFunnel = useCallback(() => {
    closeAllWindows();
    setDashboard(true);
  }, [closeAllWindows]);

  return (
    <Container>
      <MenuButton handleSetCurrentFunnel={handleSetCurrentFunnel} />
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
            {!!productionModule && (
              <button
                type="button"
                onClick={() => handleChangeModule('Produção')}
              >
                <ModuleTitle isActive={title === 'Produção'}>
                  <strong>Produção</strong>
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
            <KanbanDashboard
              handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
              funnel="Comercial"
            />
            <ComercialBottomSection />
          </>
        )}
        {!!productionSection && (
          <KanbanDashboard
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            funnel="Production"
          />
        )}
        {!!projectSection && (
          <KanbanDashboard
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            funnel="Projects"
          />
        )}
        {!!financialSection && (
          <KanbanDashboard
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            funnel="Financial"
          />
        )}
        {!!cardPage && (
          <CardPage
            handleUpdateFunnel={(e: string) => handleChangeModule(e)}
            selectedFunnel={selectedFunnel}
            card={selectedCard}
          />
        )}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
