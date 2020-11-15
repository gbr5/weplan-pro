import React, { useCallback, useEffect, useState } from 'react';
import api from '../../../../../services/api';

import { Main } from './styles';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import CardCheckListContainer from './CardCheckListContainer';

interface ITasks {
  id: string;
  check_list_id: string;
  task: string;
  color: string;
  isActive: boolean;
  priority: string;
  status: string;
  due_date: string;
  created_at: Date;
  updated_at: Date;
}

interface ICheckList {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  priority: string;
  due_date: string;
  tasks: ITasks[];
}

interface ICardCheckList {
  id: string;
  card_id: string;
  check_list_id: string;
  card_unique_name: string;
  created_at: Date;
  updated_at: Date;
  check_list: ICheckList;
}

interface IProps {
  card: IStageCardDTO;
}

const CardTaskDashboard: React.FC<IProps> = ({ card }: IProps) => {
  const [cardCheckLists, setCardCheckLists] = useState<ICardCheckList[]>([]);

  const getCardCheckLists = useCallback(() => {
    try {
      api
        .get<ICardCheckList[]>(`card/check-lists/${card.id}`)
        .then(response => {
          setCardCheckLists(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  useEffect(() => {
    getCardCheckLists();
  }, [getCardCheckLists]);

  return (
    <Main>
      {cardCheckLists.map(cardCheckList => (
        <CardCheckListContainer
          checkList={cardCheckList.check_list}
          getCardCheckLists={getCardCheckLists}
        />
      ))}
    </Main>
  );
};

export default CardTaskDashboard;
