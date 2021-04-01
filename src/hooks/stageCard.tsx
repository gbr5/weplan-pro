import React, { createContext, useCallback, useState, useContext } from 'react';
import ICardCheckListDTO from '../dtos/ICardCheckListDTO';
import ICardNotesDTO from '../dtos/ICardNotesDTO';
import IStageCardDTO from '../dtos/IStageCardDTO';

import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';

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
}

const StageCardContext = createContext<IStageCardContextData>(
  {} as IStageCardContextData,
);

const StageCardProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const [selectedCard, setSelectedCard] = useState({} as IStageCardDTO);
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
  }, []);

  const getCards = useCallback(
    async ({
      access_level,
      stage_id,
    }: ICardFilterParams): Promise<IStageCardDTO[] | undefined> => {
      const response = await api.get<IStageCardDTO[]>(
        `/funnels/${stage_id}/cards`,
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
