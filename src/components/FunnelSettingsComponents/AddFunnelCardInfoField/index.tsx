import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import ICreateFunnelCardInfoFieldDTO from '../../../dtos/ICreateFunnelCardInfoFieldDTO';
import { useForm } from '../../../hooks/form';
import Button from '../../Button';
import Input from '../../Input';
import SelectField from '../../FormComponents/SelectField';

import { Container } from './styles';
import { useFunnel } from '../../../hooks/funnel';

interface IProps {
  closeComponent: Function;
}

const AddFunnelCardInfoField: React.FC<IProps> = ({ closeComponent }) => {
  const formRef = useRef<FormHandles>(null);
  const { fieldTypes } = useForm();
  const { createFunnelCardInfoField, selectedFunnel } = useFunnel();
  const [isRequired, setIsRequired] = useState(true);

  const handleSubmit = useCallback(
    async (e: ICreateFunnelCardInfoFieldDTO) => {
      createFunnelCardInfoField({
        field_type: e.field_type,
        funnel_id: selectedFunnel.id,
        isRequired,
        name: e.name,
      });
      closeComponent();
    },
    [closeComponent, isRequired, selectedFunnel, createFunnelCardInfoField],
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
          <Input name="name" />
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
            name="field_type"
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

export default AddFunnelCardInfoField;
