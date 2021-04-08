import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import ICreateFunnelCardInfoFieldDTO from '../../../dtos/ICreateFunnelCardInfoFieldDTO';
import { useForm } from '../../../hooks/form';
import Button from '../../Button';
import Input from '../../Input';
import SelectField from '../../FormComponents/SelectField';

import { Container } from './styles';
import { useFunnel } from '../../../hooks/funnel';
import IFunnelCardInfoFieldDTO from '../../../dtos/IFunnelCardInfoFieldDTO';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';

interface IProps {
  field: IFunnelCardInfoFieldDTO;
}

const FunnelCardInfoFieldButton: React.FC<IProps> = ({ field }) => {
  const formRef = useRef<FormHandles>(null);
  const { fieldTypes } = useForm();
  const { updateFunnelCardInfoField, deleteFunnelCardInfoField } = useFunnel();
  const [isRequired, setIsRequired] = useState(field.isRequired);
  const [editField, setEditField] = useState(false);
  const [deleteField, setDeleteField] = useState(false);

  const handleSubmit = useCallback(
    async (e: ICreateFunnelCardInfoFieldDTO) => {
      updateFunnelCardInfoField({
        ...field,
        field_type: e.field_type,
        isRequired,
        name: e.name,
      });
      setEditField(false);
    },
    [isRequired, field, updateFunnelCardInfoField],
  );

  const handleIsRequired = useCallback((e: boolean) => {
    setIsRequired(e);
  }, []);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleDeleteFieldConfirmation = useCallback((e: boolean) => {
    setDeleteField(e);
  }, []);

  const handleDeleteField = useCallback(() => {
    deleteFunnelCardInfoField(field.id);
  }, [deleteFunnelCardInfoField, field]);

  const defaultType = fieldTypes.filter(
    type => type.value === field.field_type,
  )[0];

  return (
    <>
      {deleteField && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteFieldConfirmation(false)}
          firstButtonFunction={() => handleDeleteField()}
          firstButtonLabel="Deletar"
          message="Deseja deletar o campo?"
          secondButtonFunction={() => handleDeleteFieldConfirmation(false)}
          secondButtonLabel="Não Deletar"
          zIndex={15}
        />
      )}
      {editField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Container>
            <aside>
              <h2>Editar Campo</h2>
              <button type="button" onClick={() => handleEditField(false)}>
                <MdClose size={24} />
              </button>
            </aside>
            <section>
              <strong>Nome do Campo</strong>
              <Input
                defaultValue={field.name}
                placeholder={field.name}
                name="name"
              />
            </section>
            {/* <section>
              <strong>Placeholder</strong>
              <Input name="placeholder" defaultValue=" " />
            </section> */}

            <section>
              <strong>Tipo do campo</strong>
              <SelectField
                isSearchable={false}
                defaultValue={defaultType}
                name="field_type"
                options={fieldTypes}
              />
            </section>
            <span>
              <strong>Obrigatório</strong>
              <button
                type="button"
                onClick={() => handleIsRequired(!isRequired)}
              >
                {isRequired ? (
                  <FiCheckCircle size={32} />
                ) : (
                  <FiCircle size={32} />
                )}
              </button>
            </span>

            <Button type="submit">Salvar</Button>
            <Button
              onClick={() => handleDeleteFieldConfirmation(true)}
              style={{ background: 'red' }}
              type="button"
            >
              <FiTrash2 size={24} />
              Deletar
            </Button>
          </Container>
        </Form>
      ) : (
        <Button type="button" onClick={() => handleEditField(true)}>
          {field.name}
        </Button>
      )}
    </>
  );
};

export default FunnelCardInfoFieldButton;
