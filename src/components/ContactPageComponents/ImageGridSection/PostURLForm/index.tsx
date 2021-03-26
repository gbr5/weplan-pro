import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import WindowContainer from '../../../WindowContainer';

import { Container } from './styles';
import { useContactPage } from '../../../../hooks/contactPages';
import IContactPagePostDTO from '../../../../dtos/IContactPagePostDTO';
import Input from '../../../Input';
import Button from '../../../Button';

interface IProps {
  closeWindow: Function;
  action: string;
}

const PostURLForm: React.FC<IProps> = ({ closeWindow, action }) => {
  const {
    updateContactPagePost,
    currentContactPagePost,
    createContactPagePost,
  } = useContactPage();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (e: IContactPagePostDTO) => {
      if (action === 'create') {
        createContactPagePost(e.destination_url);
      }
      if (action === 'update') {
        updateContactPagePost({
          ...currentContactPagePost,
          destination_url: e.destination_url,
        });
      }
      closeWindow();
    },
    [
      updateContactPagePost,
      createContactPagePost,
      action,
      currentContactPagePost,
      closeWindow,
    ],
  );

  const defaultValue =
    (currentContactPagePost && currentContactPagePost.destination_url) || '';

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <strong>Qual o URL para onde o post levará?</strong>
          <Input
            defaultValue={defaultValue}
            placeholder={defaultValue}
            name="destination_url"
          />
          <Button type="submit">
            {action === 'update' ? 'Salvar' : 'Criar'}
          </Button>
        </Form>
      </Container>
    </WindowContainer>
  );
};

export default PostURLForm;
