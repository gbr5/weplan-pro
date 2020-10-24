import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { FiUpload, FiChevronsRight, FiEdit3, FiEye } from 'react-icons/fi';
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
  AvatarInput,
  ImageContainer,
} from './styles';
import AddEmployeeWindow from '../AddEmployeeWindow';
import WPContractOrderForm from '../WPContractOrderForm';
import ICompanyInfoDTO from '../../dtos/ICompanyInfoDTO';
import logo from '../../assets/elefante.png';
import WindowContainer from '../WindowContainer';
import IUserDTO from '../../dtos/IUserDTO';
import EditCompanyEmployeeForm from '../EditCompanyEmployeeForm';
import EditCompanyInfoInput from '../EditCompanyInfoInput';
import AddMasterUserWindow from '../AddMasterUserWindow';
import { useToast } from '../../hooks/toast';

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

interface IMasterUserDTO {
  id: string;
  masterUser: {
    id: string;
    name: string;
  };
  isConfirmed: boolean;
}

interface ICompanyInformationDTO {
  user_id: string;
  userName: string;
  email: string;
  companyName: string;
  company_info_id: string;
  companyID: string;
  phone: number;
}

const CompanyDashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [companyWPContracts, setCompanyWPContracts] = useState<
    IWPContractOrder[]
  >([]);

  const [companyInformation, setCompanyInformation] = useState<
    ICompanyInformationDTO
  >({} as ICompanyInformationDTO);
  const [masterUsers, setMasterUsers] = useState<IMasterUserDTO[]>([]);
  const [employees, setEmployees] = useState<IEmployeeDTO[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeDTO>(
    {} as IEmployeeDTO,
  );
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
  const [addMasterUserWindow, setAddMasterUserWindow] = useState(false);
  const [addEmployeeMessageWindow, setAddEmployeeMessageWindow] = useState(
    false,
  );
  const [emailSentMessageWindow, setEmailSentMessageWindow] = useState(false);
  const [contractOrderWindow, setContractOrderWindow] = useState(false);
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);
  const [editEmployeeWindow, setEditEmployeeWindow] = useState(false);
  const [helpDashboard, setHelpDashboard] = useState(false);
  const [documentationDashboard, setDocumentationDashboard] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState(
    'Informações da Empresa',
  );
  const [wpModules, setWPModules] = useState<IContractWPModulesDTO[]>();
  const [companyNameInput, setCompanyNameInput] = useState(false);
  const [companyIDInput, setCompanyIDInput] = useState(false);
  const [companyUserNameInput, setCompanyUserNameInput] = useState(false);
  const [companyEmailInput, setCompanyEmailInput] = useState(false);
  const [companyPhoneInput, setCompanyPhoneInput] = useState(false);
  const [companyPhone, setCompanyPhone] = useState(0);

  const handleCloseCompanyInfoInput = useCallback(() => {
    setCompanyNameInput(false);
    setCompanyIDInput(false);
    setCompanyUserNameInput(false);
    setCompanyEmailInput(false);
    setCompanyPhoneInput(false);
  }, []);

  const closeAllWindow = useCallback(() => {
    setEmailSentMessageWindow(false);
    setAddMasterUserWindow(false);
    setCompanyNameInput(false);
    setCompanyIDInput(false);
    setCompanyUserNameInput(false);
    setCompanyEmailInput(false);
    setCompanyPhoneInput(false);
    setEditEmployeeWindow(false);
    setContractOrderWindow(false);
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
  const handleContractOrderWindow = useCallback(() => {
    closeAllWindow();
    setContractOrderWindow(true);
    setFinanceDashboard(true);
  }, [closeAllWindow]);
  const handleEditEmployeeWindow = useCallback(
    (props: IEmployeeDTO) => {
      closeAllWindow();
      setEditEmployeeWindow(true);
      setSelectedEmployee(props);
    },
    [closeAllWindow],
  );
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

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
        });
        addToast({
          type: 'success',
          title: 'Avatar atualizado com sucesso.',
        });
      }
    },
    [addToast, updateUser],
  );

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

  const getCompanyMasterUsers = useCallback(() => {
    try {
      api
        .get<IMasterUserDTO[]>(`suppliers/master/users/${user.id}`)
        .then(response => {
          if (response.data.length <= 0) {
            setAddMasterUserWindow(true);
          }

          setMasterUsers(
            response.data
              .map(tMasterUser => {
                return {
                  id: tMasterUser.id,
                  masterUser: tMasterUser.masterUser,
                  isConfirmed: tMasterUser.isConfirmed,
                };
              })
              .filter(master => master.isConfirmed === true),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    getCompanyMasterUsers();
  }, [getCompanyMasterUsers]);

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

  const getCompanyContactInfo = useCallback(() => {
    try {
      api.get(`/profile/contact-info/${user.id}/phone`).then(response => {
        setCompanyPhone(response.data.contact_info);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

  useEffect(() => {
    getCompanyContactInfo();
  }, [getCompanyContactInfo]);

  const handleLogoChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('logo', e.target.files[0]);

        await api.patch('/company-info/logo', data);
        getCompanyInfo();

        addToast({
          type: 'success',
          title: 'Logo atualizado com sucesso.',
        });
      }
    },
    [addToast, getCompanyInfo],
  );

  useEffect(() => {
    setCompanyInformation({
      user_id: user.id,
      userName: user.name,
      email: user.email,
      companyName: companyInfo.name,
      company_info_id: companyInfo.id,
      companyID: companyInfo.company_id,
      phone: companyPhone,
    });
  }, [user, companyInfo, companyPhone]);
  let companyAvatar = logo;
  if (user.avatar_url !== undefined) {
    companyAvatar = user.avatar_url;
  }
  let companyLogo = logo;
  if (companyInfo.logo_url !== undefined) {
    companyLogo = companyInfo.logo_url;
  }

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
      {!!addMasterUserWindow && (
        <AddMasterUserWindow
          handleMessageWindow={() => setEmailSentMessageWindow(true)}
          getMasterUsers={getCompanyMasterUsers}
          handleCloseWindow={() => setAddMasterUserWindow(false)}
          onHandleCloseWindow={handleInitialWindow}
        />
      )}
      {!!editEmployeeWindow && !!wpModules && (
        <EditCompanyEmployeeForm
          employee={selectedEmployee}
          wpModules={wpModules}
          wpCompanyContract={companyWPContracts[companyWPContracts.length - 1]}
          getEmployees={getCompanyEmployees}
          handleCloseWindow={() => setEditEmployeeWindow(false)}
          onHandleCloseWindow={handleEmployeesWindow}
        />
      )}
      {!!contractOrderWindow && (
        <WPContractOrderForm
          getCompanyWPContracts={getCompanyWPContractOrders}
          handleCloseWindow={() => setContractOrderWindow(false)}
          onHandleCloseWindow={handleEmployeesWindow}
        />
      )}
      {!!emailSentMessageWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setEmailSentMessageWindow(false)}
          containerStyle={{
            zIndex: 150,
            top: '30%',
            left: '25%',
          }}
        >
          <h2>Sucesso</h2>
          <p>
            Foi enviado um e-mail para que o usuário confirme a sua solicitação.
          </p>
          <h4>
            Qualquer dúvida, pode enviar uma mensagem no meu whatsapp - 31 99932
            4093
          </h4>
          <div>
            <button type="button" onClick={handleContractOrderWindow}>
              Quero ser um vencedor!
            </button>
          </div>
        </WindowContainer>
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
          <div>
            <button type="button" onClick={handleContractOrderWindow}>
              Quero ser um vencedor!
            </button>
          </div>
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
          <p>No menu lateral você gerenciar os seus colaboradores.</p>
          <h4>
            Se precisar de mim, pode enviar uma mensagem no meu whatsapp - 31
            99932 4093
          </h4>
          <div>
            <button type="button" onClick={() => setAddEmployeeWindow(true)}>
              Adicionar colaborador!
            </button>
          </div>
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
                          {!companyNameInput ? (
                            <td>{companyInfo.name}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={companyInfo.name}
                              getCompanyInfo={getCompanyInfo}
                              handleCloseWindow={() =>
                                setCompanyNameInput(false)
                              }
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              inputName="companyName"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyNameInput(!companyNameInput)}
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>CNPJ</td>
                          {!companyIDInput ? (
                            <td>{companyInfo.company_id}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={companyInfo.company_id}
                              getCompanyInfo={getCompanyInfo}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              handleCloseWindow={() => setCompanyIDInput(false)}
                              inputName="companyID"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() => setCompanyIDInput(!companyIDInput)}
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Nome de Usuário</td>
                          {!companyUserNameInput ? (
                            <td>{user.name}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={user.name}
                              getCompanyInfo={getCompanyInfo}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              handleCloseWindow={() =>
                                setCompanyUserNameInput(false)
                              }
                              inputName="userName"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyUserNameInput(!companyUserNameInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>e-mail</td>
                          {!companyEmailInput ? (
                            <td>{user.email}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={user.email}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              getCompanyInfo={getCompanyInfo}
                              handleCloseWindow={() =>
                                setCompanyEmailInput(false)
                              }
                              inputName="email"
                              type="string"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyEmailInput(!companyEmailInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Telefone</td>
                          {!companyPhoneInput ? (
                            <td>{companyPhone}</td>
                          ) : (
                            <EditCompanyInfoInput
                              companyInformation={companyInformation}
                              defaultValue={String(companyPhone)}
                              onHandleCloseWindow={handleCloseCompanyInfoInput}
                              getCompanyInfo={getCompanyContactInfo}
                              handleCloseWindow={() =>
                                setCompanyPhoneInput(false)
                              }
                              inputName="phone"
                              type="number"
                            />
                          )}
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setCompanyPhoneInput(!companyPhoneInput)
                              }
                            >
                              <FiEdit3 size={18} />
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <ImageContainer>
                      <AvatarInput htmlFor="logo">
                        <h2>Editar Logo</h2>
                        <img src={companyLogo} alt="WePlanPRO" />
                        <div>
                          <FiUpload size={30} />
                          <input
                            type="file"
                            id="logo"
                            onChange={handleLogoChange}
                          />
                        </div>
                      </AvatarInput>
                      <AvatarInput htmlFor="avatar">
                        <h2>Editar Avatar</h2>
                        <img src={companyAvatar} alt="WePlanPRO" />
                        <div>
                          <FiUpload size={30} />
                          <input
                            type="file"
                            id="avatar"
                            onChange={handleAvatarChange}
                          />
                        </div>
                      </AvatarInput>
                    </ImageContainer>
                  </FirstRow>
                  <SecondRow>
                    <div>
                      <span>
                        <h2>Usuários Master</h2>
                        <button
                          type="button"
                          onClick={() => setAddMasterUserWindow(true)}
                        >
                          <MdPersonAdd size={30} />
                        </button>
                      </span>
                      <table>
                        {masterUsers.map(master => (
                          <tr key={master.id}>
                            <td>Nome de Usuário</td>
                            <td>{master.masterUser.name}</td>
                            <td>
                              <button type="button">
                                <FiEdit3 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
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
                              <button
                                type="button"
                                onClick={() =>
                                  handleEditEmployeeWindow(thiEmployee)
                                }
                              >
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
                <button type="button" onClick={handleContractOrderWindow}>
                  Contratar Módulo de Gestão
                </button>
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
