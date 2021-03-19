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
import ContactPageDashboard from '../../components/ContactPageDashboard';
import FormDashboard from '../../components/FormComponents/FormDashboard';

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
  const [contactPageDashboard, setContactPageDashboard] = useState(false);
  const [formPageDashboard, setFormPageDashboard] = useState(false);
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
    setContactPageDashboard(false);
    setFormPageDashboard(false);
  }, []);

  const handleContactPageDashboard = useCallback(() => {
    closeAllWindows();
    setContactPageDashboard(true);
  }, [closeAllWindows]);

  const handleFormDashboard = useCallback(() => {
    closeAllWindows();
    setFormPageDashboard(true);
  }, [closeAllWindows]);

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
              selectedCard={selectedCard}
              handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
              handleSelectCard={(e: IStageCardDTO) => setSelectedCard(e)}
              funnel="Comercial"
            />
            <ComercialBottomSection selectedCard={selectedCard} />
          </>
        )}
        {!!productionSection && (
          <KanbanDashboard
            selectedCard={selectedCard}
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            handleSelectCard={(e: IStageCardDTO) => setSelectedCard(e)}
            funnel="Production"
          />
        )}
        {!!projectSection && (
          <KanbanDashboard
            selectedCard={selectedCard}
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            handleSelectCard={(e: IStageCardDTO) => setSelectedCard(e)}
            funnel="Projects"
          />
        )}
        {!!financialSection && (
          <KanbanDashboard
            selectedCard={selectedCard}
            handleCardPage={(e: IStageCardDTO) => handleCardPage(e)}
            handleSelectCard={(e: IStageCardDTO) => setSelectedCard(e)}
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
