import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Funnel from '../Funnel';
import UserEmployeeModuleMenu from '../UserEmployeeModuleMenu';

import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import { Container, MiddlePage, SideMenuButton } from './styles';
import WindowContainer from '../WindowContainer';
import UserEmployeeManagementWindow from '../UserEmployeeManagementWindow';
import UserEmployeeSideMenu from '../UserEmployeeSideMenu';
import SupplierPageHeader from '../SupplierPageHeader';

interface IModuleAccessDTO {
  id: string;
  name: string;
}

interface IMasterUserDTO {
  id: string;
  company: {
    id: string;
    name: string;
    avatar: string;
  };
  isConfirmed: boolean;
}

const CompanyDashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const [sideMenu, setSideMenu] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeDTO>(
    {} as IEmployeeDTO,
  );
  const [userAsEmployee, setUserAsEmployee] = useState<IEmployeeDTO[]>([]);
  const [unConfirmedEmployees, setUnConfirmedEmployees] = useState<
    IEmployeeDTO[]
  >([]);
  const [title, setTitle] = useState('Dashboard');
  const [dashboard, setDashboard] = useState(true);
  const [comercialDashboard, setComercialDashboard] = useState(false);
  const [comercialModuleAccess, setComercialModuleAccess] = useState(false);
  const [comercialModuleID, setComercialModuleID] = useState('');
  const [operationsDashboard, setOperationsDashboard] = useState(false);
  const [operationsModuleAccess, setOperationsModuleAccess] = useState(false);
  const [operationsModuleID, setOperationsModuleID] = useState('');
  const [projectsDashboard, setProjectsDashboard] = useState(false);
  const [projectsModuleAccess, setProjectsModuleAccess] = useState(false);
  const [projectsModuleID, setProjectsModuleID] = useState('');
  const [financialDashboard, setFinancialDashboard] = useState(false);
  const [financialModuleAccess, setFinancialModuleAccess] = useState(false);
  const [financialModuleID, setFinancialModuleID] = useState('');
  const [modulesMenu, setModulesMenu] = useState(false);
  const [confirmEmployeeWindow, setConfirmEmployeeWindow] = useState(false);
  const [employeeManagementWindow, setEmployeeManagementWindow] = useState(
    false,
  );

  const closeAllWindow = useCallback(() => {
    setDashboard(false);
    setComercialDashboard(false);
    setOperationsDashboard(false);
    setProjectsDashboard(false);

    setConfirmEmployeeWindow(false);
    setEmployeeManagementWindow(false);
  }, []);

  const handleChangeModule = useCallback(
    (props: string) => {
      closeAllWindow();
      setTitle(props);
      if (props === 'Dashboard') {
        setDashboard(true);
      }
      if (props === 'Comercial') {
        setComercialDashboard(true);
      }
      if (props === 'Operações') {
        setOperationsDashboard(true);
      }
      if (props === 'Projetos') {
        setProjectsDashboard(true);
      }
      if (props === 'Financeiro') {
        setFinancialDashboard(true);
      }
    },
    [closeAllWindow],
  );

  const handleEmployeeManagementWindow = useCallback(() => {
    closeAllWindow();
    setEmployeeManagementWindow(!employeeManagementWindow);
  }, [closeAllWindow, employeeManagementWindow]);
  const handleSideMenu = useCallback(() => {
    closeAllWindow();
    setSideMenu(!sideMenu);
  }, [closeAllWindow, sideMenu]);
  const handleCloseConfirmEmployeeWindow = useCallback(() => {
    closeAllWindow();
    setConfirmEmployeeWindow(false);
  }, [closeAllWindow]);
  const handleConfirmEmployeeWindow = useCallback(
    (props: IEmployeeDTO) => {
      closeAllWindow();
      setConfirmEmployeeWindow(true);
      setSelectedEmployee(props);
    },
    [closeAllWindow],
  );
  const handleDashboard = useCallback(() => {
    closeAllWindow();
    setDashboard(true);
  }, [closeAllWindow]);

  const getUserAsEmployee = useCallback(() => {
    try {
      api
        .get<IEmployeeDTO[]>(`supplier-employees/user/${user.id}`)
        .then(response => {
          if (response.data === undefined) {
            signOut();
          }
          const notConfirmedEmployee = response.data.find(
            tEmployee => !tEmployee.confirmation.isConfirmed,
          );
          if (notConfirmedEmployee !== undefined) {
            console.log(notConfirmedEmployee);
            setSelectedEmployee(notConfirmedEmployee);
            handleConfirmEmployeeWindow(notConfirmedEmployee);
          }
          setUserAsEmployee(
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
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [user, signOut, handleConfirmEmployeeWindow]);

  useEffect(() => {
    getUserAsEmployee();
  }, [getUserAsEmployee]);

  // const getUserAsCompanyMaster = useCallback(() => {
  //   try {
  //     api
  //       .get<IMasterUserDTO[]>(`suppliers/masters/user/${user.id}`)
  //       .then(response => {
  //         console.log(response.data);
  //         if (response.data === undefined) {
  //           signOut();
  //         }
  //         const notConfirmedMaster = response.data.find(
  //           tMaster => !tMaster.isConfirmed,
  //         );
  //         if (notConfirmedMaster !== undefined) {
  //           setConfirmMasterUserWindow(true);
  //           setSelectedUserMaster(notConfirmedMaster);
  //         }
  //         setSelectedUserMaster(response.data[0]);

  //         setUnConfirmedMasters(
  //           response.data
  //             .map(tMasterUser => {
  //               return {
  //                 id: tMasterUser.id,
  //                 company: tMasterUser.company,
  //                 isConfirmed: tMasterUser.isConfirmed,
  //               };
  //             })
  //             .filter(master => !master.isConfirmed),
  //         );
  //         setUserAsMaster(
  //           response.data
  //             .map(tMasterUser => {
  //               return {
  //                 id: tMasterUser.id,
  //                 company: tMasterUser.company,
  //                 isConfirmed: tMasterUser.isConfirmed,
  //               };
  //             })
  //             .filter(master => master.isConfirmed),
  //         );
  //       });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }, [user, signOut]);

  // useEffect(() => {
  //   getUserAsCompanyMaster();
  // }, [getUserAsCompanyMaster]);

  const getWPManagementModules = useCallback(() => {
    try {
      api.get<IModuleAccessDTO[]>('wp-management-modules').then(response => {
        const comercialModule = response.data.find(
          tModule => tModule.name === 'Comercial',
        );
        if (comercialModule) {
          setComercialModuleID(comercialModule.id);
        }
        const operationsModule = response.data.find(
          tModule => tModule.name === 'Operations',
        );
        if (operationsModule) {
          setOperationsModuleID(operationsModule.id);
        }
        const projectsModule = response.data.find(
          tModule => tModule.name === 'Projects',
        );
        if (projectsModule) {
          setProjectsModuleID(projectsModule.id);
        }
        const financialModule = response.data.find(
          tModule => tModule.name === 'Financial',
        );
        if (financialModule) {
          setFinancialModuleID(financialModule.id);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getWPManagementModules();
  }, [getWPManagementModules]);
  useEffect(() => {
    if (selectedEmployee && selectedEmployee.modules) {
      selectedEmployee.modules.map(tModule => {
        tModule.management_module_id === comercialModuleID &&
          setComercialModuleAccess(true);
        tModule.management_module_id === operationsModuleID &&
          setOperationsModuleAccess(true);
        tModule.management_module_id === projectsModuleID &&
          setProjectsModuleAccess(true);
        tModule.management_module_id === financialModuleID &&
          setFinancialModuleAccess(true);
        return tModule;
      });
    }
  }, [
    selectedEmployee,
    comercialModuleID,
    operationsModuleID,
    projectsModuleID,
    financialModuleID,
  ]);

  // const getCompanyInfo = useCallback(() => {
  //   try {
  //     if (selectedEmployee.company) {
  //       api
  //         .get<ICompanyInfoDTO>(`company-info/${selectedEmployee.company.id}`)
  //         .then(response => {
  //           setCompanyInfo(response.data);
  //         });
  //     }
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }, [selectedEmployee]);

  // useEffect(() => {
  //   getCompanyInfo();
  // }, [getCompanyInfo]);

  // const getUserContactInfo = useCallback(() => {
  //   try {
  //     api.get(`/profile/contact-info/${user.id}/phone`).then(response => {
  //       setUserPhone(response.data.contact_info);
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   getUserContactInfo();
  // }, [getUserContactInfo]);

  const handleDeleteEmployee = useCallback(
    async (companyEmployeeID: string) => {
      try {
        await api.delete(`supplier-employees/${companyEmployeeID}`);
        getUserAsEmployee();
      } catch (err) {
        throw new Error(err);
      }
    },
    [getUserAsEmployee],
  );

  const handleConfirmEmployee = useCallback(
    async (confirmationId: string) => {
      try {
        await api.put(
          `/supplier-employees/user/confirmation/${confirmationId}`,
          {
            isConfirmed: true,
          },
        );
        getUserAsEmployee();
        setConfirmEmployeeWindow(false);
      } catch (err) {
        throw new Error(err);
      }
    },
    [getUserAsEmployee],
  );

  // const handleDeleteMasterUser = useCallback(
  //   async (companyUserMasterID: string) => {
  //     try {
  //       await api.delete(`suppliers/master/user/${companyUserMasterID}`);
  //       getUserAsCompanyMaster();
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   },
  //   [getUserAsCompanyMaster],
  // );

  // const handleConfirmMasterUser = useCallback(
  //   async (companyUserMasterID: string) => {
  //     try {
  //       await api.put(`/suppliers/master/user/${companyUserMasterID}`, {
  //         isConfirmed: true,
  //       });
  //       getUserAsCompanyMaster();
  //       setConfirmMasterUserWindow(false);
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   },
  //   [getUserAsCompanyMaster],
  // );

  return (
    <>
      {/* {!!confirmMasterUserWindow && !!selectedUserMaster.company && (
        <WindowContainer
          onHandleCloseWindow={() => setConfirmMasterUserWindow(false)}
          containerStyle={{
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
            zIndex: 1000,
          }}
        >
          <h4>A empresa {selectedUserMaster.company.name},</h4>
          <h4>te adicionou como usuário master.</h4>
          <p>Você confirma esta solicitação?</p>
          <div>
            <button
              type="button"
              onClick={() => handleConfirmMasterUser(selectedUserMaster.id)}
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => handleDeleteMasterUser(selectedUserMaster.id)}
            >
              Não conheço essa empresa
            </button>
          </div>
        </WindowContainer>
      )} */}
      {!!confirmEmployeeWindow && (
        <WindowContainer
          onHandleCloseWindow={handleCloseConfirmEmployeeWindow}
          containerStyle={{
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
            zIndex: 1000,
          }}
        >
          <h4>A empresa {selectedEmployee.company.name},</h4>
          <h4>te adicionou como colaborador.</h4>
          <p>Você confirma esta solicitação?</p>
          <div>
            <button
              type="button"
              onClick={() =>
                handleConfirmEmployee(selectedEmployee.confirmation.id)
              }
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={() => handleDeleteEmployee(selectedEmployee.id)}
            >
              Não conheço essa empresa!
            </button>
          </div>
        </WindowContainer>
      )}
      {!!employeeManagementWindow && (
        <UserEmployeeManagementWindow
          getUserAsEmployee={getUserAsEmployee}
          handleCloseWindow={() => setEmployeeManagementWindow(false)}
          onHandleCloseWindow={handleEmployeeManagementWindow}
          unConfirmedEmployees={unConfirmedEmployees}
          userAsEmployee={userAsEmployee}
        />
      )}
      {/* {!!companyMasterManagementWindow && (
        <UserCompanyMasterManagementWindow
          handleCloseWindow={() => setCompanyMasterManagementWindow(false)}
          onHandleCloseWindow={handleCloseCompanyMasterManagementWindow}
          unConfirmedCompanyMasters={unConfirmedMasters}
          userAsCompanyMasters={userAsMaster}
        />
      )} */}

      {userAsEmployee.length >= 1 && (
        <Container>
          <SupplierPageHeader
            handleModulesMenu={() => setModulesMenu(!modulesMenu)}
            module={title}
            modulesMenu={modulesMenu}
          />
          <SideMenuButton type="button" onClick={handleSideMenu}>
            <FiChevronRight size={64} />
          </SideMenuButton>
          {!!sideMenu && (
            <UserEmployeeSideMenu
              handleMainDashboard={handleDashboard}
              handleUserEmployeeManagementWindow={
                handleEmployeeManagementWindow
              }
            />
          )}
          {!!modulesMenu && (
            <UserEmployeeModuleMenu
              handleMainDashboard={() => handleChangeModule('Dashboard')}
              handleCRMDashboard={() => handleChangeModule('Comercial')}
              comercialAccess={comercialModuleAccess}
              handleOperationsDashboard={() => handleChangeModule('Operações')}
              operationsAccess={operationsModuleAccess}
              handleProjectsDashboard={() => handleChangeModule('Projetos')}
              projectsAccess={projectsModuleAccess}
              handleFinancialDashboard={() => handleChangeModule('Financeiro')}
              financialAccess={financialModuleAccess}
              title={title}
            />
          )}

          {/* <KPIMenu /> */}
          <MiddlePage>
            {!!dashboard && (
              <Funnel>
                <h1>Dashboard</h1>
              </Funnel>
            )}
            {!!comercialDashboard && (
              <Funnel>
                <h1>CRM Funnel</h1>
              </Funnel>
            )}
            {!!operationsDashboard && (
              <Funnel>
                <h1>Production Funnel</h1>
              </Funnel>
            )}
            {!!projectsDashboard && (
              <Funnel>
                <h1>Project Funnel</h1>
              </Funnel>
            )}
            {!!financialDashboard && (
              <Funnel>
                <h1>Financial Dashboard</h1>
              </Funnel>
            )}
          </MiddlePage>
        </Container>
      )}
    </>
  );
};

export default CompanyDashboard;
