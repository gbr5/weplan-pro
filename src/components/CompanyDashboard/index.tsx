import React, { useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import { Container, SideMenu, WorkStation, EmployeeSection } from './styles';
import AddEmployeeWindow from '../AddEmployeeWindow';

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  const [employees, setEmployees] = useState<IEmployeeDTO[]>([]);
  // const [employee, setEmployee] = useState<IEmployeeDTO>({} as IEmployeeDTO);
  const [initialDashboard, setInitialDashboard] = useState(true);
  const [employeesDashboard, setEmployeesDashboard] = useState(false);
  const [financeDashboard, setFinanceDashboard] = useState(false);
  const [advancedOptionsDashboard, setAdvancedOptionsDashboard] = useState(
    false,
  );
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);

  const closeAllWindow = useCallback(() => {
    setInitialDashboard(false);
    setEmployeesDashboard(false);
    setFinanceDashboard(false);
    setAdvancedOptionsDashboard(false);
    setAddEmployeeWindow(false);
  }, []);

  const handleInitialWindow = useCallback(() => {
    closeAllWindow();
    setInitialDashboard(true);
  }, [closeAllWindow]);
  const handleEmployeesWindow = useCallback(() => {
    closeAllWindow();
    setEmployeesDashboard(true);
  }, [closeAllWindow]);
  const handleFinanceWindow = useCallback(() => {
    closeAllWindow();
    setFinanceDashboard(true);
  }, [closeAllWindow]);
  const handleAdvancedOptionsWindow = useCallback(() => {
    closeAllWindow();
    setAdvancedOptionsDashboard(true);
  }, [closeAllWindow]);

  const getCompanyEmployees = useCallback(() => {
    try {
      api
        .get<IEmployeeDTO[]>(`supplier-employees/${user.id}`)
        .then(response => {
          console.log(response.data);
          setEmployees(
            response.data.map(tEmployee => {
              return {
                id: tEmployee.id,
                employee: tEmployee.employee,
              };
            }),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    getCompanyEmployees();
  }, [getCompanyEmployees]);

  return (
    <>
      {!!addEmployeeWindow && (
        <AddEmployeeWindow
          getEmployees={getCompanyEmployees}
          handleCloseWindow={() => setAddEmployeeWindow}
          onHandleCloseWindow={handleInitialWindow}
        />
      )}
      <Container>
        <SideMenu>
          <button type="button" onClick={handleInitialWindow}>
            Tela Inicial
          </button>
          <button type="button" onClick={handleEmployeesWindow}>
            Colaboradores
          </button>
          <button type="button" onClick={handleFinanceWindow}>
            Financeiro
          </button>
          <button type="button" onClick={handleAdvancedOptionsWindow}>
            Opções avançadas
          </button>
        </SideMenu>
        <WorkStation>
          {!!initialDashboard && <h1>Inicial</h1>}
          {!!employeesDashboard &&
            employees.map(thiEmployee => (
              <EmployeeSection>
                <span>
                  <button
                    type="button"
                    onClick={() => setAddEmployeeWindow(true)}
                  >
                    <MdPersonAdd size={30} />
                  </button>
                </span>
                <div>
                  <h1>{thiEmployee.employee.name}</h1>
                </div>
              </EmployeeSection>
            ))}
          {!!financeDashboard && <h1>Financeiro</h1>}
          {!!advancedOptionsDashboard && <h1>Opções Avançadas</h1>}
        </WorkStation>
      </Container>
    </>
  );
};

export default CompanyDashboard;
