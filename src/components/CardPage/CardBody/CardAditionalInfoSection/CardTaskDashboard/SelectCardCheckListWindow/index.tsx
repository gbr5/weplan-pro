import React, { MouseEventHandler } from 'react';
import { MdAdd } from 'react-icons/md';
import WindowContainer from '../../../../../WindowContainer';

import { List, Item } from './styles';

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
  // eslint-disable-next-line react/require-default-props
  cardCheckLists: ICardCheckList[];
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
