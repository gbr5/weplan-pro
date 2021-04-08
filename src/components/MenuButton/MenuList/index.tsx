import React from 'react';
import { MdAdd } from 'react-icons/md';

import { List, Item } from './styles';

interface IProps {
  handleCreateCardWindow: Function;
}

const MenuList: React.FC<IProps> = ({ handleCreateCardWindow }: IProps) => {
  return (
    <List>
      <Item type="button" onClick={() => handleCreateCardWindow('Comercial')}>
        Card Comercial
        <MdAdd size={30} />
      </Item>
      {/* <Item type="button" onClick={() => handleCreateCardWindow('Production')}>
        Card Produção
        <MdAdd size={30} />
      </Item>
      <Item type="button" onClick={() => handleCreateCardWindow('Projects')}>
        Card Projetos
        <MdAdd size={30} />
      </Item>
      <Item type="button" onClick={() => handleCreateCardWindow('Financial')}>
        Card Financeiro
        <MdAdd size={30} />
      </Item> */}
      <Item type="button" onClick={() => handleCreateCardWindow('Comercial')}>
        Card Contato
        <MdAdd size={30} />
      </Item>
    </List>
  );
};

export default MenuList;
