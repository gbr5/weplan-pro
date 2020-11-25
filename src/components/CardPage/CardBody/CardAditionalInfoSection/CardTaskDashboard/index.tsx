import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';
import api from '../../../../../services/api';

import { Main, ContainerMenu } from './styles';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import CardCheckListContainer from './CardCheckListContainer';
import SelectCardCheckListWindow from './SelectCardCheckListWindow';
import CreateCheckListForm from './CreateCheckListForm';
import ICardCheckListDTO from '../../../../../dtos/ICardCheckListDTO';

interface IProps {
  card: IStageCardDTO;
}

const CardTaskDashboard: React.FC<IProps> = ({ card }: IProps) => {
  const [selectCheckListWindow, setSelectCheckListWindow] = useState(false);
  const [createCheckListForm, setCreateCheckListForm] = useState(false);
  const [selectedCheckList, setSelectedCheckList] = useState<ICardCheckListDTO>(
    {} as ICardCheckListDTO,
  );
  const [cardCheckLists, setCardCheckLists] = useState<ICardCheckListDTO[]>([]);

  const getCardCheckLists = useCallback(() => {
    try {
      api
        .get<ICardCheckListDTO[]>(`card/check-lists/${card.id}`)
        .then(response => {
          setCardCheckLists(response.data);
          const mainCheckList = response.data.find(
            mainCL => mainCL.card_id === card.id,
          );
          mainCheckList && setSelectedCheckList(mainCheckList);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  const handleSetSelectedCheckList = useCallback((props: ICardCheckListDTO) => {
    setSelectCheckListWindow(false);
    setSelectedCheckList(props);
  }, []);

  const handleCloseCheckListForm = useCallback(() => {
    setCreateCheckListForm(false);
  }, []);

  useEffect(() => {
    getCardCheckLists();
  }, [getCardCheckLists]);

  return (
    <>
      {selectCheckListWindow && (
        <SelectCardCheckListWindow
          onHandleCloseWindow={() => setSelectCheckListWindow(false)}
          cardCheckLists={cardCheckLists}
          handleSetSelectedCheckList={handleSetSelectedCheckList}
        />
      )}
      {createCheckListForm && (
        <CreateCheckListForm
          onHandleCloseWindow={() => setCreateCheckListForm(false)}
          handleCloseWindow={handleCloseCheckListForm}
          getCardCheckList={getCardCheckLists}
          card={card}
        />
      )}
      <Main>
        {selectedCheckList.check_list && (
          <>
            <ContainerMenu>
              <button
                type="button"
                onClick={() => setSelectCheckListWindow(true)}
              >
                <p>Selecionar Check List</p>
                <strong>
                  {selectedCheckList.check_list.name}
                  <FiChevronDown size={24} />
                </strong>
              </button>
              <button
                type="button"
                onClick={() => setCreateCheckListForm(true)}
              >
                <p>Adicionar Check List</p>
                <strong>
                  <MdAdd size={30} />
                </strong>
              </button>
            </ContainerMenu>
            <CardCheckListContainer
              checkList={selectedCheckList}
              getCardCheckLists={getCardCheckLists}
            />
          </>
        )}
      </Main>
    </>
  );
};

export default CardTaskDashboard;
