import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IContactPagePostDTO from '../../../dtos/IContactPagePostDTO';
import { useContactPage } from '../../../hooks/contactPages';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import PostURLForm from './PostURLForm';

import { Container, AddImage, Post } from './styles';
import UploadPostImage from './UploadPostImage';

const ImageGridSection: React.FC = () => {
  const {
    currentContactPage,
    currentContactPagePost,
    handleSetCurrentPost,
    deleteContactPagePost,
  } = useContactPage();
  const [uploadImageWindow, setUploadImageWindow] = useState(false);
  const [createPostWindow, setCreatePostWindow] = useState(false);
  const [updatePostWindow, setUpdatePostWindow] = useState(false);
  const [updateChoice, setUpdateChoice] = useState(false);
  const [actionChoice, setActionChoice] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const closeAll = useCallback(() => {
    setUploadImageWindow(false);
    setCreatePostWindow(false);
    setUpdateChoice(false);
    setUpdatePostWindow(false);
    setActionChoice(false);
    setDeleteConfirmation(false);
  }, []);

  const handleActionChoice = useCallback(
    (e: boolean) => {
      closeAll();
      setActionChoice(e);
    },
    [closeAll],
  );

  const handleSelectPost = useCallback(
    (e: IContactPagePostDTO) => {
      closeAll();
      handleSetCurrentPost(e);
      handleActionChoice(true);
    },
    [handleActionChoice, closeAll, handleSetCurrentPost],
  );

  const handleUpdateChoice = useCallback((e: boolean) => {
    setUpdateChoice(e);
  }, []);

  const handleUploadImageWindow = useCallback(
    (e: boolean) => {
      handleUpdateChoice(false);
      setUploadImageWindow(e);
    },
    [handleUpdateChoice],
  );

  const handleUpdatePostWindow = useCallback(
    (e: boolean) => {
      handleUpdateChoice(false);
      setUpdatePostWindow(e);
    },
    [handleUpdateChoice],
  );

  const handleCreatePostWindow = useCallback(
    (e: boolean) => {
      setCreatePostWindow(e);
      e === false && handleUploadImageWindow(true);
    },
    [handleUploadImageWindow],
  );

  const handleDeletePost = useCallback(() => {
    deleteContactPagePost(currentContactPagePost.id);
    closeAll();
  }, [deleteContactPagePost, closeAll, currentContactPagePost]);

  const handleDeletePostConfirmation = useCallback((e: boolean) => {
    setDeleteConfirmation(e);
  }, []);

  return (
    <Container>
      {actionChoice && (
        <ConfirmationWindow
          message="O que deseja fazer?"
          firstButtonFunction={() => handleUpdateChoice(true)}
          firstButtonLabel="Editar Post"
          secondButtonFunction={() => handleDeletePostConfirmation(true)}
          secondButtonLabel="Deletar Post"
          zIndex={15}
          closeWindow={() => handleActionChoice(false)}
        />
      )}
      {deleteConfirmation && (
        <ConfirmationWindow
          message="Deseja realmente deletar o post?"
          firstButtonFunction={() => handleDeletePost()}
          firstButtonLabel="Deletar"
          secondButtonFunction={() => closeAll()}
          secondButtonLabel="Não Deletar"
          zIndex={15}
          closeWindow={() => handleDeletePostConfirmation(false)}
        />
      )}
      {updateChoice && (
        <ConfirmationWindow
          message="O que deseja editar?"
          firstButtonFunction={() => handleUpdatePostWindow(true)}
          firstButtonLabel="Editar o url"
          secondButtonFunction={() => handleUploadImageWindow(true)}
          secondButtonLabel="Editar a imagem"
          zIndex={15}
          closeWindow={() => handleUpdateChoice(false)}
        />
      )}
      {updatePostWindow && (
        <PostURLForm
          action="update"
          closeWindow={() => handleUpdatePostWindow(false)}
        />
      )}
      {createPostWindow && (
        <PostURLForm
          action="create"
          closeWindow={() => handleCreatePostWindow(false)}
        />
      )}
      {uploadImageWindow && (
        <UploadPostImage closeWindow={() => handleUploadImageWindow(false)} />
      )}
      <AddImage onClick={() => handleCreatePostWindow(true)} type="button">
        <MdAdd size={64} />
      </AddImage>
      {currentContactPage.posts &&
        currentContactPage.posts.map(post => {
          return (
            <Post onClick={() => handleSelectPost(post)} key={post.id}>
              <img src={post.main_image_url} alt="WePlan" />
            </Post>
          );
        })}
    </Container>
  );
};

export default ImageGridSection;
