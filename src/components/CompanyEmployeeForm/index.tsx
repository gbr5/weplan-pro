import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import Input from '../Input';
import WindowContainer from '../WindowContainer';

import api from '../../services/api';
import IWPContractOrderDTO from '../../dtos/IWPContractOrderDTO';
import IEmployeeDTO from '../../dtos/IEmployeeDTO';
import avatarPlaceholder from '../../assets/avatar_placeholder_cat2.jpeg';

import {
  Container,
  FirstRow,
  SecondRow,
  WPModule,
  BooleanButton,
  ButtonContainer,
  AddButton,
} from './styles';

interface IEmployeeUserPersonInfoDTO {
  id: string;
  first_name: string;
  last_name: string;
  person_id: string;
}

interface IUserEmployeeDTO {
  id: string;
  name: string;
}
interface IContractWPModulesDTO {
  id: string;
  name: string;
}

interface IEmployeeWPModulesDTO {
  management_module_id: string;
  access_level: number;
}

interface IPropsDTO {
  wpCompanyContract: IWPContractOrderDTO;
  wpModules: IContractWPModulesDTO[];
  // eslint-disable-next-line react/require-default-props
  // employees?: IEmployeeDTO[];
  // eslint-disable-next-line react/require-default-props
  employee?: IEmployeeDTO;
  // eslint-disable-next-line react/require-default-props
  userEmployee?: IUserEmployeeDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getEmployees: Function;
}

