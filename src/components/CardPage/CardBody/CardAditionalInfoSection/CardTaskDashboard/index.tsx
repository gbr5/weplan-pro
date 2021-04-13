import React, { useCallback, useEffect, useState } from 'react';
// import { MdAdd } from 'react-icons/md';
// import { FiChevronDown } from 'react-icons/fi';

import { Main } from './styles';
import CardCheckListContainer from './CardCheckListContainer';
import SelectCardCheckListWindow from './SelectCardCheckListWindow';
import CreateCheckListForm from './CreateCheckListForm';
import ICardCheckListDTO from '../../../../../dtos/ICardCheckListDTO';
import { useStageCard } from '../../../../../hooks/stageCard';
import { useCheckList } from '../../../../../hooks/checkList';

const CardTaskDashboard: React.FC = () => {
  const {
    cardCheckLists,
    selectedCard,
    selectedCardCheckList,
    getCardCheckLists,
    selectCardCheckList,
  } = useStageCard();
  const { selectCheckList } = useCheckList();
  const [selectCheckListWindow, setSelectCheckListWindow] = useState(false);
  const [createCheckListForm, setCreateCheckListForm] = useState(false);

  const handleSetSelectedCheckList = useCallback(
    (props: ICardCheckListDTO) => {
      setSelectCheckListWindow(false);
      selectCardCheckList(props);
      selectCheckList(props.check_list);
    },
    [selectCardCheckList, selectCheckList],
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
        {selectedCardCheckList.check_list && (
          <>
            {/* <ContainerMenu> */}
            {/* <button
                type="button"
                onClick={() => setSelectCheckListWindow(true)}
              >
                <p>Selecionar Check List</p>
                <strong>
                  {selectedCardCheckList.check_list.name}
                  <FiChevronDown size={24} />
                </strong>
              </button> */}
            {/* <button
                type="button"
                onClick={() => setCreateCheckListForm(true)}
              >
                <p>Adicionar Tarefa</p>
                <strong>
                  <MdAdd size={30} />
                </strong>
              </button> */}
            {/* </ContainerMenu> */}
            <CardCheckListContainer
              checkList={selectedCardCheckList}
              getCardCheckLists={getCardCheckLists}
            />
          </>
        )}
      </Main>
    </>
  );
};

export default CardTaskDashboard;
