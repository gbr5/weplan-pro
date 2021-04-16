import React, { useCallback, useEffect, useState } from 'react';

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
          <CardCheckListContainer />
        )}
      </Main>
    </>
  );
};

export default CardTaskDashboard;
