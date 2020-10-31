import React from 'react';
import { MdMenu } from 'react-icons/md';

import { Button } from './styles';

const MenuButton: React.FC = () => {
  return (
    <Button type="button">
      <MdMenu size={24} />
    </Button>
  );
};

export default MenuButton;
