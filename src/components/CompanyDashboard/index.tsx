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
  EmployeeScrollList,
  CompanyInfoList,
  FirstRow,
  SecondRow,
  AvatarInput,
  ImageContainer,
  EmployeeSection,
  ConfirmedEmployeeSection,
  UnConfirmedEmployeeSection,
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
import SupplierPageHeader from '../SupplierPageHeader';

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

  // 1
  const [companyNameInput, setCompanyNameInput] = useState(false);
  // 2
  const [companyIDInput, setCompanyIDInput] = useState(false);
  // 3
  const [companyUserNameInput, setCompanyUserNameInput] = useState(false);
  // 4
  const [companyEmailInput, setCompanyEmailInput] = useState(false);
  // 5
  const [companyPhoneInput, setCompanyPhoneInput] = useState(false);

  const [dashboardTitle, setDashboardTitle] = useState(
    'Informações da Empresa',
  );
  const [companyPhone, setCompanyPhone] = useState(0);

  const [wpModules, setWPModules] = useState<IContractWPModulesDTO[]>();
  const [companyWPContracts, setCompanyWPContracts] = useState<
    IWPContractOrder[]
  >([]);

  const [companyInformation, setCompanyInformation] = useState<
    ICompanyInformationDTO
  >({} as ICompanyInformationDTO);
  const [companyHiredModules, setCompanyHiredModules] = useState<
    IContractWPModulesDTO[]
  >([]);
  const [marketPlace, setMarketPlace] = useState(false);
  const [masterUsers, setMasterUsers] = useState<IMasterUserDTO[]>([]);
  const [employees, setEmployees] = useState<IEmployeeDTO[]>([]);
  const [unConfirmedEmployees, setUnConfirmedEmployees] = useState<
    IEmployeeDTO[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeDTO>(
    {} as IEmployeeDTO,
  );
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfoDTO>(
    {} as ICompanyInfoDTO,
  );
  // 1
  const [companyInfoSection, setCompanyInfoSection] = useState(true);
  // 2
  const [employeesSection, setEmployeesSection] = useState(false);
  // 3
  const [financialSection, setFinancialSection] = useState(false);
  // 4
  const [advancedOptionsSection, setAdvancedOptionsSection] = useState(false);
  // 5
  const [helpSection, setHelpSection] = useState(false);
  // 6
  const [documentationSection, setDocumentationSection] = useState(false);
  // 7
  const [
    chooseWPproductMessageWindow,
    setChooseWPproductMessageWindow,
  ] = useState(false);
  // 8
  const [addEmployeeMessageWindow, setAddEmployeeMessageWindow] = useState(
    false,
  );
  // 9
  const [emailSentMessageWindow, setEmailSentMessageWindow] = useState(false);
  // 10
  const [contractOrderWindow, setContractOrderWindow] = useState(false);
  // 11
  const [addEmployeeWindow, setAddEmployeeWindow] = useState(false);
  // 12
  const [editEmployeeWindow, setEditEmployeeWindow] = useState(false);
  // 13
  const [addMasterUserWindow, setAddMasterUserWindow] = useState(false);
  // 14
  const handleCloseCompanyInfoInput = useCallback(() => {
    setCompanyNameInput(false);
    setCompanyIDInput(false);
    setCompanyUserNameInput(false);
    setCompanyEmailInput(false);
    setCompanyPhoneInput(false);
  }, []);

  const closeAllWindow = useCallback(() => {
    // 1 -1
    setCompanyInfoSection(false);
    // 2 -1
    setEmployeesSection(false);
    // 3 -1
    setFinancialSection(false);
    // 4 -1
    setAdvancedOptionsSection(false);
    // 5 -1
    setHelpSection(false);
    // 6 -1
    setDocumentationSection(false);
    // 7 -2
    setEmailSentMessageWindow(false);
    // 8 -2
    setChooseWPproductMessageWindow(false);
    // 9 -2
    setAddEmployeeMessageWindow(false);
    // 10 -3
    setEditEmployeeWindow(false);
    // 11 -3
    setContractOrderWindow(false);
    // 12 -3
    setAddEmployeeWindow(false);
    // 13 -3
    setAddMasterUserWindow(false);
    // 14 -4
    handleCloseCompanyInfoInput();
  }, [handleCloseCompanyInfoInput]);
  const handleContractOrderWindow = useCallback(() => {
    closeAllWindow();
    setContractOrderWindow(true);
    setFinancialSection(true);
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
    setCompanyInfoSection(true);
  }, [closeAllWindow]);
  const handleEmployeesWindow = useCallback(() => {
    closeAllWindow();
    setEmployeesSection(true);
  }, [closeAllWindow]);
  const handleFinanceWindow = useCallback(() => {
    closeAllWindow();
    setFinancialSection(true);
  }, [closeAllWindow]);
  const handleAdvancedOptionsWindow = useCallback(() => {
    closeAllWindow();
    setAdvancedOptionsSection(true);
  }, [closeAllWindow]);
  const handleHelpDashboard = useCallback(() => {
    closeAllWindow();
    setHelpSection(true);
  }, [closeAllWindow]);
  const handleDocumentationDashboard = useCallback(() => {
    closeAllWindow();
    setDocumentationSection(true);
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
          const sortModules: IContractWPModulesDTO[] = [];
          response.data.map(hModule => {
            hModule.products.map(mProduct => {
              const pName = mProduct.weplanProduct.name;
              if (
                pName === 'Comercial' ||
                pName === 'Operations' ||
                pName === 'Financial' ||
                pName === 'Projects'
              ) {
                const findModules = sortModules.find(
                  sModule => sModule.name === pName,
                );
                if (findModules === undefined) {
                  sortModules.push({
                    id: mProduct.weplanProduct.id,
                    name: mProduct.weplanProduct.name,
                  });
                }
              } else {
                setMarketPlace(true);
              }
              return mProduct;
            });
            return sortModules;
          });
          setCompanyWPContracts(response.data);
          setCompanyHiredModules(sortModules);
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
          setUnConfirmedEmployees(
            response.data
              .map(tEmployee => {
                return {
                  id: tEmployee.id,
                  employee: tEmployee.employee,
                  company: tEmployee.company,
                  position: tEmployee.position,
                  modules: tEmployee.modules,
                  confirmation: tEmployee.confirmation,
                };
              })
              .filter(
                tEmployee => tEmployee.confirmation.isConfirmed === false,
              ),
          );
          setEmployees(
            response.data
              .map(tEmployee => {
                return {
                  id: tEmployee.id,
                  employee: tEmployee.employee,
                  company: tEmployee.company,
                  position: tEmployee.position,
                  modules: tEmployee.modules,
                  confirmation: tEmployee.confirmation,
                };
              })
              .filter(tEmployee => tEmployee.confirmation.isConfirmed === true),
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
      api.get<ICompanyInfoDTO>(`company-info/${user.id}`).then(response => {
        setCompanyInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user]);

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
  useEffect(() => {
    if (companyInfoSection) {
      setDashboardTitle('Informações da Empresa');
    }
    if (employeesSection) {
      setDashboardTitle('Colaboradores');
    }
    if (financialSection) {
      setDashboardTitle('Financeiro');
    }
    if (advancedOptionsSection) {
      setDashboardTitle('Opções Avançadas');
    }
    if (helpSection) {
      setDashboardTitle('Colaboradores');
    }
    if (documentationSection) {
      setDashboardTitle('Colaboradores');
    }
  }, [
    user,
    companyInfoSection,
    financialSection,
    employeesSection,
    advancedOptionsSection,
    helpSection,
    documentationSection,
  ]);
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
          handleEmployeeSection={() => setEmployeesSection(true)}
          handleFinancialSection={() => setFinancialSection(false)}
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
        <SupplierPageHeader />
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
          {marketPlace && (
            <button
              style={{ color: '#FF9900' }}
              type="button"
              onClick={handleAdvancedOptionsWindow}
            >
              WePlan Market
            </button>
          )}
          <button type="button" onClick={handleHelpDashboard}>
            Ajuda
          </button>
          <button type="button" onClick={handleDocumentationDashboard}>
            Documentação
          </button>
        </SideMenu>
        <WorkStation>
          <div>
            {!!companyInfoSection && (
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
                                setCompanyNameInput(!companyNameInput)
                              }
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
                        {companyHiredModules.map(hModule => (
                          <tr key={hModule.id}>
                            <td>{hModule.name}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </SecondRow>
                </CompanyInfoList>
              </Section>
            )}
            {!!employeesSection && (
              <EmployeeSection>
                <ConfirmedEmployeeSection>
                  <h2>{dashboardTitle}</h2>
                  <span>
                    <button
                      type="button"
                      onClick={() => setAddEmployeeWindow(true)}
                    >
                      <MdPersonAdd size={30} />
                    </button>
                  </span>
                  <EmployeeScrollList>
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
                          <tr key={employeeIndex}>
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
                          </tr>
                        );
                      })}
                    </table>
                  </EmployeeScrollList>
                </ConfirmedEmployeeSection>
                <UnConfirmedEmployeeSection>
                  <h2>A confirmar</h2>
                  <EmployeeScrollList>
                    <table>
                      <tr>
                        <th>N°</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>
                          <FiEye size={30} />
                        </th>
                      </tr>
                      {unConfirmedEmployees.map(thiEmployee => {
                        const employeeIndex =
                          unConfirmedEmployees.findIndex(
                            index => index.id === thiEmployee.id,
                          ) + 1;
                        return (
                          <tr key={employeeIndex}>
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
                          </tr>
                        );
                      })}
                    </table>
                  </EmployeeScrollList>
                </UnConfirmedEmployeeSection>
              </EmployeeSection>
            )}
            {!!financialSection && (
              <Section>
                <h1>Financeiro</h1>
                <button type="button" onClick={handleContractOrderWindow}>
                  Contratar Módulo de Gestão
                </button>
              </Section>
            )}
            {!!advancedOptionsSection && (
              <Section>
                <h1>OpçõesAvançadas</h1>
              </Section>
            )}
            {!!helpSection && (
              <Section>
                <h1>Ajuda</h1>
              </Section>
            )}
            {!!documentationSection && (
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
