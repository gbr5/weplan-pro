import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import IFunnelDTO from '../dtos/IFunnelDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useManagementModule } from './managementModules';

interface IFunnelContextData {
  selectedFunnelAccessLevel: number;
  funnels: IFunnelDTO[];
  selectedFunnel: IFunnelDTO;
  selectFunnel(data: IFunnelDTO): void;
  getFunnels(company_id: string): Promise<IFunnelDTO[]>;
}

const FunnelContext = createContext<IFunnelContextData>(
  {} as IFunnelContextData,
);

const FunnelProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { employeeModules } = useManagementModule();
  const [funnels, setFunnels] = useState<IFunnelDTO[]>(() => {
    const findFunnels = localStorage.getItem('@WP-PRO:funnels');

    if (findFunnels) {
      return JSON.parse(findFunnels);
    }
    return [];
  });
  const [selectedFunnel, setSelectedFunnel] = useState(() => {
    const findFunnel = localStorage.getItem('@WP-PRO:selected-funnel');
    if (findFunnel) {
      return JSON.parse(findFunnel);
    }
    return {} as IFunnelDTO;
  });
  const [selectedFunnelAccessLevel, setSelectedFunnelAccessLevel] = useState(
    () => {
      if (selectedFunnel) {
        const access = localStorage.getItem(
          `@WP-PRO:funnel=${selectedFunnel.id}/access`,
        );
        if (access) {
          return Number(access);
        }
        return 3;
      }
      return 3;
    },
  );

  const selectFunnel = useCallback((funnel: IFunnelDTO) => {
    setSelectedFunnel(funnel);
    localStorage.setItem('@WP-PRO:selected-funnel', JSON.stringify(funnel));
  }, []);

  const getFunnels = useCallback(
    async (company_id: string) => {
      try {
        const response = await api.get<IFunnelDTO[]>(`funnels/${company_id}`);
        localStorage.setItem('@WP-PRO:funnels', JSON.stringify(response.data));
        if (response.data.length >= 1) {
          if (selectedFunnel && !selectedFunnel.id) {
            setSelectedFunnel(response.data[0]);
            localStorage.setItem(
              '@WP-PRO:selected-funnel',
              JSON.stringify(response.data[0]),
            );
          }
        }
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectedFunnel],
  );

  useEffect(() => {
    if (employee && employee.id) {
      const findFunnels = localStorage.getItem('@WP-PRO:funnels');
      if (findFunnels) {
        setFunnels(JSON.parse(findFunnels));
      } else {
        getFunnels(employee.company.id);
      }
    }
  }, [getFunnels, employee]);

  useEffect(() => {
    if (selectedFunnel && selectedFunnel.id && employeeModules.length > 0) {
      const selectedModule = employeeModules.filter(
        thismodule => thismodule.management_module === selectedFunnel.name,
      );
      setSelectedFunnelAccessLevel(Number(selectedModule[0].access_level));
      localStorage.setItem(
        `@WP-PRO:funnel=${selectedFunnel.id}/access`,
        String(selectedModule[0].access_level),
      );
    }
  }, [selectedFunnel, employeeModules]);

  return (
    <FunnelContext.Provider
      value={{
        selectedFunnel,
        selectedFunnelAccessLevel,
        funnels,
        selectFunnel,
        getFunnels,
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

function useFunnel(): IFunnelContextData {
  const context = useContext(FunnelContext);

  if (!context) {
    throw new Error('useFunnel must be used within an FunnelProvider');
  }

  return context;
}

export { FunnelProvider, useFunnel };
