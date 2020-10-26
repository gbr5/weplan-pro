import React from 'react';

import { Container } from './styles';

import MainUserDashboard from '../../components/MainUserDashboard';
// import { useAuth } from '../../hooks/auth';
// import api from '../../services/api';
// import IEmployeeDTO from '../../dtos/IEmployeeDTO';
// import SelectCompanyWindow from '../../components/SelectCompanyWindow';

const SupplierDashboard: React.FC = () => {
  // const { user, signOut } = useAuth();
  // const [chooseCompanyWindow, setChooseCompanyWindow] = useState(false);
  // const [company, setCompany] = useState(false);
  // const [selectedCompany, setSelectedCompany] = useState<IEmployeeDTO>(
  //   {} as IEmployeeDTO,
  // );
  // const [userAsEmployees, setUserAsEmployees] = useState<IEmployeeDTO[]>([]);
  // const [unconfirmedUserAsEmployees, setUnconfirmedUserAsEmployees] = useState<
  //   IEmployeeDTO[]
  // >([]);
  // console.log(selectedCompany, unconfirmedUserAsEmployees);

  // const handleSelectCompany = useCallback((props: IEmployeeDTO) => {
  //   setSelectedCompany(props);
  //   setChooseCompanyWindow(false);
  // }, []);

  return (
    <>
      {/* {chooseCompanyWindow && (
        <SelectCompanyWindow
          employees={userAsEmployees}
          selectCompany={handleSelectCompany}
        />
      )} */}

      <Container>
        <MainUserDashboard />
      </Container>
    </>
  );
};

export default SupplierDashboard;
