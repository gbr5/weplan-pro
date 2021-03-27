import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdClose } from 'react-icons/md';
import IContactPageLinkDTO from '../../../../dtos/IContactPageLinkDTO';
import ICreateContactPageLinkDTO from '../../../../dtos/ICreateContactPageLinkDTO';
import { useContactPage } from '../../../../hooks/contactPages';
import Button from '../../../Button';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';
import CustomColorPicker from '../../../GeneralComponents/CustomColorPicker';
import IsActiveButton from '../../../GeneralComponents/IsActiveButton';
import Input from '../../../Input';

import { Container, ButtonExample, Field } from './styles';

interface IProps {
  buttonLink?: IContactPageLinkDTO;
  closeComponent: Function;
}

const CTAButtonForm: React.FC<IProps> = ({ buttonLink, closeComponent }) => {
  const {
    updateContactPageLink,
    createContactPageLink,
    deleteContactPageLink,
  } = useContactPage();
  const formRef = useRef<FormHandles>(null);
  const [deleteButtonConfirmation, setDeleteButtonConfirmation] = useState(
    false,
  );
  const [backgroundColor, setBackgroundColor] = useState(
    (buttonLink && buttonLink.background_color) || '#ff9900',
  );
  const [textColor, setTextColor] = useState(
    (buttonLink && buttonLink.text_color) || '#000111',
  );
  const [selectedComponent, setSelectedComponent] = useState('');
  const [colorPicker, setColorPicker] = useState(false);
  const handleChangeColor = useCallback(
    (color: string) => {
      selectedComponent === 'background' && setBackgroundColor(color);
      selectedComponent === 'text' && setTextColor(color);
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
  const handleDeleteCTA = useCallback(() => {
    buttonLink && deleteContactPageLink(buttonLink.id);
  }, [buttonLink, deleteContactPageLink]);
  const handleDeleteCTAConfirmation = useCallback((e: boolean) => {
    setDeleteButtonConfirmation(e);
  }, []);
  const handleCTA = useCallback(
    (e: ICreateContactPageLinkDTO) => {
      !buttonLink &&
        createContactPageLink({
          background_color: backgroundColor,
          text_color: textColor,
          label: e.label,
          url: e.url,
        });
      buttonLink &&
        updateContactPageLink({
          ...buttonLink,
          background_color: backgroundColor,
          text_color: textColor,
          label: e.label,
          url: e.url,
        });
      closeComponent();
    },
    [
      createContactPageLink,
      closeComponent,
      buttonLink,
      updateContactPageLink,
      textColor,
      backgroundColor,
    ],
  );
  const handleIsActive = useCallback(() => {
    buttonLink &&
      updateContactPageLink({
        ...buttonLink,
        isActive: !buttonLink.isActive,
      });
  }, [buttonLink, updateContactPageLink]);
  const label = (buttonLink && buttonLink.label) || '';
  const url = (buttonLink && buttonLink.url) || '';
  return (
    <>
      {colorPicker && (
        <CustomColorPicker
          closeWindow={handleCloseColorPicker}
          handleChangeColor={handleChangeColor}
        />
      )}
      {deleteButtonConfirmation && (
        <ConfirmationWindow
          message="Deseja deletar o botão?"
          zIndex={20}
          closeWindow={() => handleDeleteCTAConfirmation(false)}
          firstButtonLabel="Deletar"
          firstButtonFunction={() => handleDeleteCTA()}
          secondButtonLabel="Não Deletar"
          secondButtonFunction={() => handleDeleteCTAConfirmation(false)}
        />
      )}
      <Form ref={formRef} onSubmit={handleCTA}>
        <Container>
          <span>
            <button onClick={() => closeComponent()} type="button">
              <MdClose size={24} />
            </button>
          </span>
          <h2>
            {buttonLink ? `Editar CTA ${buttonLink.label}` : 'Criar Botão CTA'}
          </h2>
          {buttonLink && (
            <IsActiveButton
              isActive={buttonLink.isActive}
              isActiveLabel="CTA Ativo"
              notActiveLabel="Ativar CTA"
              onClickFunction={() => handleIsActive()}
            />
          )}
          <Field>
            <strong>Texto do botão</strong>
            <Input defaultValue={label} name="label" />
          </Field>
          <Field>
            <strong>Url de destino</strong>
            <Input defaultValue={url} name="url" />
          </Field>
          {buttonLink && (
            <Field>
              <strong>Posição do botão</strong>
              <Input defaultValue={buttonLink.position} name="position" />
            </Field>
          )}
          <Field>
            <strong>Cor de fundo do botão</strong>
            <ButtonExample
              color="#ccc"
              backgroundColor={backgroundColor}
              type="button"
              onClick={() => handleOpenColorPicker('background')}
            >
              Definir Cor de Fundo
            </ButtonExample>
          </Field>
          <Field>
            <strong>Cor do texto botão</strong>
            <ButtonExample
              color="#ccc"
              backgroundColor={textColor}
              type="button"
              onClick={() => handleOpenColorPicker('text')}
            >
              Definir Cor do Texto
            </ButtonExample>
          </Field>
          <Button type="submit">{buttonLink ? 'Salvar' : 'Criar'}</Button>
          <Button
            style={{
              background: 'red',
            }}
            type="button"
            onClick={() => handleDeleteCTAConfirmation(true)}
          >
            Deletar CTA
          </Button>
        </Container>
      </Form>
    </>
  );
};

export default CTAButtonForm;
