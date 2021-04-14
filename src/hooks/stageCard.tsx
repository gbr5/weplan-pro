import React, { createContext, useCallback, useState, useContext } from 'react';
import ICardCheckListDTO from '../dtos/ICardCheckListDTO';
import ICardCustomerDTO from '../dtos/ICardCustomerDTO';
import ICardNotesDTO from '../dtos/ICardNotesDTO';
import ICreateFunnelCardInfoDTO from '../dtos/ICreateFunnelCardInfoDTO';
import IFunnelCardInfoDTO from '../dtos/IFunnelCardInfoDTO';
import IFunnelStageDTO from '../dtos/IFunnelStageDTO';
import IStageCardDTO from '../dtos/IStageCardDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useFunnel } from './funnel';
import { useToast } from './toast';

interface ICardFilterParams {
  stage_id: string;
  access_level: number;
}

interface IStageCardContextData {
  selectedCard: IStageCardDTO;
  selectedNote: ICardNotesDTO;
  selectedCardCheckList: ICardCheckListDTO;
  cardCheckLists: ICardCheckListDTO[];
  cardNotes: ICardNotesDTO[];
  cardCustomers: ICardCustomerDTO[];
  funnelCardInfos: IFunnelCardInfoDTO[];
  selectCard(data: IStageCardDTO): void;
  selectNote(data: ICardNotesDTO): void;
  selectCardCheckList(data: ICardCheckListDTO): void;
  getCards(data: ICardFilterParams): Promise<IStageCardDTO[] | undefined>;
  getCardCheckLists(): void;
  getFunnelCardInfos(): void;
  getCardCustomers(): void;
  getCardNotes(): void;
  updateCardStage(stage: IFunnelStageDTO): void;
  updateCard(card: IStageCardDTO): void;
  createCardNote(note: string): void;
  createFunnelCardInfo(data: ICreateFunnelCardInfoDTO): void;
  updateFunnelCardInfo(data: IFunnelCardInfoDTO): void;
}

const StageCardContext = createContext<IStageCardContextData>(
  {} as IStageCardContextData,
);

const StageCardProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { getFunnels } = useFunnel();
  const { addToast } = useToast();
  const [selectedCard, setSelectedCard] = useState(() => {
    const findCard = localStorage.getItem('@WP-PRO:selected-card');
    if (findCard) {
      return JSON.parse(findCard);
    }
    return {} as IStageCardDTO;
  });
  const [cardCheckLists, setCardCheckLists] = useState<ICardCheckListDTO[]>([]);
  const [selectedCardCheckList, setSelectedCardCheckList] = useState<
    ICardCheckListDTO
  >({} as ICardCheckListDTO);
  const [selectedNote, setSelectedNote] = useState<ICardNotesDTO>(
    {} as ICardNotesDTO,
  );
  const [cardNotes, setCardNotes] = useState<ICardNotesDTO[]>([]);
  const [cardCustomers, setCardCustomers] = useState<ICardCustomerDTO[]>([]);
  const [funnelCardInfos, setFunnelCardInfos] = useState<IFunnelCardInfoDTO[]>(
    [],
  );

  const getFunnelCardInfos = useCallback(async () => {
    try {
      await api
        .get(
          `/funnels/card/company-funnel-card-info/${selectedCard.unique_name}`,
        )
        .then(response => {
          setFunnelCardInfos(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const getCardCustomers = useCallback(() => {
    try {
      api
        .get<ICardCustomerDTO[]>(`card/customers/${selectedCard.unique_name}`)
        .then(response => {
          setCardCustomers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const getCardCheckLists = useCallback(() => {
    try {
      api
        .get<ICardCheckListDTO[]>(`card/check-lists/${selectedCard.id}`)
        .then(response => {
          setCardCheckLists(response.data);
          setSelectedCardCheckList(response.data[0]);
          localStorage.setItem(
            '@WP-PRO:selected-check-list',
            JSON.stringify(response.data[0]),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const selectNote = useCallback((data: ICardNotesDTO) => {
    setSelectedNote(data);
  }, []);

  const selectCardCheckList = useCallback((data: ICardCheckListDTO) => {
    setSelectedCardCheckList(data);
  }, []);

  const getCards = useCallback(
    async ({
      access_level,
      stage_id,
    }: ICardFilterParams): Promise<IStageCardDTO[] | undefined> => {
      const response = await api.get<IStageCardDTO[]>(
        `/funnels/${stage_id}/cards`,
      );
      localStorage.setItem(
        `@WP-PRO:stage=${stage_id}`,
        JSON.stringify(response.data),
      );

      if (access_level === 3) {
        const filteredCards = response.data
          .filter(card => card.card_owner === employee.employeeUser.id)
          .filter(card => card.isActive);
        return filteredCards;
      }
      if (access_level === 2) {
        const filteredCards = response.data
          .filter(card => card.card_owner === employee.employeeUser.id)
          .filter(card => card.isActive);
        return filteredCards;
      }
      if (access_level === 1) {
        return response.data;
      }
      return undefined;
    },
    [employee],
  );
  const getCardNotes = useCallback(() => {
    try {
      api
        .get<ICardNotesDTO[]>(`cards/notes/${selectedCard.unique_name}`)
        .then(response => {
          setCardNotes(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const selectCard = useCallback(
    (data: IStageCardDTO) => {
      getFunnelCardInfos();
      getCardNotes();
      getCardCustomers();
      setSelectedCard(data);
      localStorage.setItem('@WP-PRO:selected-card', JSON.stringify(data));
    },
    [getCardCustomers, getCardNotes, getFunnelCardInfos],
  );

  const updateCardStage = useCallback(
    async (xStage: IFunnelStageDTO) => {
      try {
        const response = await api.put(
          `/funnels/${selectedCard.stage_id}/cards/${selectedCard.id}`,
          {
            weplanEvent: selectedCard.weplanEvent,
            name: selectedCard.name,
            isActive: true,
            new_stage_id: xStage.id,
            new_card_owner: selectedCard.card_owner,
          },
        );

        selectCard(response.data);
        getFunnels(employee.company.id);
        addToast({
          type: 'success',
          title: 'Card alterado com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao alterar card',
          description: 'Erro ao editar card, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [selectCard, employee, getFunnels, selectedCard, addToast],
  );

  const updateCard = useCallback(
    async (card: IStageCardDTO) => {
      try {
        const response = await api.put(
          `/funnels/${card.stage_id}/cards/${card.id}`,
          {
            weplanEvent: card.weplanEvent,
            name: card.name,
            isActive: card.isActive,
            new_stage_id: card.stage_id,
            new_card_owner: card.card_owner,
          },
        );
        selectCard(response.data);
        getFunnels(employee.company.id);
        addToast({
          type: 'success',
          title: 'Card alterado com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível editar o card',
          description: 'Tente novamente',
        });
      }
    },
    [addToast, selectCard, getFunnels, employee],
  );

  const createCardNote = useCallback(
    async (note: string) => {
      try {
        await api.post(`cards/notes`, {
          user_id: employee.employeeUser.id,
          card_unique_name: selectedCard.unique_name,
          note,
        });
        getCardNotes();
        addToast({
          type: 'success',
          title: 'Nota criada com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar nota',
        });
        throw new Error(err);
      }
    },
    [employee, addToast, getCardNotes, selectedCard],
  );

  const createFunnelCardInfo = useCallback(
    async (data: ICreateFunnelCardInfoDTO) => {
      try {
        await api.post(`/funnels/card/company-funnel-card-info`, {
          funnel_card_field_id: data.funnel_card_field_id,
          user_id: employee.employeeUser.id,
          card_unique_name: selectedCard.unique_name,
          response: data.response,
        });
        getFunnelCardInfos();
        addToast({
          type: 'success',
          title: 'Informação salva com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar informação',
        });
        throw new Error(err);
      }
    },
    [employee, addToast, getFunnelCardInfos, selectedCard],
  );

  const updateFunnelCardInfo = useCallback(
    async (data: IFunnelCardInfoDTO) => {
      try {
        await api.put(
          `/funnels/card/company-funnel-card-info/${data.id}/${selectedCard.unique_name}/${data.funnel_card_field_id}`,
          {
            response: data.response,
          },
        );
        getFunnelCardInfos();
        addToast({
          type: 'success',
          title: 'Informação salva com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao salvar informação',
        });
        throw new Error(err);
      }
    },
    [addToast, getFunnelCardInfos, selectedCard],
  );

  return (
    <StageCardContext.Provider
      value={{
        createCardNote,
        selectedCard,
        selectedCardCheckList,
        selectedNote,
        selectCard,
        selectCardCheckList,
        selectNote,
        cardCheckLists,
        cardNotes,
        getCards,
        getCardCheckLists,
        getCardNotes,
        updateCardStage,
        updateCard,
        getFunnelCardInfos,
        funnelCardInfos,
        getCardCustomers,
        cardCustomers,
        createFunnelCardInfo,
        updateFunnelCardInfo,
      }}
    >
      {children}
    </StageCardContext.Provider>
  );
};

function useStageCard(): IStageCardContextData {
  const context = useContext(StageCardContext);

  if (!context) {
    throw new Error('useStageCard must be used within an StageCardProvider');
  }

  return context;
}

export { StageCardProvider, useStageCard };
