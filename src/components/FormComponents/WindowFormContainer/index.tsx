import React, { HTMLAttributes, useCallback, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Backdrop from '../../Backdrop';

import { Container } from './styles';

interface WindowContainerProps extends HTMLAttributes<HTMLDivElement> {
  containerStyle?: object;
  onHandleCloseWindow: Function;
}

const WindowFormContainer: React.FC<WindowContainerProps> = props => {
  const { containerStyle = {}, onHandleCloseWindow, children } = props;
  const [backdrop, setBackdrop] = useState(true);

  const closeAll = useCallback(() => {
    setBackdrop(false);
    onHandleCloseWindow();
  }, [onHandleCloseWindow]);
  return (
    <>
      {backdrop && <Backdrop handleCloseWindow={closeAll} />}
      <Container style={containerStyle}>
        <header>
          <button type="button" onClick={() => closeAll()}>
            <MdClose size={40} />
          </button>
        </header>
        {children}
      </Container>
    </>
  );
};

export default WindowFormContainer;
