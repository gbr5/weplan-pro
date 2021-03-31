import React, { ChangeEvent, useCallback } from 'react';
import { FiCamera } from 'react-icons/fi';
import WindowContainer from '../../WindowContainer';
import avatar from '../../../assets/avatar_placeholder.jpg';

import { Container, AvatarInput } from './styles';
import { useContactPage } from '../../../hooks/contactPages';
import Button from '../../Button';

interface IProps {
  closeWindow: Function;
}

const UpdatePageImage: React.FC<IProps> = ({ closeWindow }) => {
  const {
    currentContactPage,
    updateContactPageMainImage,
    uploadProgress,
  } = useContactPage();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      try {
        updateContactPageMainImage(e);
      } catch (err) {
        throw new Error(err);
      } finally {
        // closeWindow();
      }
    },
    [updateContactPageMainImage],
  );

  const showAvatar = currentContactPage.main_image_url || avatar;

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 22,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <strong>Faça o upload da imagem principal da página</strong>
        <AvatarInput>
          <img src={showAvatar} alt="Page" />
          <label htmlFor="image_url">
            <FiCamera />
            <input type="file" id="image_url" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>
        <p>Progresso: {uploadProgress}%</p>

        {uploadProgress === 100 && (
          <Button type="button" onClick={() => closeWindow()}>
            Fechar Janela
          </Button>
        )}
      </Container>
    </WindowContainer>
  );
};

export default UpdatePageImage;
