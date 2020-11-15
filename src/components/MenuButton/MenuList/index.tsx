import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddCardForm from '../../AddCardForm';

import { List, Item } from './styles';

interface IProps {
  handleSetCurrentFunnel: Function;
}

const MenuList: React.FC<IProps> = ({ handleSetCurrentFunnel }: IProps) => {
  const [moduleName, setModuleName] = useState('');
  const [createCardWindow, setCreateCardWindow] = useState(false);
  const handleCreateCard = useCallback(props => {
    setModuleName(props);
    setCreateCardWindow(true);
  }, []);
  return (
    <>
      <List>
        <Item type="button" onClick={() => handleCreateCard('Comercial')}>
          Card Comercial
          <MdAdd size={30} />
        </Item>
        <Item type="button" onClick={() => handleCreateCard('Operations')}>
          Card Operações
          <MdAdd size={30} />
        </Item>
        <Item type="button" onClick={() => handleCreateCard('Projects')}>
          Card Projetos
          <MdAdd size={30} />
        </Item>
        <Item type="button" onClick={() => handleCreateCard('Financial')}>
          Card Financeiro
          <MdAdd size={30} />
        </Item>
        <Item type="button" onClick={() => handleCreateCard('Comercial')}>
          Card Contato
          <MdAdd size={30} />
        </Item>
      </List>
      {!!createCardWindow && (
        <AddCardForm
          handleSetCurrentFunnel={handleSetCurrentFunnel}
          chosenFunnel={moduleName}
          onHandleCloseWindow={() => setCreateCardWindow(false)}
          handleCloseWindow={() => setCreateCardWindow(false)}
        />
      )}
    </>
  );
};

export default MenuList;