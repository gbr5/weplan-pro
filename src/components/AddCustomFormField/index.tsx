import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, ButtonContainer } from './styles';
import Input from '../Input';
import WindowContainer from '../WindowContainer';
import Button from '../Button';
import api from '../../services/api';
import IFormDTO from '../../dtos/IFormDTO';
import { useToast } from '../../hooks/toast';
import ICreateFormFieldDTO from '../../dtos/ICreateFormFieldDTO';

interface IProps {
  handleCloseWindow: Function;
  handleUpdateForm: Function;
  form: IFormDTO;
}

const AddCustomFormField: React.FC<IProps> = ({
  handleCloseWindow,
  handleUpdateForm,
  form,
}) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [isFieldRequired, setIsFieldRequired] = useState(false);

  const handleSubmit = useCallback(
    async (e: ICreateFormFieldDTO) => {
      try {
        setLoading(true);
        await api.post('form-field', {
          form_id: form.id,
          name: e.name,
          position: form.fields.length + 1,
          title: e.title,
          placeholder: e.placeholder,
          type: e.type,
          isRequired: isFieldRequired,
        });
        addToast({
          type: 'success',
          title: 'Formulário criado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      } finally {
        setLoading(false);
        handleUpdateForm();
      }
    },
    [handleUpdateForm, addToast, isFieldRequired, form],
  );

  const handleIsFieldRequired = useCallback((e: boolean) => {
    setIsFieldRequired(e);
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <section>
            <strong>Nome do campo (Nome interno do campo)</strong>
            <Input name="name" mask="slug" />
          </section>
          <section>
            <strong>Título do Campo (Aparece para o usuário)</strong>
            <p>O título irá aparecer no topo da página</p>
            <Input name="title" />
          </section>
          <section>
            <strong>Qual o tipo de campo?</strong>
            <ButtonContainer>
              <button type="button">Texto</button>
              <button type="button">Número</button>
              <button type="button">Data</button>
              <button type="button">Lista</button>
              <button type="button">Múltipla escolha</button>
            </ButtonContainer>
          </section>

          <button
            type="button"
            onClick={() => handleIsFieldRequired(!isFieldRequired)}
          >
            Ativo
          </button>

          <Button loading={loading} type="submit">
            Criar formulário
          </Button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default AddCustomFormField;
