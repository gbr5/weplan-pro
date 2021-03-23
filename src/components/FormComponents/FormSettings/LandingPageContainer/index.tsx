import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import IFormLandingPageDTO from '../../../../dtos/IFormLandingPageDTO';
import { useForm } from '../../../../hooks/form';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, SubContainer, BooleanButton } from './styles';

const LandingPageContainer: React.FC = () => {
  const {
    currentForm,
    createFormLandingPage,
    updateFormLandingPage,
  } = useForm();
  const formRef = useRef<FormHandles>(null);
  const [editLandingPage, setEditLandingPage] = useState(false);
  const [isLandingPageActive, setIsLandingPageActive] = useState(false);
  const [url, setUrl] = useState('');
  const [landingPageId, setLandingPageId] = useState('');

  useEffect(() => {
    if (
      currentForm &&
      currentForm.landingPage &&
      currentForm.landingPage.isActive
    ) {
      setIsLandingPageActive(currentForm.landingPage.isActive);
    } else {
      setIsLandingPageActive(false);
    }
  }, [currentForm, currentForm.landingPage]);

  useEffect(() => {
    if (currentForm && currentForm.landingPage && currentForm.landingPage.id) {
      setUrl(currentForm.landingPage.url);
      setLandingPageId(currentForm.landingPage.id);
    }
  }, [currentForm, currentForm.landingPage]);

  const handleEditLandingPageField = useCallback((e: boolean) => {
    setEditLandingPage(e);
  }, []);

  const handleIsLandingPageActive = useCallback(
    (e: boolean) => {
      if (landingPageId !== '') {
        updateFormLandingPage({
          ...currentForm.landingPage,
          isActive: e,
        });
        setIsLandingPageActive(e);
      }
    },
    [currentForm, updateFormLandingPage, landingPageId],
  );

  const handleSubmit = useCallback(
    (e: IFormLandingPageDTO) => {
      if (currentForm) {
        if (currentForm.landingPage && currentForm.landingPage.id) {
          updateFormLandingPage({
            id: currentForm.landingPage.id,
            form_id: currentForm.id,
            url: e.url,
            isActive: isLandingPageActive,
          });
        } else {
          createFormLandingPage({
            form_id: currentForm.id,
            isActive: isLandingPageActive,
            url: e.url,
          });
        }
        setEditLandingPage(false);
      }
    },
    [
      currentForm,
      createFormLandingPage,
      updateFormLandingPage,
      isLandingPageActive,
    ],
  );

  return (
    <Container>
      <h2>Landing Page</h2>
      <p>
        A landing page é uma página externa, para onde o usuário será
        encaminhado após concluir o preenchimento do formulário.
      </p>
      <SubContainer>
        {editLandingPage ? (
          <>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="url" defaultValue={url} placeholder={url} />
              <Button type="submit">Salvar</Button>
            </Form>
            <Button
              type="button"
              onClick={() => handleEditLandingPageField(false)}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <h3>
              {currentForm &&
                currentForm.landingPage &&
                currentForm.landingPage.url}
            </h3>
            <Button
              type="button"
              onClick={() => handleEditLandingPageField(true)}
            >
              {landingPageId !== '' && url !== '' ? 'Editar' : 'Criar'}
            </Button>
          </>
        )}

        <BooleanButton
          onClick={() => handleIsLandingPageActive(!isLandingPageActive)}
          isActive={isLandingPageActive}
        >
          {isLandingPageActive ? 'Ativo' : 'Inativo'}
        </BooleanButton>
      </SubContainer>
    </Container>
  );
};

export default LandingPageContainer;
