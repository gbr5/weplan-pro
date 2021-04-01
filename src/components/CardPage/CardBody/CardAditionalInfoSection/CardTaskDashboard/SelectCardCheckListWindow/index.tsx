import React, { MouseEventHandler } from 'react';
import { MdAdd } from 'react-icons/md';
import ICardCheckListDTO from '../../../../../../dtos/ICardCheckListDTO';
import WindowContainer from '../../../../../WindowContainer';

import { List, Item } from './styles';

interface IProps {
  cardCheckLists: ICardCheckListDTO[];
  handleSetSelectedCheckList: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const SelectCardCheckListWindow: React.FC<IProps> = ({
  cardCheckLists,
  handleSetSelectedCheckList,
  onHandleCloseWindow,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
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
