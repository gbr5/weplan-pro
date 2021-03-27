import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import ICreateFormFieldDTO from '../../../dtos/ICreateFormFieldDTO';
import { useForm } from '../../../hooks/form';
import { textToSlug } from '../../../utils/textToSlug';
import Button from '../../Button';
import Input from '../../Input';
import SelectField from '../SelectField';

import { Container } from './styles';

interface IProps {
  closeComponent: Function;
}

const AddFormField: React.FC<IProps> = ({ closeComponent }) => {
  const formRef = useRef<FormHandles>(null);
  const { createFormField, currentForm, fieldTypes } = useForm();
  const [isRequired, setIsRequired] = useState(true);

  const handleSubmit = useCallback(
    (e: ICreateFormFieldDTO) => {
      try {
        createFormField({
          form_id: currentForm.id,
          isRequired,
          name: textToSlug(e.title),
          placeholder: ' ',
          position: currentForm.fields.length + 1 || 1,
          title: e.title,
          type: e.type,
        }).then(response => {
          response.id && closeComponent();
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [closeComponent, createFormField, isRequired, currentForm],
  );

  const handleIsRequired = useCallback((e: boolean) => {
    setIsRequired(e);
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <aside>
          <h2>Novo Campo</h2>
          <button type="button" onClick={() => closeComponent()}>
            <FiTrash2 size={24} />
          </button>
        </aside>
        <section>
          <strong>Nome do Campo</strong>
          <Input name="title" />
        </section>
        {/* <section>
          <strong>Placeholder</strong>
          <Input name="placeholder" defaultValue=" " />
        </section> */}

        <section>
          <strong>Tipo do campo</strong>
          <SelectField
            isSearchable={false}
            defaultValue={fieldTypes[0]}
            name="type"
            options={fieldTypes}
          />
        </section>
        <span>
          <strong>Obrigatório</strong>
          <button type="button" onClick={() => handleIsRequired(!isRequired)}>
            {isRequired ? <FiCheckCircle size={32} /> : <FiCircle size={32} />}
          </button>
        </span>

        <Button type="submit">Salvar</Button>
      </Container>
    </Form>
  );
};

export default AddFormField;
