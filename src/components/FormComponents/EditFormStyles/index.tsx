import React, { useCallback, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import IFormDTO from '../../../dtos/IFormDTO';
import { useForm } from '../../../hooks/form';
import Button from '../../Button';
import CustomColorPicker from '../../GeneralComponents/CustomColorPicker';
import WindowContainer from '../../WindowContainer';

import { Container, ButtonExample } from './styles';

interface IProps {
  handleCloseWindow: Function;
  form: IFormDTO;
}

const EditFormStyles: React.FC<IProps> = ({ handleCloseWindow, form }) => {
  const { defaultFormStyles, updateFormStyles } = useForm();
  const [colorPicker, setColorPicker] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(
    (form && form.styles && form.styles.background_color) ||
      defaultFormStyles.background_color,
  );
  const [textColor, setTextColor] = useState(
    (form && form.styles && form.styles.text_color) ||
      defaultFormStyles.text_color,
  );
  const [buttonColor, setButtonColor] = useState(
    (form && form.styles && form.styles.button_color) ||
      defaultFormStyles.button_color,
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    (form && form.styles && form.styles.button_text_color) ||
      defaultFormStyles.button_text_color,
  );
  const handleChangeColor = useCallback(
    (color: string) => {
      selectedComponent === 'background' && setBackgroundColor(color);
      selectedComponent === 'text' && setTextColor(color);
      selectedComponent === 'button' && setButtonColor(color);
      selectedComponent === 'buttonText' && setButtonTextColor(color);
    },
    [selectedComponent],
  );

  const handleOpenColorPicker = useCallback((component: string) => {
    setSelectedComponent(component);
    setColorPicker(true);
  }, []);
  const handleCloseColorPicker = useCallback(() => {
    setSelectedComponent('');
    setColorPicker(false);
  }, []);

  const handleUpdateFormStyles = useCallback(() => {
    if (form && form.styles) {
      updateFormStyles({
        id: form.styles.id,
        form_id: form.id,
        background_color: backgroundColor,
        text_color: textColor,
        button_color: buttonColor,
        button_text_color: buttonTextColor,
      });
      handleCloseWindow();
    }
  }, [
    handleCloseWindow,
    updateFormStyles,
    form,
    backgroundColor,
    textColor,
    buttonColor,
    buttonTextColor,
  ]);

  return (
    <>
      {colorPicker && (
        <CustomColorPicker
          closeWindow={handleCloseColorPicker}
          handleChangeColor={handleChangeColor}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={handleCloseWindow}
        containerStyle={{
          zIndex: 19,
          top: '5%',
          left: '5%',
          height: '90%',
          width: '90%',
        }}
      >
        <Container>
          <section>
            <strong>Cor de fundo</strong>
            <ButtonExample
              color={backgroundColor}
              type="button"
              onClick={() => handleOpenColorPicker('background')}
            >
              <FiEdit />
            </ButtonExample>
          </section>
          <section>
            <strong>Cor de texto</strong>
            <ButtonExample
              color={textColor}
              type="button"
              onClick={() => handleOpenColorPicker('text')}
            >
              <FiEdit />
            </ButtonExample>
          </section>
          <section>
            <strong>Cor de fundo do botão</strong>
            <ButtonExample
              color={buttonColor}
              type="button"
              onClick={() => handleOpenColorPicker('button')}
            >
              <FiEdit />
            </ButtonExample>
          </section>
          <section>
            <strong>Cor de texto do botão</strong>
            <ButtonExample
              color={buttonTextColor}
              type="button"
              onClick={() => handleOpenColorPicker('buttonText')}
            >
              <FiEdit />
            </ButtonExample>
          </section>

          <Button type="button" onClick={handleUpdateFormStyles}>
            Salvar alterações
          </Button>
        </Container>
      </WindowContainer>
    </>
  );
};

export default EditFormStyles;
