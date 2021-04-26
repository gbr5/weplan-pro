import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ICreateContactPageSEODTO from '../../../../dtos/ICreateContactPageSEODTO';
import { useContactPage } from '../../../../hooks/contactPages';
import { useEmployeeAuth } from '../../../../hooks/employeeAuth';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, FormContainer, SEOContainer } from './styles';

const SEOSection: React.FC = () => {
  const { employee } = useEmployeeAuth();
  const formRef = useRef<FormHandles>(null);
  const {
    currentContactPage,
    createContactPageSEO,
    updateContactPageSEO,
    deleteContactPageSEO,
  } = useContactPage();

  const [editSEO, setEditSEO] = useState(false);
  const [titleLength, setTitleLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);

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
      setEditSEO(false);
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
      setEditSEO(false);
    },
    [currentContactPage, updateContactPageSEO],
  );

  const handleDeleteSEO = useCallback(() => {
    deleteContactPageSEO(currentContactPage.seo.id);
  }, [currentContactPage, deleteContactPageSEO]);

  const handleTitleLength = useCallback((e: string) => {
    setTitleLength(e.length);
  }, []);
  const handleDescriptionLength = useCallback((e: string) => {
    setDescriptionLength(e.length);
  }, []);

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
              <Input
                onChange={e => handleTitleLength(e.currentTarget.value)}
                defaultValue={currentContactPage.seo.title}
                name="title"
              />
              <strong>{titleLength} caractéres</strong>
            </section>
            <section>
              <strong>Agora a melhor descrição de até 130 caractéres</strong>
              <p>
                Assim como o título, a descição também aparece no snippet,
                resultado do Google, porém abaixo do título.
              </p>
              <Input
                onChange={e => handleDescriptionLength(e.currentTarget.value)}
                defaultValue={currentContactPage.seo.description}
                name="description"
              />
              <strong>{descriptionLength} caractéres</strong>
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
            <p>{currentContactPage.seo.description}</p>
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
                onChange={e => handleTitleLength(e.currentTarget.value)}
                defaultValue={`${currentContactPage.title} - ${employee.company.name}`}
                placeholder={`${currentContactPage.title} - ${employee.company.name}`}
                name="title"
              />
              <strong>{titleLength} caractéres</strong>
            </section>
            <section>
              <strong>Agora a melhor descrição de até 130 caractéres</strong>
              <p>
                Assim como o título, a descição também aparece no snippet,
                resultado do Google, porém abaixo do título.
              </p>
              <Input
                onChange={e => handleDescriptionLength(e.currentTarget.value)}
                name="description"
              />
              <strong>{descriptionLength} caractéres</strong>
            </section>
            <Button type="submit">Criar</Button>
          </FormContainer>
        </Form>
      )}
    </Container>
  );
};

export default SEOSection;
