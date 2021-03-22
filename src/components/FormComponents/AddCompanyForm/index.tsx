import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container } from './styles';
import Input from '../../Input';
import ICreateFormDTO from '../../../dtos/ICreateFormDTO';
import Button from '../../Button';
import { textToSlug } from '../../../utils/textToSlug';
import { useForm } from '../../../hooks/form';
import WindowFormContainer from '../WindowFormContainer';

interface IProps {
  handleCloseWindow: Function;
}

const AddCompanyForm: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { createForm, handleSetCurrentForm } = useForm();
  const formRef = useRef<FormHandles>(null);
  // const [isFormActive, setIsFormActive] = useState(false);

  const handleSubmitForm = useCallback(
    (e: ICreateFormDTO) => {
      try {
        createForm({
          slug: textToSlug(e.name),
          name: e.name,
          title: e.title,
          message: e.message,
          isActive: false,
        }).then(response => {
          handleSetCurrentForm(response);
          handleCloseWindow();
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [createForm, handleCloseWindow, handleSetCurrentForm],
  );

  // const handleIsFormActive = useCallback((e: boolean) => {
  //   setIsFormActive(e);
  // }, []);

  return (
    <WindowFormContainer onHandleCloseWindow={handleCloseWindow}>
      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <Container>
          <h2>Novo Formulário</h2>
          <section>
            <strong>Dê um nome ao formulário</strong>
            <p>O nome do formulário é visível apenas para a empresa</p>
            <Input name="name" />
          </section>
          <section>
            <strong>Insira o título do formulário</strong>
            <p>O título irá aparecer no topo da página</p>
            <Input name="title" />
          </section>
          <section>
            <strong>Descrição:</strong>
            <p>O campo de descrição é opcional</p>
            <p>Ele aparece como um texto menor abaixo do título</p>
            <Input name="message" />
          </section>
          {/* <span>
            <strong>Ative o formulário para utilizá-lo</strong>
            <p>Caso queira, poderá alterar posteriormente</p>
            <button
              type="button"
              onClick={() => handleIsFormActive(!isFormActive)}
            >
              {isFormActive ? 'Ativo' : 'Inativo'}
            </button>
          </span> */}

          <Button type="submit">Criar formulário</Button>
        </Container>
      </Form>
    </WindowFormContainer>
  );
};

export default AddCompanyForm;
