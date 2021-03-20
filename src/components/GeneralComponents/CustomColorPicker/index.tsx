import React, { useCallback, useState } from 'react';

import { Color, SketchPicker, ColorResult } from 'react-color';
import Button from '../../Button';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  handleChangeColor: Function;
  closeWindow: Function;
}

const CustomColorPicker: React.FC<IProps> = ({
  handleChangeColor,
  closeWindow,
}) => {
  const [color, setColor] = useState<Color>('#000');

  const handleColorChange = useCallback((newColor: Color) => {
    setColor(newColor);
  }, []);
  const selectColor = useCallback(() => {
    handleChangeColor(color);
    closeWindow();
  }, [handleChangeColor, closeWindow, color]);
  return (
    <WindowContainer
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
      onHandleCloseWindow={() => closeWindow()}
    >
      <Container>
        <SketchPicker
          color={color}
          onChange={(e: ColorResult) => handleColorChange(e.hex)}
        />

        <Button type="button" onClick={selectColor}>
          Selecionar
        </Button>
      </Container>
    </WindowContainer>
  );
};

export default CustomColorPicker;
