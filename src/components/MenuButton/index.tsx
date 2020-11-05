import React, { useCallback, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import MenuList from './MenuList';

import { Button } from './styles';

const MenuButton: React.FC = () => {
  const [menuList, setMenuList] = useState(false);

  const handleMenuList = useCallback(() => {
    setMenuList(!menuList);
  }, [menuList]);
  return (
    <>
      <Button type="button" onClick={handleMenuList}>
        <MdMenu size={24} />
      </Button>
      {!!menuList && <MenuList />}
    </>
  );
};

export default MenuButton;
