import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
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

  const iconsize = 24;

  const [colorPicker, setColorPicker] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [defaultColor, setDefaultColor] = useState('');
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

  const handleOpenColorPicker = useCallback(
    (component: string) => {
      setSelectedComponent(component);
      component === 'background' && setDefaultColor(backgroundColor);
      component === 'text' && setDefaultColor(textColor);
      component === 'button' && setDefaultColor(buttonColor);
      component === 'buttonText' && setDefaultColor(buttonTextColor);
      setColorPicker(true);
    },
    [buttonTextColor, buttonColor, backgroundColor, textColor],
  );
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
          defaultColor={defaultColor}
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
          <h2>Estilização do Formulário</h2>
          <section>
            <strong>Fundo do Formulário</strong>
            <ButtonExample
              color={backgroundColor}
              type="button"
              onClick={() => handleOpenColorPicker('background')}
            >
              <MdEdit size={iconsize} />
              <p>{backgroundColor}</p>
            </ButtonExample>
          </section>
          <section>
            <strong>Texto</strong>
            <ButtonExample
              color={textColor}
              type="button"
              onClick={() => handleOpenColorPicker('text')}
            >
              <MdEdit size={iconsize} />
              <p>{textColor}</p>
            </ButtonExample>
          </section>
          <section>
            <strong>Fundo do Botão</strong>
            <ButtonExample
              color={buttonColor}
              type="button"
              onClick={() => handleOpenColorPicker('button')}
            >
              <MdEdit size={iconsize} />
              <p>{buttonColor}</p>
            </ButtonExample>
          </section>
          <section>
            <strong>Texto do Botão</strong>
            <ButtonExample
              color={buttonTextColor}
              type="button"
              onClick={() => handleOpenColorPicker('buttonText')}
            >
              <MdEdit size={iconsize} />
              <p>{buttonTextColor}</p>
            </ButtonExample>
          </section>

          <Button
            style={{ height: '3rem' }}
            type="button"
            onClick={handleUpdateFormStyles}
          >
            Salvar alterações
          </Button>
        </Container>
      </WindowContainer>
    </>
  );
};

export default EditFormStyles;
