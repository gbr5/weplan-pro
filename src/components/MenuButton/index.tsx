import React, { useCallback, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import MenuList from './MenuList';
import AddCardForm from '../AddCardForm';

import { Button } from './styles';
import Backdrop from '../Backdrop';

const MenuButton: React.FC = () => {
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
        <MdMenu size={32} />
      </Button>
      {!!menuList && (
        <>
          <MenuList handleCreateCardWindow={handleCreateCardWindow} />
          <Backdrop handleCloseWindow={handleMenuList} />
        </>
      )}
      {!!createCardWindow && (
        <AddCardForm
          chosenFunnel={moduleName}
          closeWindow={() => setCreateCardWindow(false)}
        />
      )}
    </>
  );
};

export default MenuButton;
