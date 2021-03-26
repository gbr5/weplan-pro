import React, { ChangeEvent, useCallback } from 'react';
import { FiCamera } from 'react-icons/fi';
import WindowContainer from '../../WindowContainer';
import avatar from '../../../assets/avatar_placeholder.jpg';

import { Container, AvatarInput } from './styles';
import { useContactPage } from '../../../hooks/contactPages';

interface IProps {
  closeWindow: Function;
}

const UpdatePageImage: React.FC<IProps> = ({ closeWindow }) => {
  const { currentContactPage, updateContactPageMainImage } = useContactPage();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateContactPageMainImage(e);
      closeWindow();
    },
    [updateContactPageMainImage, closeWindow],
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
          <img src={showAvatar} alt="Page Avatar" />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>
      </Container>
    </WindowContainer>
  );
};

export default UpdatePageImage;