const CompanyEmployeeForm: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  getEmployees,
  wpCompanyContract,
  employee,
  userEmployee,
  wpModules,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  // const [contractModules, setContractModules] = useState<
  //   IContractWPModulesDTO[]
  // >([]);
  const [employeeCRMLevel, setEmployeeCRMLevel] = useState(0);
  const [employeeProductionLevel, setEmployeeProductionLevel] = useState(0);
  const [employeeProjectLevel, setEmployeeProjectLevel] = useState(0);
  const [employeeFinancialLevel, setEmployeeFinancialLevel] = useState(0);
  const [salaryInput, setSalaryInput] = useState(false);
  const [employeeUserInfo, setEmployeeUserInfo] = useState<
    IEmployeeUserPersonInfoDTO
  >({} as IEmployeeUserPersonInfoDTO);
  const wpCRM = wpModules.find(wpM => wpM.name === 'Comercial');
  const wpProduction = wpModules.find(wpM => wpM.name === 'Operations');
  const wpProject = wpModules.find(wpM => wpM.name === 'Projects');
  const wpFinancial = wpModules.find(wpM => wpM.name === 'Financial');

  const inputHeight = { height: '40px' };

  const handleDeleteEmployee = useCallback(async () => {
    try {
      if (employee) {
        await api.delete(`/supplier-employees/${employee.id}`);
        getEmployees();
        addToast({
          type: 'success',
          title: 'Contrato deletado com sucesso',
          description: 'As informações do evento já foram atualizadas.',
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }, [employee, addToast, getEmployees]);

  const handleSubmit = useCallback(
    async (data: IEmployeeDTO) => {
      try {
        const modules: IEmployeeWPModulesDTO[] = [];

        employeeCRMLevel > 0 &&
          modules.push({
            management_module_id: wpCRM ? wpCRM.id : '',
            access_level: employeeCRMLevel,
          });
        employeeFinancialLevel > 0 &&
          modules.push({
            management_module_id: wpFinancial ? wpFinancial.id : '',
            access_level: employeeFinancialLevel,
          });
        employeeProductionLevel > 0 &&
          modules.push({
            management_module_id: wpProduction ? wpProduction.id : '',
            access_level: employeeProductionLevel,
          });
        employeeProjectLevel > 0 &&
          modules.push({
            management_module_id: wpProject ? wpProject.id : '',
            access_level: employeeProjectLevel,
          });

        const salary = salaryInput ? data.confirmation.salary : 0;

        if (userEmployee) {
          await api.post(`supplier-employees/${userEmployee.id}`, {
            position: data.position,
            modules,
            request_message: data.confirmation.request_message,
            salary,
          });
        } else {
          throw new Error('usuário não encontrado');
        }

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        getEmployees();
        handleCloseWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      salaryInput,
      getEmployees,
      employeeCRMLevel,
      employeeFinancialLevel,
      employeeProductionLevel,
      employeeProjectLevel,
      userEmployee,
      wpCRM,
      wpFinancial,
      wpProduction,
      wpProject,
      handleCloseWindow,
    ],
  );

  const getEmployeePersonInfo = useCallback(() => {
    try {
      api.get<IEmployeeUserPersonInfoDTO>('person-info').then(response => {
        setEmployeeUserInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getEmployeePersonInfo();
  }, [getEmployeePersonInfo]);

  const hiredModules = useMemo(() => {
    if (wpCompanyContract) {
      const availableModules: IContractWPModulesDTO[] = [];
      wpCompanyContract.products.map(product => {
        const productName = wpModules.find(
          xModule => xModule.name === product.weplanProduct.name,
        );
        if (productName !== undefined) {
          availableModules.push({
            id: productName.id,
            name: productName.name,
          });
          return productName;
        }
        return productName;
      });

      return availableModules;
    }

    throw new Error('WPManagementModule not found.');
  }, [wpCompanyContract, wpModules]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Adicionar Colaborador</h2>
          <div>
            <FirstRow>
              <img src={avatarPlaceholder} alt="WePlanPRO Company Employee" />
              <div>
                <span>
                  <strong>Nome de Usuário</strong>
                  <p>{userEmployee?.name}</p>
                </span>
                <span>
                  <strong>Nome</strong>
                  <span>
                    <p>{employeeUserInfo.first_name}</p>
                    <p>{employeeUserInfo.last_name}</p>
                  </span>
                </span>
                <span>
                  <strong>CPF</strong>
                  <p>xxx.xxx.xxx-xx</p>
                  {/* <p>{employeeUserInfo.person_id}</p> */}
                </span>
              </div>
            </FirstRow>
            <SecondRow>
              <span>
                <div>
                  <p>Cargo</p>
                  <Input name="position" containerStyle={inputHeight} />
                </div>
                {!salaryInput ? (
                  <div>
                    <p>Definir Salário?</p>
                    <ButtonContainer>
                      <button
                        type="button"
                        onClick={() => setSalaryInput(true)}
                        style={{ backgroundColor: 'green' }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        onClick={() => setSalaryInput(false)}
                        style={{ backgroundColor: 'red' }}
                      >
                        Não
                      </button>
                    </ButtonContainer>
                  </div>
                ) : (
                  <div>
                    <div>
                      <p>Definir Salário</p>
                      <button
                        type="button"
                        onClick={() => setSalaryInput(false)}
                        style={{ backgroundColor: 'red' }}
                      >
                        Desfazer
                      </button>
                    </div>
                    <Input
                      name="confirmation.salary"
                      type="number"
                      containerStyle={inputHeight}
                    />
                  </div>
                )}
                <div>
                  <p>Mensagem</p>
                  <Input
                    name="confirmation.request_message"
                    containerStyle={inputHeight}
                  />
                </div>
              </span>
              <span>
                <h3>Acessos</h3>
                {hiredModules ? (
                  <span>
                    {hiredModules.map(xModule => (
                      <WPModule key={xModule.id}>
                        <strong>{xModule.name}</strong>
                        {xModule.name === 'Comercial' && (
                          <div>
                            <BooleanButton
                              type="button"
                              isActive={employeeCRMLevel === 1}
                              onClick={() =>
                                setEmployeeCRMLevel(
                                  employeeCRMLevel === 1 ? 0 : 1,
                                )
                              }
                            >
                              Acesso Total
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeCRMLevel === 2}
                              onClick={() =>
                                setEmployeeCRMLevel(
                                  employeeCRMLevel === 2 ? 0 : 2,
                                )
                              }
                            >
                              Acesso por Equipe
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeCRMLevel === 3}
                              onClick={() =>
                                setEmployeeCRMLevel(
                                  employeeCRMLevel === 3 ? 0 : 3,
                                )
                              }
                            >
                              Acesso Individual
                            </BooleanButton>
                          </div>
                        )}
                        {xModule.name === 'Financial' && (
                          <div>
                            <BooleanButton
                              type="button"
                              isActive={employeeFinancialLevel === 1}
                              onClick={() =>
                                setEmployeeFinancialLevel(
                                  employeeFinancialLevel === 1 ? 0 : 1,
                                )
                              }
                            >
                              Acesso Total
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeFinancialLevel === 2}
                              onClick={() =>
                                setEmployeeFinancialLevel(
                                  employeeFinancialLevel === 2 ? 0 : 2,
                                )
                              }
                            >
                              Acesso por Equipe
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeFinancialLevel === 3}
                              onClick={() =>
                                setEmployeeFinancialLevel(
                                  employeeFinancialLevel === 3 ? 0 : 3,
                                )
                              }
                            >
                              Acesso Individual
                            </BooleanButton>
                          </div>
                        )}
                        {xModule.name === 'Operations' && (
                          <div>
                            <BooleanButton
                              type="button"
                              isActive={employeeProductionLevel === 1}
                              onClick={() =>
                                setEmployeeProductionLevel(
                                  employeeProductionLevel === 1 ? 0 : 1,
                                )
                              }
                            >
                              Acesso Total
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeProductionLevel === 2}
                              onClick={() =>
                                setEmployeeProductionLevel(
                                  employeeProductionLevel === 2 ? 0 : 2,
                                )
                              }
                            >
                              Acesso por Equipe
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeProductionLevel === 3}
                              onClick={() =>
                                setEmployeeProductionLevel(
                                  employeeProductionLevel === 3 ? 0 : 3,
                                )
                              }
                            >
                              Acesso Individual
                            </BooleanButton>
                          </div>
                        )}
                        {xModule.name === 'Projects' && (
                          <div>
                            <BooleanButton
                              type="button"
                              isActive={employeeProjectLevel === 1}
                              onClick={() =>
                                setEmployeeProjectLevel(
                                  employeeProjectLevel === 1 ? 0 : 1,
                                )
                              }
                            >
                              Acesso Total
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeProjectLevel === 2}
                              onClick={() =>
                                setEmployeeProjectLevel(
                                  employeeProjectLevel === 2 ? 0 : 2,
                                )
                              }
                            >
                              Acesso por Equipe
                            </BooleanButton>
                            <BooleanButton
                              type="button"
                              isActive={employeeProjectLevel === 3}
                              onClick={() =>
                                setEmployeeProjectLevel(
                                  employeeProjectLevel === 3 ? 0 : 3,
                                )
                              }
                            >
                              Acesso Individual
                            </BooleanButton>
                          </div>
                        )}
                      </WPModule>
                    ))}
                  </span>
                ) : (
                  <span>
                    <strong>Você ainda não possui módulos de gestão</strong>
                    <button type="button">Eu quero vencer!</button>
                  </span>
                )}
              </span>
            </SecondRow>
          </div>
          {!!employee && (
            <button type="button" onClick={handleDeleteEmployee}>
              Deletar Contrato
            </button>
          )}
          <AddButton type="submit">Adicionar Colaborador</AddButton>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default CompanyEmployeeForm;
