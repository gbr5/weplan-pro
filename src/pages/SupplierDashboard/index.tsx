import React, { useCallback, useState } from 'react';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import KanbanDashboard from '../../components/KabanDashboard';
import MenuButton from '../../components/MenuButton';
import MainDashboard from '../../components/MainDashboard';
import ComercialBottomSection from '../../components/ComercialBottomSection';
import CardPage from '../../components/CardPage';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import ModuleMenu from '../../components/ModuleMenu';
import ContactPageDashboard from '../../components/ContactPageComponents/ContactPageDashboard';
import FormDashboard from '../../components/FormComponents/FormDashboard';
import { useForm } from '../../hooks/form';
import { useContactPage } from '../../hooks/contactPages';
import { useStageCard } from '../../hooks/stageCard';

const SupplierDashboard: React.FC = () => {
  const { getForms } = useForm();
  const { getContactPages } = useContactPage();
  const { selectCard } = useStageCard();
  const [modulesMenu, setModulesMenu] = useState(true);
  const [dashboard, setDashboard] = useState(true);
  const [comercialSection, setComercialSection] = useState(false);
  const [productionSection, setProductionSection] = useState(false);
  const [projectSection, setProjectSection] = useState(false);
  const [financialSection, setFinancialSection] = useState(false);
  const [title, setTitle] = useState('Dashboard');
  const [selectedFunnel, setSelectedFunnel] = useState('');
  const [cardPage, setCardPage] = useState(false);
  const [contactPageDashboard, setContactPageDashboard] = useState(false);
  const [formPageDashboard, setFormPageDashboard] = useState(false);

  const closeAllWindows = useCallback(() => {
    setDashboard(false);
    setComercialSection(false);
    setProductionSection(false);
    setProjectSection(false);
    setFinancialSection(false);
    setCardPage(false);
    setContactPageDashboard(false);
    setFormPageDashboard(false);
  }, []);

  const handleContactPageDashboard = useCallback(() => {
    closeAllWindows();
    getContactPages();
    setContactPageDashboard(true);
  }, [closeAllWindows, getContactPages]);

  const handleFormDashboard = useCallback(() => {
    closeAllWindows();
    setFormPageDashboard(true);
    getForms();
  }, [closeAllWindows, getForms]);

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
      selectCard(card);
      title === 'Comercial' && setSelectedFunnel('Comercial');
      title === 'Produção' && setSelectedFunnel('Production');
      title === 'Projetos' && setSelectedFunnel('Projects');
      title === 'Financeiro' && setSelectedFunnel('Financial');
      closeAllWindows();
      setCardPage(true);
      return card;
    },
    [closeAllWindows, selectCard, title],
  );

  const handleSetCurrentFunnel = useCallback(() => {
    closeAllWindows();
    setTitle('Dashboard');
    setDashboard(true);
  }, [closeAllWindows]);

  return (
    <Container>
      <MenuButton handleSetCurrentFunnel={handleSetCurrentFunnel} />
      <Header
        handleModulesMenu={() => setModulesMenu(!modulesMenu)}
        module={title}
        modulesMenu={modulesMenu}
        handleFormDashboard={handleFormDashboard}
        handleContactPageDashboard={handleContactPageDashboard}
      />
      <Content>
        {!!modulesMenu && (
          <ModuleMenu handleChangeModule={handleChangeModule} title={title} />
        )}
        {!!dashboard && <MainDashboard />}
        {contactPageDashboard && <ContactPageDashboard />}
        {formPageDashboard && <FormDashboard />}
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
          />
        )}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
