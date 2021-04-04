import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactInfoDTO from '../../../../dtos/ICompanyContactInfoDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import Button from '../../../Button';
import SelectField from '../../../FormComponents/SelectField';
import Input from '../../../Input';

import { Container, FieldContainer, EditFieldContainer } from './styles';

interface IProps {
  contactField: ICompanyContactInfoDTO;
}

const ContactInfoField: React.FC<IProps> = ({ contactField }) => {
  const iconSize = 24;

  const { updateCompanyContactInfo, contactInfoTypes } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);
  const [defaultInfoType, setDefaultInfoType] = useState(contactInfoTypes[0]);

  useEffect(() => {
    const response = contactInfoTypes.find(
      field => field.value === contactField.info_type,
    );
    response && setDefaultInfoType(response);
  }, [contactInfoTypes, contactField]);

  const handleSubmit = useCallback(
    (data: ICompanyContactInfoDTO) => {
      updateCompanyContactInfo({
        id: contactField.id,
        info: data.info,
        info_type: data.info_type,
      });
      setEditContactField(false);
    },
    [updateCompanyContactInfo, contactField],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);
  return (
    <Container>
      <span>
        <button
          type="button"
          onClick={() => handleEditField(!editContactField)}
        >
          {editContactField ? (
            <MdClose size={iconSize} />
          ) : (
            <MdEdit size={iconSize} />
          )}
        </button>
      </span>
      {editContactField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <EditFieldContainer>
            <section>
              <strong>Tipo de contato</strong>
              <SelectField
                isSearchable={false}
                defaultValue={defaultInfoType}
                name="info_type"
                options={contactInfoTypes}
              />
            </section>
            <section>
              <strong>Contato</strong>
              <Input
                defaultValue={contactField.info}
                name="info"
                placeholder={contactField.info}
              />
            </section>
            <Button type="submit">Salvar</Button>
          </EditFieldContainer>
        </Form>
      ) : (
        <FieldContainer>
          <strong>{defaultInfoType.label}</strong>
          <p>{contactField.info}</p>
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactInfoField;
