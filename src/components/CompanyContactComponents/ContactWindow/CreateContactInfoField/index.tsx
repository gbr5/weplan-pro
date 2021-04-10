import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import ICompanyContactInfoDTO from '../../../../dtos/ICompanyContactInfoDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';
import SelectField from '../../../FormComponents/SelectField';
import Input from '../../../Input';

import { Container, AddButton, EditFieldContainer } from './styles';

const CreateContactInfoField: React.FC = () => {
  const iconSize = 24;

  const { createCompanyContactInfo, contactInfoTypes } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [addContactField, setAddContactField] = useState(false);

  const handleSubmit = useCallback(
    (data: ICompanyContactInfoDTO) => {
      createCompanyContactInfo({
        info: data.info,
        info_type: data.info_type,
      });
      setAddContactField(false);
    },
    [createCompanyContactInfo],
  );

  const handleAddField = useCallback((e: boolean) => {
    setAddContactField(e);
  }, []);

  return (
    <Container>
      {addContactField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <EditFieldContainer>
            <span>
              <button type="button" onClick={() => handleAddField(false)}>
                <FiTrash2 size={iconSize} />
              </button>
            </span>
            <section>
              <strong>Tipo de contato</strong>
              <SelectField
                isSearchable={false}
                defaultValue={contactInfoTypes[0]}
                name="info_type"
                options={contactInfoTypes}
              />
            </section>
            <section>
              <strong>Contato</strong>
              <Input name="info" />
            </section>
            <Button type="submit">Salvar</Button>
          </EditFieldContainer>
        </Form>
      ) : (
        <AddButton type="button" onClick={() => handleAddField(true)}>
          <MdAdd size={64} />
        </AddButton>
      )}
    </Container>
  );
};

export default CreateContactInfoField;
