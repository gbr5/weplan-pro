import { differenceInDays } from 'date-fns';
import React, { createContext, useCallback, useState, useContext } from 'react';
import ICardCheckListDTO from '../dtos/ICardCheckListDTO';
import ICardCustomerDTO from '../dtos/ICardCustomerDTO';
import ICardNotesDTO from '../dtos/ICardNotesDTO';
import ICreateCardDTO from '../dtos/ICreateCardDTO';
import ICreateFunnelCardInfoDTO from '../dtos/ICreateFunnelCardInfoDTO';
import IFunnelCardInfoDTO from '../dtos/IFunnelCardInfoDTO';
import IFunnelStageDTO from '../dtos/IFunnelStageDTO';
import IStageCardDTO from '../dtos/IStageCardDTO';

import api from '../services/api';
import formatHourDateShort from '../utils/formatHourDateShort';
import { useCompanyContact } from './companyContacts';
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
  updateCardName(card: IStageCardDTO): void;
  createCard(data: ICreateCardDTO): Promise<void>;
  createCardNote(note: string): Promise<void>;
  createCardHistoryNote(note: string, card_unique_name: string): Promise<void>;
  createFunnelCardInfo(data: ICreateFunnelCardInfoDTO): Promise<void>;
  updateFunnelCardInfo(data: IFunnelCardInfoDTO): void;
}

const StageCardContext = createContext<IStageCardContextData>(
  {} as IStageCardContextData,
);

const StageCardProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { getFunnels, selectedFunnel } = useFunnel();
  const { addToast } = useToast();
  const { myEmployeeContact } = useCompanyContact();

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
          setCardNotes(
            response.data.sort((a, b) => {
              if (
                differenceInDays(
                  new Date(a.created_at),
                  new Date(b.created_at),
                ) > 0
              ) {
                return -1;
              }
              if (
                differenceInDays(
                  new Date(a.created_at),
                  new Date(b.created_at),
                ) < 0
              ) {
                return 1;
              }
              return 0;
            }),
          );
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

  const createCardHistoryNote = useCallback(
    async (note: string, card_unique_name: string) => {
      try {
        await api.post(`cards/notes`, {
          user_id: employee.company.id,
          card_unique_name,
          note,
        });
        getCardNotes();
      } catch (err) {
        throw new Error(err);
      }
    },
    [employee, getCardNotes],
  );

  const updateCardStage = useCallback(
    async (xStage: IFunnelStageDTO) => {
      try {
        const now = formatHourDateShort(String(new Date()));
        const previousStage = selectedFunnel.stages.filter(
          stage => stage.id === selectedCard.stage_id,
        )[0];

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

        const name =
          myEmployeeContact && myEmployeeContact.id
            ? `${myEmployeeContact.name} ${myEmployeeContact.family_name}`
            : employee.employeeUser.name;
        const historyNote = `${previousStage.name} -> ${xStage.name}|\n${now} - ${name}`;
        await createCardHistoryNote(historyNote, selectedCard.card_unique_name);
        selectCard(response.data);
        await getFunnels();
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
    [
      selectCard,
      employee,
      getFunnels,
      selectedCard,
      addToast,
      createCardHistoryNote,
      selectedFunnel,
      myEmployeeContact,
    ],
  );

  const updateCardName = useCallback(
    async (card: IStageCardDTO) => {
      try {
        const now = formatHourDateShort(String(new Date()));
        const previousName = selectedCard.name;
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

        const name =
          myEmployeeContact && myEmployeeContact.id
            ? `${myEmployeeContact.name} ${myEmployeeContact.family_name}`
            : employee.employeeUser.name;
        const historyNote = `Nome do Card Alterado|Nome antigo: ${previousName}\nNome novo: ${card.name}\n. . . . .\n${now} - ${name}`;
        await createCardHistoryNote(historyNote, selectedCard.card_unique_name);
        selectCard(response.data);
        getFunnels();
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
    [
      addToast,
      selectCard,
      getFunnels,
      employee,
      createCardHistoryNote,
      myEmployeeContact,
      selectedCard,
    ],
  );

  const createCard = useCallback(
    async (data: ICreateCardDTO) => {
      try {
        console.log({
          weplanEvent: data.weplanEvent,
          name: data.name,
          card_owner: data.card_owner,
        });
        const now = formatHourDateShort(String(new Date()));
        const response = await api.post(`funnels/${data.stage_id}/cards`, {
          weplanEvent: data.weplanEvent,
          name: data.name,
          card_owner: data.card_owner,
        });
        const name =
          myEmployeeContact && myEmployeeContact.id
            ? `${myEmployeeContact.name} ${myEmployeeContact.family_name}`
            : employee.employeeUser.name;
        const historyNote = `
${name} criou ${data.name}|
Criado em ${selectedFunnel.name} na etapa ${data.stageName}
.
Responsável: ${data.ownerName}
.
A Genialidade está na simplicidade,
.
A Excelência nos detalhes!
.
Boa Sorte!
. . . . .
${now}  -  WePlan
`;
        await createCardHistoryNote(historyNote, response.data.unique_name);
      } catch (err) {
        throw new Error(err);
      }
    },
    [createCardHistoryNote, myEmployeeContact, selectedFunnel, employee],
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
        createCard,
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
        updateCardName,
        getFunnelCardInfos,
        funnelCardInfos,
        getCardCustomers,
        cardCustomers,
        createFunnelCardInfo,
        updateFunnelCardInfo,
        createCardHistoryNote,
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
