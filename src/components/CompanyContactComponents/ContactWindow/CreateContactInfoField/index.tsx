import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import ICompanyContactInfoDTO from '../../../../dtos/ICompanyContactInfoDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import formatTextArea from '../../../../utils/formatTextArea';
import Button from '../../../Button';
import SelectField from '../../../FormComponents/SelectField';
import PhoneForm from '../../../GeneralComponents/PhoneForm';
import Input from '../../../Input';

import { Container, AddButton, EditFieldContainer } from './styles';

const CreateContactInfoField: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const iconSize = 24;

  const { createCompanyContactInfo, contactInfoTypes } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [addContactField, setAddContactField] = useState(false);
  const [fieldType, setFieldType] = useState('Phone');
  const [rows, setRows] = useState(2);
  const [address, setAddress] = useState('');

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      console.log(textArea.value);
      setAddress(textArea.value);
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  const handleSubmit = useCallback(
    (data: Omit<ICompanyContactInfoDTO, 'id'>) => {
      console.log(data);
      fieldType === 'Address' &&
        createCompanyContactInfo({
          info: address,
          info_type: 'Address',
        });
      fieldType !== 'Address' &&
        createCompanyContactInfo({
          info: String(data.info),
          info_type: data.info_type,
        });
      setAddContactField(false);
    },
    [createCompanyContactInfo, fieldType, address],
  );

  const handleAddField = useCallback((e: boolean) => {
    setAddContactField(e);
  }, []);

  const handlePhoneComponent = useCallback(
    (phone: number) => {
      handleSubmit({
        info: String(phone),
        info_type: 'Phone',
      });
    },
    [handleSubmit],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFieldType = useCallback((data: any) => {
    console.log(data);
    data && data.id && setFieldType(data.value);
  }, []);

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.09;
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
                onChange={handleChangeFieldType}
                isSearchable={false}
                defaultValue={contactInfoTypes[0]}
                name="info_type"
                options={contactInfoTypes}
              />
            </section>
            <section>
              <strong>Contato</strong>
              {fieldType === 'Phone' && (
                <PhoneForm handleSubmit={handlePhoneComponent} />
              )}
              {fieldType === 'Email' && <Input type="email" name="info" />}
              {fieldType === 'Address' && (
                <textarea
                  name="info"
                  onChange={handleChange}
                  ref={textAreaRef}
                  cols={cols}
                  rows={rows}
                />
              )}
              {fieldType !== 'Phone' &&
                fieldType !== 'Address' &&
                fieldType !== 'Email' && <Input name="info" />}
            </section>
            {fieldType !== 'Phone' && <Button type="submit">Salvar</Button>}
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
