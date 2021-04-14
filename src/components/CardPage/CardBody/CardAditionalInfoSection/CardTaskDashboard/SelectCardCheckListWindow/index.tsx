import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useStageCard } from '../../../../../../hooks/stageCard';
import WindowContainer from '../../../../../WindowContainer';

import { List, Item } from './styles';

interface IProps {
  handleSetSelectedCheckList: Function;
  closeWindow: Function;
}

const SelectCardCheckListWindow: React.FC<IProps> = ({
  handleSetSelectedCheckList,
  closeWindow,
}: IProps) => {
  const { cardCheckLists } = useStageCard();
  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 12,
        top: '25%',
        left: '10%',
        height: '50%',
        width: '80%',
      }}
    >
      <List>
        {cardCheckLists.map(cardCheckList => (
          <Item
            key={cardCheckList.id}
            type="button"
            onClick={() => handleSetSelectedCheckList(cardCheckList)}
          >
            {cardCheckList.check_list.name}
            <MdAdd size={30} />
          </Item>
        ))}
      </List>
    </WindowContainer>
  );
};

export default SelectCardCheckListWindow;
