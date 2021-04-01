import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiChevronDown } from 'react-icons/fi';

import { Main, ContainerMenu } from './styles';
import CardCheckListContainer from './CardCheckListContainer';
import SelectCardCheckListWindow from './SelectCardCheckListWindow';
import CreateCheckListForm from './CreateCheckListForm';
import ICardCheckListDTO from '../../../../../dtos/ICardCheckListDTO';
import { useStageCard } from '../../../../../hooks/stageCard';

const CardTaskDashboard: React.FC = () => {
  const {
    cardCheckLists,
    selectedCard,
    selectedCheckList,
    getCardCheckLists,
    selectCheckList,
  } = useStageCard();
  const [selectCheckListWindow, setSelectCheckListWindow] = useState(false);
  const [createCheckListForm, setCreateCheckListForm] = useState(false);

  const handleSetSelectedCheckList = useCallback(
    (props: ICardCheckListDTO) => {
      setSelectCheckListWindow(false);
      selectCheckList(props);
    },
    [selectCheckList],
  );

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
          card={selectedCard}
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
