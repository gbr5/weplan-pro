import React, { useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { FiChevronsRight, FiEdit3, FiEye } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import {
  Container,
  SideMenu,
  WorkStation,
  Section,
  EmployeesList,
  EmployeeScrollList,
  CompanyInfoList,
  FirstRow,
  SecondRow,
} from './styles';
import AddEmployeeWindow from '../AddEmployeeWindow';
import ICompanyInfoDTO from '../../dtos/ICompanyInfoDTO';
import supplierLogo from '../../assets/elefante.png';
import WindowContainer from '../WindowContainer';
import IUserDTO from '../../dtos/IUserDTO';

interface IWPProduct {
  id: string;
  name: string;
  target_audience: string;
  price: string;
}

interface IOrderProduct {
  id: string;
  weplanProduct: IWPProduct;
  quantity: number;
  price: string;
}

interface IWPContractOrder {
  id: string;
  created_at: Date;
  customer: IUserDTO;
  products: IOrderProduct[];
}

interface IContractWPModulesDTO {
  id: string;
  name: string;
}

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  const [companyWPContracts, setCompanyWPContracts] = useState<
    IWPContractOrder[]
  >([]);

  const [employees, setEmployees] = useState<IEmployeeDTO[]>([]);
  // const [employee, setEmployee] = useState<IEmployeeDTO>({} as IEmployeeDTO);
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfoDTO>(
    {} as ICompanyInfoDTO,
  );
  const [initialDashboard, setInitialDashboard] = useState(true);
  const [employeesDashboard, setEmployeesDashboard] = useState(false);
  const [financeDashboard, setFinanceDashboard] = useState(false);
  const [advancedOptionsDashboard, setAdvancedOptionsDashboard] = useState(
    false,
  );
  const [
    chooseWPproductMessageWindow,
    setChooseWPproductMessageWindow,
  ] = useState(false);
  const [addEmployeeMessageWindow, setAddEmployeeMessageWindow] = useState(
    false,
  );
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);
  const [helpDashboard, setHelpDashboard] = useState(false);
  const [documentationDashboard, setDocumentationDashboard] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState(
    'Informações da Empresa',
  );
  const [wpModules, setWPModules] = useState<IContractWPModulesDTO[]>();

  const closeAllWindow = useCallback(() => {
    setInitialDashboard(false);
    setEmployeesDashboard(false);
    setFinanceDashboard(false);
    setAdvancedOptionsDashboard(false);
    setAddEmployeeWindow(false);
    setAddEmployeeMessageWindow(false);
    setChooseWPproductMessageWindow(false);
    setHelpDashboard(false);
    setDocumentationDashboard(false);
  }, []);
  const handleInitialWindow = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Informações da Empresa');
    setInitialDashboard(true);
  }, [closeAllWindow]);
  const handleEmployeesWindow = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Colaboradores');
    setEmployeesDashboard(true);
  }, [closeAllWindow]);
  const handleFinanceWindow = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Financeiro');
    setFinanceDashboard(true);
  }, [closeAllWindow]);
  const handleAdvancedOptionsWindow = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Opções avançadas');
    setAdvancedOptionsDashboard(true);
  }, [closeAllWindow]);
  const handleHelpDashboard = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Ajuda');
    setHelpDashboard(true);
  }, [closeAllWindow]);
  const handleDocumentationDashboard = useCallback(() => {
    closeAllWindow();
    setDashboardTitle('Documentação');
    setDocumentationDashboard(true);
  }, [closeAllWindow]);

  const getCompanyWPContractOrders = useCallback(() => {
    try {
      api
        .get<IWPContractOrder[]>(`/wp/contract-orders/${user.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setChooseWPproductMessageWindow(true);
          }

          setCompanyWPContracts(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);
  useEffect(() => {
    getCompanyWPContractOrders();
  }, [getCompanyWPContractOrders]);

  const getCompanyEmployees = useCallback(() => {
    try {
      api
        .get<IEmployeeDTO[]>(`supplier-employees/${user.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setAddEmployeeMessageWindow(true);
          }

          setEmployees(
            response.data.map(tEmployee => {
              return {
                id: tEmployee.id,
                employee: tEmployee.employee,
                position: tEmployee.position,
                modules: tEmployee.modules,
                confirmation: tEmployee.confirmation,
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

  const getWPManagementModules = useCallback(() => {
    try {
      api
        .get<IContractWPModulesDTO[]>('wp-management-modules')
        .then(response => {
          setWPModules(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getWPManagementModules();
  }, [getWPManagementModules]);

  const getCompanyInfo = useCallback(() => {
    try {
      api.get<ICompanyInfoDTO>('company-info').then(response => {
        setCompanyInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getCompanyInfo();
  }, [getCompanyInfo]);

  return (
    <>
      {!!addEmployeeWindow && !!wpModules && (
        <AddEmployeeWindow
          wpModules={wpModules}
          wpCompanyContract={companyWPContracts[companyWPContracts.length - 1]}
          getEmployees={getCompanyEmployees}
          handleCloseWindow={() => setAddEmployeeWindow(false)}
          onHandleCloseWindow={handleEmployeesWindow}
        />
      )}
      {!!chooseWPproductMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setChooseWPproductMessageWindow(false)}
          containerStyle={{
            zIndex: 15,
            top: '30%',
            left: '25%',
          }}
        >
          <h2>Olá {user.name}, tudo bem?</h2>
          <p>Vi que você ainda não possui nenhum produto contratado.</p>
          <p>Qual a sua necessidade no momento?</p>
          <p>Posso pedir para um de nossos consultores te ligar?</p>
          <h4>
            Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31
            99932 4093
          </h4>
        </WindowContainer>
      )}
      {!!addEmployeeMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setAddEmployeeMessageWindow(false)}
          containerStyle={{
            top: '30%',
            left: '25%',
          }}
        >
          <p>
            Vi também que você ainda não possui nenhum colaborador cadastrado.
          </p>
          <p>No menu lateral você encontrará a seção se Colaboradores.</p>
          <h4>
            Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31
            99932 4093
          </h4>
        </WindowContainer>
      )}
      <Container>
        <SideMenu>
          <button type="button" onClick={handleInitialWindow}>
            Informações da empresa
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
          <button type="button" onClick={handleHelpDashboard}>
            Ajuda
          </button>
          <button type="button" onClick={handleDocumentationDashboard}>
            Documentação
          </button>
        </SideMenu>
        <WorkStation>
          <div>
            {!!initialDashboard && (
              <Section>
                <h2>{dashboardTitle}</h2>
                <CompanyInfoList>
                  <FirstRow>
                    <div>
                      <table>
                        <tr>
                          <td>Razão Social</td>
                          <td>{companyInfo.name}</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>CNPJ</td>
                          <td>{companyInfo.company_id}</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nome de Usuário</td>
                          <td>{user.name}</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>e-mail</td>
                          <td>{user.email}</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Telefone</td>
                          <td>354558</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <table>
                      <button type="button">
                        <h2>Editar Logo</h2>
                        <img src={supplierLogo} alt="WePlanPRO" />
                      </button>
                      <button type="button">
                        <h2>Editar Avatar</h2>
                        <img src={supplierLogo} alt="WePlanPRO" />
                      </button>
                    </table>
                  </FirstRow>
                  <SecondRow>
                    <div>
                      <h2>Usuários Master</h2>
                      <table>
                        <tr>
                          <td>Nome de Usuário</td>
                          <td>Fulano</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nome de Usuário</td>
                          <td>Beltrano</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nome de Usuário</td>
                          <td>Ciclano</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div>
                      <h2>Módulos Contratados</h2>
                      <table>
                        <tr>
                          <td>CRM</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Projetos</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Financeiro</td>
                          <td>
                            <button type="button">
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </SecondRow>
                </CompanyInfoList>
              </Section>
            )}
            {!!employeesDashboard && (
              <Section>
                <h2>{dashboardTitle}</h2>
                <span>
                  <button
                    type="button"
                    onClick={() => setAddEmployeeWindow(true)}
                  >
                    <MdPersonAdd size={30} />
                  </button>
                </span>
                <EmployeesList>
                  <table>
                    <tr>
                      <th>N°</th>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>
                        <FiEye size={30} />
                      </th>
                    </tr>

                    {employees.map(thiEmployee => {
                      const employeeIndex =
                        employees.findIndex(
                          index => index.id === thiEmployee.id,
                        ) + 1;
                      return (
                        <>
                          <EmployeeScrollList key={employeeIndex}>
                            <td>{employeeIndex}</td>
                            <td>{thiEmployee.employee.name}</td>
                            <td>{thiEmployee.position}</td>
                            <td>
                              <button type="button">
                                <FiChevronsRight size={24} />
                              </button>
                            </td>
                          </EmployeeScrollList>
                        </>
                      );
                    })}
                  </table>
                </EmployeesList>
              </Section>
            )}
            {!!financeDashboard && (
              <Section>
                <h1>Financeiro</h1>
              </Section>
            )}
            {!!advancedOptionsDashboard && (
              <Section>
                <h1>OpçõesAvançadas</h1>
              </Section>
            )}
            {!!helpDashboard && (
              <Section>
                <h1>Ajuda</h1>
              </Section>
            )}
            {!!documentationDashboard && (
              <Section>
                <h1>Documentação</h1>
              </Section>
            )}
          </div>
        </WorkStation>
      </Container>
    </>
  );
};

export default CompanyDashboard;
