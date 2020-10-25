import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import MainUserDashboard from '../../components/MainUserDashboard';
import CompanyDashboard from '../../components/CompanyDashboard';
import { useAuth } from '../../hooks/auth';

const SupplierDashboard: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState(true);

  useEffect(() => {
    setCompany(user.isCompany);
  }, [user]);

  return (
    <Container>
      {company ? <CompanyDashboard /> : <MainUserDashboard />}
    </Container>
  );
};

export default SupplierDashboard;
