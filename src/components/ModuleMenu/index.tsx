import React, { useState, useEffect } from 'react';

import { Modules, ModuleTitle } from './styles';

import { useManagementModule } from '../../hooks/managementModules';
import { useEmployeeAuth } from '../../hooks/employeeAuth';
import { useFunnel } from '../../hooks/funnel';

interface IPropsDTO {
  title: string;
  handleChangeModule: Function;
}

const ModuleMenu: React.FC<IPropsDTO> = ({
  title,
  handleChangeModule,
}: IPropsDTO) => {
  const { employee } = useEmployeeAuth();
  const { getEmployeeModules, employeeModules } = useManagementModule();
  const { getFunnels, funnels } = useFunnel();

  useEffect(() => {
    getEmployeeModules();
  }, [getEmployeeModules]);

  useEffect(() => {
    getFunnels();
  }, [getFunnels]);

  const [comercialModule, setComercialModule] = useState(false);
  const [productionModule, setProductionModule] = useState(false);
  const [projectsModule, setProjectsModule] = useState(false);
  const [financialModule, setFinancialModule] = useState(false);
  useEffect(() => {
    employeeModules.map(thisModule => {
      const thisCompanyFunnel = funnels.find(
        xFunnel => xFunnel.name === thisModule.management_module,
      );
      if (thisCompanyFunnel) {
        thisModule.management_module === 'Comercial' &&
          setComercialModule(true);
        thisModule.management_module === 'Production' &&
          setProductionModule(true);
        thisModule.management_module === 'Projects' && setProjectsModule(true);
        thisModule.management_module === 'Financial' &&
          setFinancialModule(true);
      }
      return thisModule;
    });
  }, [employeeModules, funnels]);

  return (
    <Modules>
      <img
        src={employee.company.companyInfo.logo_url}
        alt={employee.company.name}
      />
      <button type="button" onClick={() => handleChangeModule('Dashboard')}>
        <ModuleTitle isActive={title === 'Dashboard'}>
          <strong>Dashboard</strong>
        </ModuleTitle>
      </button>
      {!!comercialModule && (
        <button type="button" onClick={() => handleChangeModule('Comercial')}>
          <ModuleTitle isActive={title === 'Comercial'}>
            <strong>Comercial</strong>
          </ModuleTitle>
        </button>
      )}
      {!!productionModule && (
        <button type="button" onClick={() => handleChangeModule('Produção')}>
          <ModuleTitle isActive={title === 'Produção'}>
            <strong>Produção</strong>
          </ModuleTitle>
        </button>
      )}
      {!!projectsModule && (
        <button type="button" onClick={() => handleChangeModule('Projetos')}>
          <ModuleTitle isActive={title === 'Projetos'}>
            <strong>Projetos</strong>
          </ModuleTitle>
        </button>
      )}
      {!!financialModule && (
        <button type="button" onClick={() => handleChangeModule('Financeiro')}>
          <ModuleTitle isActive={title === 'Financeiro'}>
            <strong>Financeiro</strong>
          </ModuleTitle>
        </button>
      )}
    </Modules>
  );
};

export default ModuleMenu;
