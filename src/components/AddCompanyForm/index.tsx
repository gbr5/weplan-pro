import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container } from './styles';
import Input from '../Input';
import ICreateFormDTO from '../../dtos/ICreateFormDTO';
import WindowContainer from '../WindowContainer';
import Button from '../Button';
import { textToSlug } from '../../utils/textToSlug';
import { useForm } from '../../hooks/form';

interface IProps {
  handleCloseWindow: Function;
  handleFormPage: Function;
}

const AddCompanyForm: React.FC<IProps> = ({
  handleCloseWindow,
  handleFormPage,
}) => {
  const { createForm } = useForm();
  const formRef = useRef<FormHandles>(null);
  const [isFormActive, setIsFormActive] = useState(false);

  const handleSubmitForm = useCallback(
    (e: ICreateFormDTO) => {
      createForm({
        slug: textToSlug(e.title),
        name: e.name,
        title: e.title,
        message: e.message,
        isActive: isFormActive,
      });
      handleCloseWindow();
      handleFormPage();
    },
    [isFormActive, createForm, handleFormPage, handleCloseWindow],
  );

  const handleIsFormActive = useCallback((e: boolean) => {
    setIsFormActive(e);
  }, []);

  return (
    <WindowContainer
      onHandleCloseWindow={handleCloseWindow}
      containerStyle={{
        aIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Container>
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
    </WindowContainer>
  );
};

export default AddCompanyForm;
