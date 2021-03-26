import React, { ChangeEvent, useCallback } from 'react';
import { FiCamera } from 'react-icons/fi';
import WindowContainer from '../../../WindowContainer';
import avatar from '../../../../assets/avatar_placeholder.jpg';

import { Container, AvatarInput } from './styles';
import { useContactPage } from '../../../../hooks/contactPages';

interface IProps {
  closeWindow: Function;
}

const UploadPostImage: React.FC<IProps> = ({ closeWindow }) => {
  const { patchContactPageImagePost } = useContactPage();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      patchContactPageImagePost(e);
      closeWindow();
    },
    [closeWindow, patchContactPageImagePost],
  );

  const showAvatar = avatar;

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
        <AvatarInput>
          <img src={showAvatar} alt="Page Avatar" />
          <label htmlFor="image_url">
            <FiCamera />
            <input type="file" id="image_url" onChange={handleAvatarChange} />
          </label>
        </AvatarInput>
      </Container>
    </WindowContainer>
  );
};

export default UploadPostImage;
