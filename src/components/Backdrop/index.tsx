import React from 'react';

import { Container } from './styles';

interface IProps {
  handleCloseWindow: Function;
}

const Backdrop: React.FC<IProps> = ({ handleCloseWindow }: IProps) => {
  return <Container onClick={() => handleCloseWindow()} />;
};

export default Backdrop;
