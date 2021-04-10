import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import ICreateFunnelCardInfoFieldDTO from '../dtos/ICreateFunnelCardInfoFieldDTO';
import IFunnelCardInfoFieldDTO from '../dtos/IFunnelCardInfoFieldDTO';
import IFunnelDTO from '../dtos/IFunnelDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useManagementModule } from './managementModules';
import { useToast } from './toast';

interface IFunnelContextData {
  selectedFunnelAccessLevel: number;
  funnels: IFunnelDTO[];
  selectedFunnel: IFunnelDTO;
  comercialFunnel: IFunnelDTO;
  selectedFunnelCardInfoFields: IFunnelCardInfoFieldDTO[];
  selectFunnel(data: IFunnelDTO): void;
  createFunnelCardInfoField(note: ICreateFunnelCardInfoFieldDTO): void;
  updateFunnelCardInfoField(note: IFunnelCardInfoFieldDTO): void;
  deleteFunnelCardInfoField(id: string): void;
  getFunnels(company_id: string): Promise<IFunnelDTO[]>;
  getFunnelCardInfoFields(funnel_id: string): void;
}

const FunnelContext = createContext<IFunnelContextData>(
  {} as IFunnelContextData,
);

const FunnelProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { addToast } = useToast();
  const { employeeModules } = useManagementModule();
  const [funnels, setFunnels] = useState<IFunnelDTO[]>(() => {
    const findFunnels = localStorage.getItem('@WP-PRO:funnels');

    if (findFunnels) {
      return JSON.parse(findFunnels);
    }
    return [];
  });
  const [
    selectedFunnelCardInfoFields,
    setSelectedFunnelCardInfoFields,
  ] = useState<IFunnelCardInfoFieldDTO[]>(() => {
    const findFunnelCardInfoFields = localStorage.getItem(
      '@WP-PRO:selected-funnel-card-info-fields',
    );

    if (findFunnelCardInfoFields) {
      return JSON.parse(findFunnelCardInfoFields);
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
  const [comercialFunnel, setComercialFunnel] = useState(() => {
    const findFunnel = localStorage.getItem('@WP-PRO:comercial-funnel');
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

  const getFunnelCardInfoFields = useCallback((funnel_id: string) => {
    try {
      api
        .get(`/funnels/company-funnel-card-info-field/${funnel_id}`)
        .then(response => {
          setSelectedFunnelCardInfoFields(response.data);
          localStorage.setItem(
            '@WP-PRO:selected-funnel-card-info-fields',
            JSON.stringify(response.data),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const selectFunnel = useCallback(
    (funnel: IFunnelDTO) => {
      getFunnelCardInfoFields(funnel.id);
      setSelectedFunnel(funnel);
      localStorage.setItem('@WP-PRO:selected-funnel', JSON.stringify(funnel));
    },
    [getFunnelCardInfoFields],
  );

  const getFunnels = useCallback(
    async (company_id: string) => {
      try {
        const response = await api.get<IFunnelDTO[]>(`funnels/${company_id}`);
        const findComercialFunnel = response.data.find(
          funnel => funnel.name === 'Comercial',
        );
        findComercialFunnel && setComercialFunnel(findComercialFunnel);
        findComercialFunnel &&
          localStorage.setItem(
            '@WP-PRO:comercial-funnels',
            JSON.stringify(response.data),
          );
        localStorage.setItem('@WP-PRO:funnels', JSON.stringify(response.data));
        if (response.data.length >= 1) {
          if (selectedFunnel && !selectedFunnel.id) {
            findComercialFunnel && setSelectedFunnel(findComercialFunnel);
            !findComercialFunnel && setSelectedFunnel(response.data[0]);
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

  const createFunnelCardInfoField = useCallback(
    async (data: ICreateFunnelCardInfoFieldDTO) => {
      try {
        await api.post(
          `/funnels/company-funnel-card-info-field/${employee.company.id}`,
          {
            funnel_id: data.funnel_id,
            name: data.name,
            field_type: data.field_type,
            isRequired: data.isRequired,
          },
        );
        getFunnelCardInfoFields(selectedFunnel.id);
        addToast({
          type: 'success',
          title: 'Campo criado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar o campo',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, selectedFunnel, getFunnelCardInfoFields, employee],
  );

  const updateFunnelCardInfoField = useCallback(
    async (data: IFunnelCardInfoFieldDTO) => {
      try {
        await api.put(
          `/funnels/company-funnel-card-info-field/${data.funnel_id}/${data.id}`,
          {
            name: data.name,
            field_type: data.field_type,
            isRequired: data.isRequired,
          },
        );
        getFunnelCardInfoFields(selectedFunnel.id);
        addToast({
          type: 'success',
          title: 'Campo editado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível editar o campo',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, selectedFunnel, getFunnelCardInfoFields],
  );

  const deleteFunnelCardInfoField = useCallback(
    async (id: string) => {
      try {
        await api.delete(`funnels/company-funnel-card-info-field/${id}`);
        getFunnelCardInfoFields(selectedFunnel.id);
        addToast({
          type: 'success',
          title: 'Campo deletado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível deletar o campo',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, selectedFunnel, getFunnelCardInfoFields],
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
        comercialFunnel,
        createFunnelCardInfoField,
        updateFunnelCardInfoField,
        deleteFunnelCardInfoField,
        selectedFunnelCardInfoFields,
        getFunnelCardInfoFields,
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
