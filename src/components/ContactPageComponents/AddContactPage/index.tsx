import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import ICreateContactPageDTO from '../../../dtos/ICreateContactPageDTO';
import { useContactPage } from '../../../hooks/contactPages';
import Button from '../../Button';
import Input from '../../Input';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
  handleUploadContactPageMainImage: Function;
}

const AddContactPage: React.FC<IProps> = ({
  closeWindow,
  handleUploadContactPageMainImage,
}) => {
  const { createContactPage } = useContactPage();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (e: ICreateContactPageDTO) => {
      createContactPage(e);
      handleUploadContactPageMainImage(e);
      closeWindow();
    },
    [closeWindow, handleUploadContactPageMainImage, createContactPage],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <h2>Nova Página Externa</h2>

          <section>
            <strong>Dê um nome à página externa</strong>
            <Input name="title" />
          </section>
          <section>
            <strong>Insira o texto para o botão principal</strong>
            <Input name="cta_label" />
          </section>
          <section>
            <strong>Insira o url de destino para o botão principal</strong>
            <p>
              Pode ser o seu site, página de um produto, ou até uma landing page
            </p>
            <Input name="cta_url" />
          </section>

          <Button type="submit">Criar</Button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddContactPage;
