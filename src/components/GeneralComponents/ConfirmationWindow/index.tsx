import React from 'react';
import Button from '../../Button';
import WindowContainer from '../../WindowContainer';

import { Container, ButtonContainer } from './styles';

interface IProps {
  message: string;
  firstButtonFunction: Function;
  firstButtonLabel: string;
  secondButtonFunction: Function;
  secondButtonLabel: string;
  closeWindow: Function;
  zIndex: number;
}

const ConfirmationWindow: React.FC<IProps> = ({
  message,
  firstButtonFunction,
  firstButtonLabel,
  secondButtonFunction,
  secondButtonLabel,
  closeWindow,
  zIndex,
}) => {
  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <strong>{message}</strong>

        <ButtonContainer>
          <Button type="button" onClick={() => firstButtonFunction()}>
            {firstButtonLabel}
          </Button>
          <Button type="button" onClick={() => secondButtonFunction()}>
            {secondButtonLabel}
          </Button>
        </ButtonContainer>
      </Container>
    </WindowContainer>
  );
};

export default ConfirmationWindow;
