import React, { createContext, useCallback, useState, useContext } from 'react';
import ICardCheckListDTO from '../dtos/ICardCheckListDTO';
import ICardNotesDTO from '../dtos/ICardNotesDTO';
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
  selectedCheckList: ICardCheckListDTO;
  cardCheckLists: ICardCheckListDTO[];
  cardNotes: ICardNotesDTO[];
  selectCard(data: IStageCardDTO): void;
  selectNote(data: ICardNotesDTO): void;
  selectCheckList(data: ICardCheckListDTO): void;
  getCards(data: ICardFilterParams): Promise<IStageCardDTO[] | undefined>;
  getCardCheckLists(): void;
  getCardNotes(): void;
  updateCardStage(stage: IFunnelStageDTO): void;
  updateCard(card: IStageCardDTO): void;
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
  const [selectedCheckList, setSelectedCheckList] = useState<ICardCheckListDTO>(
    {} as ICardCheckListDTO,
  );
  const [selectedNote, setSelectedNote] = useState<ICardNotesDTO>(
    {} as ICardNotesDTO,
  );
  const [cardNotes, setCardNotes] = useState<ICardNotesDTO[]>([]);

  const getCardCheckLists = useCallback(() => {
    try {
      api
        .get<ICardCheckListDTO[]>(`card/check-lists/${selectedCard.id}`)
        .then(response => {
          setCardCheckLists(response.data);
          const mainCheckList = response.data.find(
            mainCL => mainCL.card_id === selectedCard.id,
          );
          mainCheckList && setSelectedCheckList(mainCheckList);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [selectedCard]);

  const selectNote = useCallback((data: ICardNotesDTO) => {
    setSelectedNote(data);
  }, []);

  const selectCheckList = useCallback((data: ICardCheckListDTO) => {
    setSelectedCheckList(data);
  }, []);

  const selectCard = useCallback((data: IStageCardDTO) => {
    setSelectedCard(data);
    localStorage.setItem('@WP-PRO:selected-card', JSON.stringify(data));
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
        const filteredCards = response.data
          .filter(card => card.card_owner === employee.employeeUser.id)
          .filter(card => card.isActive);
        return filteredCards;
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

  return (
    <StageCardContext.Provider
      value={{
        selectedCard,
        selectedCheckList,
        selectedNote,
        selectCard,
        selectCheckList,
        selectNote,
        cardCheckLists,
        cardNotes,
        getCards,
        getCardCheckLists,
        getCardNotes,
        updateCardStage,
        updateCard,
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
