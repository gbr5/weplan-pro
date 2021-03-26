import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ICreateContactPageSEODTO from '../../../../dtos/ICreateContactPageSEODTO';
import { useAuth } from '../../../../hooks/auth';
import { useContactPage } from '../../../../hooks/contactPages';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, FormContainer, SEOContainer } from './styles';

const SEOSection: React.FC = () => {
  const { company } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const {
    currentContactPage,
    createContactPageSEO,
    updateContactPageSEO,
    deleteContactPageSEO,
  } = useContactPage();
  const [editSEO, setEditSEO] = useState(false);

  const handleEditSEOWindow = useCallback((e: boolean) => {
    setEditSEO(e);
  }, []);

  const handleCreateSEO = useCallback(
    (e: ICreateContactPageSEODTO) => {
      createContactPageSEO({
        contact_page_id: currentContactPage.id,
        description: e.description,
        title: e.title,
      });
    },
    [currentContactPage, createContactPageSEO],
  );

  const handleUpdateSEO = useCallback(
    (e: ICreateContactPageSEODTO) => {
      updateContactPageSEO({
        ...currentContactPage.seo,
        description: e.description,
        title: e.title,
      });
    },
    [currentContactPage, updateContactPageSEO],
  );

  const handleDeleteSEO = useCallback(() => {
    deleteContactPageSEO(currentContactPage.seo.id);
  }, [currentContactPage, deleteContactPageSEO]);

  return (
    <Container>
      {currentContactPage && currentContactPage.seo && editSEO && (
        <Form onSubmit={handleUpdateSEO} ref={formRef}>
          <FormContainer>
            <span>
              <button type="button" onClick={() => handleEditSEOWindow(false)}>
                <MdEdit size={24} />
              </button>
            </span>
            <section>
              <strong>Dê o melhor título de até 60 caractéres</strong>
              <p>
                Este título aparece na aba superior da página, e no topo de um
                resultado do Google
              </p>
              <Input defaultValue={currentContactPage.seo.title} name="title" />
            </section>
            <section>
              <strong>Agora a melhor descrição de até 130 caractéres</strong>
              <p>
                Assim como o título, a descição também aparece no snippet,
                resultado do Google, porém abaixo do título.
              </p>
              <Input
                defaultValue={currentContactPage.seo.description}
                name="description"
              />
            </section>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleDeleteSEO}>
              Deletar SEO
            </Button>
          </FormContainer>
        </Form>
      )}
      {currentContactPage && currentContactPage.seo && !editSEO && (
        <SEOContainer>
          <span>
            <button type="button" onClick={() => handleEditSEOWindow(true)}>
              <MdEdit size={24} />
            </button>
          </span>
          <section>
            <strong>Imagem</strong>
            <img
              src={currentContactPage.seo.main_image_url}
              alt={currentContactPage.seo.title}
            />
          </section>
          <section>
            <strong>Título</strong>
            <p>{currentContactPage.seo.title}</p>
          </section>
          <section>
            <strong>Descrição</strong>
            <p>{currentContactPage.seo.title}</p>
          </section>
          <section>
            <strong>Título</strong>
            <p>{currentContactPage.seo.title}</p>
          </section>
        </SEOContainer>
      )}
      {currentContactPage && !currentContactPage.seo && (
        <Form onSubmit={handleCreateSEO} ref={formRef}>
          <FormContainer>
            <h3>Esta página ainda NÃO está otimizada para o Google!</h3>
            <section>
              <strong>Dê o melhor título de até 60 caractéres</strong>
              <p>
                Este título aparece na aba superior da página, e no topo de um
                resultado do Google
              </p>
              <Input
                defaultValue={`${currentContactPage.title} | ${company.name}`}
                placeholder={`${currentContactPage.title} | ${company.name}`}
                name="title"
              />
            </section>
            <section>
              <strong>Agora a melhor descrição de até 130 caractéres</strong>
              <p>
                Assim como o título, a descição também aparece no snippet,
                resultado do Google, porém abaixo do título.
              </p>
              <Input name="description" />
            </section>
            <Button type="submit">Criar</Button>
          </FormContainer>
        </Form>
      )}
    </Container>
  );
};

export default SEOSection;