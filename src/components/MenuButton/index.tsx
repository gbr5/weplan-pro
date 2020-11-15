import React, { useCallback, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import MenuList from './MenuList';

import { Button } from './styles';

interface IProps {
  handleSetCurrentFunnel: Function;
}

const MenuButton: React.FC<IProps> = ({ handleSetCurrentFunnel }: IProps) => {
  const [menuList, setMenuList] = useState(false);

  const handleMenuList = useCallback(() => {
    setMenuList(!menuList);
  }, [menuList]);
  return (
    <>
      <Button type="button" onClick={handleMenuList}>
        <MdMenu size={24} />
      </Button>
      {!!menuList && (
        <MenuList handleSetCurrentFunnel={handleSetCurrentFunnel} />
      )}
    </>
  );
};

export default MenuButton;
