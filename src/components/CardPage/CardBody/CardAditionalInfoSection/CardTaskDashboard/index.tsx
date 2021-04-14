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
  const { selectCardCheckList, getCardCheckLists } = useStageCard();
  const { selectCheckList, selectedCheckList } = useCheckList();
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

  const handleCloseCheckListWindow = useCallback(() => {
    setSelectCheckListWindow(false);
  }, []);

  const handleCloseCheckListForm = useCallback(() => {
    setCreateCheckListForm(false);
  }, []);

  useEffect(() => {
    getCardCheckLists();
  }, [getCardCheckLists]);

  // useEffect(() => {
  //   if (selectedCardCheckList && selectedCardCheckList.id) {
  //     selectCheckList(selectedCardCheckList.check_list);
  //   }
  // }, [selectedCardCheckList, selectCheckList]);

  return (
    <>
      {selectCheckListWindow && (
        <SelectCardCheckListWindow
          closeWindow={() => handleCloseCheckListWindow()}
          handleSetSelectedCheckList={handleSetSelectedCheckList}
        />
      )}
      {createCheckListForm && (
        <CreateCheckListForm closeWindow={handleCloseCheckListForm} />
      )}
      <Main>
        {selectedCheckList && selectedCheckList.id && (
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
            <CardCheckListContainer />
          </>
        )}
      </Main>
    </>
  );
};

export default CardTaskDashboard;
