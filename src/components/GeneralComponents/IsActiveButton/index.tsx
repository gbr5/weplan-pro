import React from 'react';

import { Container } from './styles';

interface IProps {
  onClickFunction: Function;
  isActive: boolean;
  isActiveLabel: string;
  notActiveLabel: string;
}

const IsActiveButton: React.FC<IProps> = ({
  isActive,
  isActiveLabel,
  notActiveLabel,
  onClickFunction,
}) => {
  return (
    <Container
      type="button"
      onClick={() => onClickFunction()}
      isActive={isActive}
    >
      {isActive ? isActiveLabel : notActiveLabel}
    </Container>
  );
};

export default IsActiveButton;
