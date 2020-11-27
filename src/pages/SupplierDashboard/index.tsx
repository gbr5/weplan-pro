import React, { useCallback, useState } from 'react';

import { Container, Content } from './styles';

import SupplierPageHeader from '../../components/SupplierPageHeader';
import KanbanDashboard from '../../components/KabanDashboard';
import MenuButton from '../../components/MenuButton';
import MainDashboard from '../../components/MainDashboard';
import ComercialBottomSection from '../../components/ComercialBottomSection';
import CardPage from '../../components/CardPage';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import ModuleMenu from '../../components/ModuleMenu';

const SupplierDashboard: React.FC = () => {
  const [modulesMenu, setModulesMenu] = useState(true);
  const [dashboard, setDashboard] = useState(true);
  const [comercialSection, setComercialSection] = useState(false);
  const [productionSection, setProductionSection] = useState(false);
  const [projectSection, setProjectSection] = useState(false);
  const [financialSection, setFinancialSection] = useState(false);
  const [title, setTitle] = useState('Dashboard');
  const [selectedFunnel, setSelectedFunnel] = useState('');
  const [cardPage, setCardPage] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IStageCardDTO>(
    {} as IStageCardDTO,
  );

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
        setTitle(props);
      }
      if (props === 'Projetos') {
        setProjectSection(true);
        setTitle(props);
      }
      if (props === 'Financeiro') {
        setFinancialSection(true);
        setTitle(props);
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
    setTitle('Dashboard');
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
          <ModuleMenu handleChangeModule={handleChangeModule} title={title} />
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
