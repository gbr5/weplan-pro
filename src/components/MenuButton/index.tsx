import React, { useCallback, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import MenuList from './MenuList';
import AddCardForm from '../AddCardForm';

import { Button } from './styles';

interface IProps {
  handleSetCurrentFunnel: Function;
}

const MenuButton: React.FC<IProps> = ({ handleSetCurrentFunnel }: IProps) => {
  const [menuList, setMenuList] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [createCardWindow, setCreateCardWindow] = useState(false);

  const handleMenuList = useCallback(() => {
    setMenuList(!menuList);
  }, [menuList]);

  const handleCreateCardWindow = useCallback(props => {
    setModuleName(props);
    setCreateCardWindow(true);
    setMenuList(false);
  }, []);

  return (
    <>
      <Button type="button" onClick={handleMenuList}>
        <MdMenu size={24} />
      </Button>
      {!!menuList && (
        <MenuList handleCreateCardWindow={handleCreateCardWindow} />
      )}
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

export default MenuButton;
