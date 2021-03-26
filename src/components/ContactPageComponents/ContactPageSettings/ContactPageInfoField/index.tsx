import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import IContactPageDTO from '../../../../dtos/IContactPageDTO';
import { useAuth } from '../../../../hooks/auth';
import { useContactPage } from '../../../../hooks/contactPages';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, FormContainer, Field } from './styles';

interface IProps {
  contactPageInfoField: string;
  defaultContactPageInfoField: string;
}

const ContactPageInfoField: React.FC<IProps> = ({
  contactPageInfoField,
  defaultContactPageInfoField,
}) => {
  const { company } = useAuth();
  const [editField, setEditField] = useState(false);
  const { currentContactPage, updateContactPage } = useContactPage();
  const formRef = useRef<FormHandles>(null);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleSubmit = useCallback(
    (e: IContactPageDTO) => {
      if (contactPageInfoField === 'title') {
        updateContactPage({
          ...currentContactPage,
          title: e.title,
        });
        handleEditField(false);
      }
      if (contactPageInfoField === 'slug') {
        updateContactPage({
          ...currentContactPage,
          slug: e.slug,
        });
        handleEditField(false);
      }
      if (contactPageInfoField === 'cta_label') {
        updateContactPage({
          ...currentContactPage,
          cta_label: e.cta_label,
        });
        handleEditField(false);
      }
      if (contactPageInfoField === 'cta_url') {
        updateContactPage({
          ...currentContactPage,
          cta_url: e.cta_url,
        });
        handleEditField(false);
      }
    },
    [
      contactPageInfoField,
      handleEditField,
      updateContactPage,
      currentContactPage,
    ],
  );

  const field = useMemo(() => {
    if (contactPageInfoField === 'title') {
      return 'Título';
    }
    if (contactPageInfoField === 'slug') {
      return 'Url da Página';
    }
    if (contactPageInfoField === 'cta_label') {
      return 'Texto do Botão';
    }
    if (contactPageInfoField === 'cta_url') {
      return 'Link de Destino do Botão';
    }
    return '';
  }, [contactPageInfoField]);

  return (
    <Container>
      <span>
        <button type="button" onClick={() => handleEditField(!editField)}>
          {editField ? <MdClose size={24} /> : <MdEdit size={24} />}
        </button>
      </span>
      {editField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            <h2>
              Editar <strong>{field}</strong>
            </h2>
            {contactPageInfoField === 'slug' ? (
              <Input
                name={contactPageInfoField}
                defaultValue={defaultContactPageInfoField}
                placeholder={field}
                mask="slug"
              />
            ) : (
              <Input
                name={contactPageInfoField}
                defaultValue={defaultContactPageInfoField}
                placeholder={field}
              />
            )}
            <Button type="submit">Criar</Button>
          </FormContainer>
        </Form>
      ) : (
        <Field>
          <h3>{field}</h3>
          <span>
            {contactPageInfoField === 'slug' ? (
              <a
                href={`${process.env.EXTERNAL_PAGE}/links/${company.trimmed_name}/${defaultContactPageInfoField}`}
              >
                {`${process.env.EXTERNAL_PAGE}/links/${company.trimmed_name}/${defaultContactPageInfoField}`}
              </a>
            ) : (
              <p>{defaultContactPageInfoField}</p>
            )}
          </span>
        </Field>
      )}
    </Container>
  );
};

export default ContactPageInfoField;