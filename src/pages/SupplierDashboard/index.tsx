import React from 'react';

import { Container, Content } from './styles';

import Header from '../../components/Header';
import KanbanDashboard from '../../components/KabanDashboard';
import MainDashboard from '../../components/MainDashboard';
import ComercialBottomSection from '../../components/ComercialBottomSection';
import CardPage from '../../components/CardPage';
import ContactPageDashboard from '../../components/ContactPageComponents/ContactPageDashboard';
import FormDashboard from '../../components/FormComponents/FormDashboard';
import HomeDashboard from '../../components/HomeComponents/HomeDashBoard';
import CompanyContactDashboard from '../../components/CompanyContactComponents/CompanyContactDashboard';
import CustomerServiceOrderDashboard from '../../components/CustomerServiceOrderDashboard';
import { useHomeController } from '../../hooks/homeController';

const SupplierDashboard: React.FC = () => {
  const { selectedPage } = useHomeController();

  return (
    <Container>
      {/* <MenuButton handleSetCurrentFunnel={handleSetCurrentFunnel} /> */}
      <Header />
      <Content>
        {selectedPage === 'Tasks' && <MainDashboard />}
        {selectedPage === 'E-Links' && <ContactPageDashboard />}
        {selectedPage === 'Forms' && <FormDashboard />}
        {selectedPage === 'Comercial' && (
          <>
            <KanbanDashboard />
            <ComercialBottomSection />
          </>
        )}
        {selectedPage === 'Card' && <CardPage />}
        {selectedPage === 'Contacts' && <CompanyContactDashboard />}

        {selectedPage === 'Home' && <HomeDashboard />}
        {selectedPage === 'ComercialOrders' && (
          <CustomerServiceOrderDashboard />
        )}
      </Content>
    </Container>
  );
};

export default SupplierDashboard;
