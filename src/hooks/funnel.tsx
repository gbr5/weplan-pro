import React, { createContext, useCallback, useState, useContext } from 'react';
import IFunnelDTO from '../dtos/IFunnelDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';

interface IFunnelContextData {
  funnels: IFunnelDTO[];
  selectedFunnel: IFunnelDTO;
  selectFunnel(data: IFunnelDTO): void;
  getFunnels(): void;
}

const FunnelContext = createContext<IFunnelContextData>(
  {} as IFunnelContextData,
);

const FunnelProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { company } = employee;
  const [funnels, setFunnels] = useState<IFunnelDTO[]>([]);

  const [selectedFunnel, setSelectedFunnel] = useState({} as IFunnelDTO);

  const selectFunnel = useCallback((data: IFunnelDTO) => {
    setSelectedFunnel(data);
  }, []);

  const getFunnels = useCallback(async () => {
    try {
      const response = await api.get<IFunnelDTO[]>(`funnels/${company.id}`);
      setFunnels(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  return (
    <FunnelContext.Provider
      value={{
        selectedFunnel,
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
