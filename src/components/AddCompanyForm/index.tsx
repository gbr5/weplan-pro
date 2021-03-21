import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container } from './styles';
import Input from '../Input';
import ICreateFormDTO from '../../dtos/ICreateFormDTO';
import Button from '../Button';
import { textToSlug } from '../../utils/textToSlug';
import { useForm } from '../../hooks/form';
import WindowFormContainer from '../FormComponents/WindowFormContainer';

interface IProps {
  handleCloseWindow: Function;
}

const AddCompanyForm: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { createForm, handleSetCurrentForm } = useForm();
  const formRef = useRef<FormHandles>(null);
  const [isFormActive, setIsFormActive] = useState(false);

  const handleSubmitForm = useCallback(
    (e: ICreateFormDTO) => {
      try {
        createForm({
          slug: textToSlug(e.name),
          name: e.name,
          title: e.title,
          message: e.message,
          isActive: isFormActive,
        }).then(response => {
          handleSetCurrentForm(response);
          handleCloseWindow();
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [isFormActive, createForm, handleCloseWindow, handleSetCurrentForm],
  );

  const handleIsFormActive = useCallback((e: boolean) => {
    setIsFormActive(e);
  }, []);

  return (
    <WindowFormContainer onHandleCloseWindow={handleCloseWindow}>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Container>
          <h2>Novo Formulário</h2>
          <section>
            <strong>Dê um nome ao formulário</strong>
            <Input name="name" />
          </section>
          <section>
            <strong>Insira o título da página</strong>
            <p>O título irá aparecer no topo da página</p>
            <Input name="title" />
          </section>
          <section>
            <strong>Deixe uma breve descrição sobre a página</strong>
            <Input name="message" />
          </section>
          <span>
            <strong>Ative o formulário para utilizá-lo</strong>
            <button
              type="button"
              onClick={() => handleIsFormActive(!isFormActive)}
            >
              {isFormActive ? 'Ativo' : 'Inativo'}
            </button>
          </span>

          <Button type="submit">Criar formulário</Button>
        </Container>
      </Form>
    </WindowFormContainer>
  );
};

export default AddCompanyForm;
