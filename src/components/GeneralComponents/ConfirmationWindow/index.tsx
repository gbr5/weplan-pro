import React from 'react';
import Button from '../../Button';
import WindowContainer from '../../WindowContainer';

import { Container, SubContainer, ButtonContainer } from './styles';

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
        top: '25%',
        left: '5%',
        height: '50%',
        width: '90%',
      }}
    >
      <Container>
        <SubContainer>
          <strong>{message}</strong>

          <ButtonContainer>
            <Button type="button" onClick={() => firstButtonFunction()}>
              {firstButtonLabel}
            </Button>
            <Button type="button" onClick={() => secondButtonFunction()}>
              {secondButtonLabel}
            </Button>
          </ButtonContainer>
        </SubContainer>
      </Container>
    </WindowContainer>
  );
};

export default ConfirmationWindow;
