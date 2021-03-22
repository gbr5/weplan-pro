import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import ICreateFormFieldDTO from '../../../dtos/ICreateFormFieldDTO';
import IFormFieldDTO from '../../../dtos/IFormFieldDTO';
import { useForm } from '../../../hooks/form';
import { useToast } from '../../../hooks/toast';
import { textToSlug } from '../../../utils/textToSlug';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import Input from '../../Input';
import SelectField from '../SelectField';

import { Container } from './styles';

interface ChackBoxOption {
  id: string;
  value: string;
  label: string;
}

interface IProps {
  closeWindow: Function;
  field: IFormFieldDTO;
}

const EditFormField: React.FC<IProps> = ({ closeWindow, field }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { updateFormField, deleteFormField, fieldTypes } = useForm();
  const [isRequired, setIsRequired] = useState(field.isRequired);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const defaultType = fieldTypes.find(
    thisField => thisField.value === field.type,
  );

  const handleDeleteConfirmation = useCallback((e: boolean) => {
    setDeleteConfirmation(e);
  }, []);

  const handleDeleteField = useCallback(() => {
    if (field.name === 'name') {
      return addToast({
        type: 'error',
        title: 'Não é permitido excluir o campo "name"',
        description:
          'Ele é utilizado para identificar a pessoa que respondeu ao formulário!',
      });
    }
    if (field.name === 'email') {
      return addToast({
        type: 'error',
        title: 'Não é permitido excluir o campo "email"',
        description: 'É necessário ter uma forma de contato com a pessoa!',
      });
    }
    deleteFormField(field.id);
    handleDeleteConfirmation(false);
    closeWindow();
  }, [deleteFormField, addToast, closeWindow, handleDeleteConfirmation, field]);

  const handleSubmit = useCallback(
    (e: ICreateFormFieldDTO) => {
      if (field.name === 'name') {
        return addToast({
          type: 'error',
          title: 'Não é permitido editar o campo "name"',
          description:
            'Este campo é uma variável chave para podermos otimizar o sistema para você!',
        });
      }
      if (field.name === 'email') {
        return addToast({
          type: 'error',
          title: 'Não é permitido editar o campo "email"',
          description:
            'Este campo é uma variável chave para podermos otimizar o sistema para você!',
        });
      }
      try {
        updateFormField({
          ...field,
          isRequired,
          name: textToSlug(e.title),
          placeholder: e.placeholder || ' ',
          position: e.position,
          title: e.title,
          type: e.type,
        });
        closeWindow();
      } catch (err) {
        throw new Error(err);
      }
    },
    [closeWindow, updateFormField, isRequired, field],
  );

  const handleIsRequired = useCallback((e: boolean) => {
    setIsRequired(e);
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      {deleteConfirmation && (
        <ConfirmationWindow
          message="Deseja realmente deletar esse campo?"
          closeWindow={() => handleDeleteConfirmation(false)}
          firstButtonFunction={() => handleDeleteField()}
          firstButtonLabel="Deletar"
          secondButtonFunction={() => handleDeleteConfirmation(false)}
          secondButtonLabel="Não Deletar"
          zIndex={16}
        />
      )}
      <Container>
        <aside>
          <h2>Editar Campo</h2>
          <button type="button" onClick={() => closeWindow()}>
            <MdClose size={24} />
          </button>
        </aside>
        <section>
          <strong>Nome do Campo</strong>
          <Input
            defaultValue={field.title}
            placeholder={field.title}
            name="title"
          />
        </section>
        {/* <section>
          <strong>Placeholder</strong>
          <Input name="placeholder" defaultValue=" " />
        </section> */}

        <section>
          <strong>Tipo do campo</strong>
          <SelectField
            defaultValue={defaultType}
            name="type"
            options={fieldTypes}
          />
        </section>
        <span>
          <strong>Posição</strong>
          <Input defaultValue={field.position} name="position" type="number" />
        </span>
        <span>
          <strong>Obrigatório</strong>
          <button type="button" onClick={() => handleIsRequired(!isRequired)}>
            {isRequired ? <FiCheckCircle size={32} /> : <FiCircle size={32} />}
          </button>
        </span>

        <Button type="submit">Salvar</Button>
        <Button
          style={{
            background: 'red',
            color: '#000',
          }}
          type="button"
          onClick={() => handleDeleteConfirmation(true)}
        >
          Deletar
          <FiTrash2 size={24} />
        </Button>
      </Container>
    </Form>
  );
};

export default EditFormField;
