import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ICompanyContactInfoDTO from '../../../../dtos/ICompanyContactInfoDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import formatTextArea from '../../../../utils/formatTextArea';
import Button from '../../../Button';
import SelectField from '../../../FormComponents/SelectField';
import PhoneForm from '../../../GeneralComponents/PhoneForm';
import Input from '../../../Input';

import { Container, FieldContainer, EditFieldContainer } from './styles';

interface IProps {
  contactField: ICompanyContactInfoDTO;
}

const ContactInfoField: React.FC<IProps> = ({ contactField }) => {
  const iconSize = 24;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { updateCompanyContactInfo, contactInfoTypes } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [editContactField, setEditContactField] = useState(false);
  const [defaultInfoType, setDefaultInfoType] = useState(contactInfoTypes[0]);
  const [fieldType, setFieldType] = useState(contactField.info_type);
  const [rows, setRows] = useState(2);
  const [address, setAddress] = useState('');

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      setAddress(textArea.value);
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  useEffect(() => {
    const response = contactInfoTypes.find(
      field => field.value === contactField.info_type,
    );
    response && setDefaultInfoType(response);
  }, [contactInfoTypes, contactField]);

  const handleSubmit = useCallback(
    (data: ICompanyContactInfoDTO) => {
      fieldType === 'Address' &&
        updateCompanyContactInfo({
          id: contactField.id,
          info: address,
          info_type: 'Address',
        });
      fieldType !== 'Address' &&
        updateCompanyContactInfo({
          id: contactField.id,
          info: data.info,
          info_type: data.info_type,
        });
      setEditContactField(false);
    },
    [updateCompanyContactInfo, address, contactField, fieldType],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);

  const handlePhoneComponent = useCallback(
    (phone: string) => {
      if (phone !== undefined) {
        handleSubmit({
          id: contactField.id,
          info: phone,
          info_type: 'Phone',
        });
      }
    },
    [handleSubmit, contactField],
  );

  const handleWhatsappComponent = useCallback(
    (phone: string) => {
      if (phone !== undefined) {
        handleSubmit({
          id: contactField.id,
          info: phone,
          info_type: 'Whatsapp',
        });
      }
    },
    [handleSubmit, contactField],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFieldType = useCallback((data: any) => {
    data && data.id && setFieldType(data.value);
  }, []);

  const cols = useMemo(() => {
    const screenWidth = window.screen.width;
    return screenWidth * 0.09;
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
                onChange={handleChangeFieldType}
                isSearchable={false}
                defaultValue={defaultInfoType}
                name="info_type"
                options={contactInfoTypes}
              />
            </section>
            <section>
              <strong>Contato</strong>
              {fieldType === 'Whatsapp' && (
                <PhoneForm
                  defaultNumber={contactField.info}
                  handleSubmit={handleWhatsappComponent}
                />
              )}
              {fieldType === 'Phone' && (
                <PhoneForm
                  defaultNumber={contactField.info}
                  handleSubmit={handlePhoneComponent}
                />
              )}
              {fieldType === 'Email' && (
                <Input
                  defaultValue={contactField.info}
                  placeholder={contactField.info}
                  type="email"
                  name="info"
                />
              )}
              {fieldType === 'Address' && (
                <textarea
                  name="info"
                  onChange={handleChange}
                  ref={textAreaRef}
                  cols={cols}
                  rows={rows}
                  defaultValue={contactField.info}
                  placeholder={contactField.info}
                />
              )}
              {fieldType !== 'Phone' &&
                fieldType !== 'Whatsapp' &&
                fieldType !== 'Address' &&
                fieldType !== 'Email' && (
                  <Input
                    defaultValue={contactField.info}
                    name="info"
                    placeholder={contactField.info}
                  />
                )}
            </section>
            {fieldType !== 'Phone' && fieldType !== 'Whatsapp' && (
              <Button type="submit">Salvar</Button>
            )}
          </EditFieldContainer>
        </Form>
      ) : (
        <FieldContainer>
          <strong>{defaultInfoType.label}</strong>
          {defaultInfoType.value === 'Phone' && (
            <a
              target="blank"
              href={`tel:+${contactField.info
                .replace(/ /g, '')
                .normalize('NFD')}`}
            >
              {`+${contactField.info.replace(/ /g, '').normalize('NFD')}`}
            </a>
          )}
          {defaultInfoType.value === 'Whatsapp' && (
            <a
              target="blank"
              href={`https://wa.me/${contactField.info
                .replace(/ /g, '')
                .normalize('NFD')}`}
            >
              {contactField.info.replace(/ /g, '').normalize('NFD')}
            </a>
          )}
          {defaultInfoType.value === 'Email' && (
            <a
              target="blank"
              href={`mailto:${contactField.info
                .replace(/ /g, '')
                .normalize('NFD')}`}
            >
              {contactField.info.replace(/ /g, '').normalize('NFD')}
            </a>
          )}
          {defaultInfoType.value === 'Address' && <p>{contactField.info}</p>}
          {defaultInfoType.value !== 'Address' &&
            defaultInfoType.value !== 'Phone' &&
            defaultInfoType.value !== 'Whatsapp' &&
            defaultInfoType.value !== 'Email' && (
              <a
                target="blank"
                href={contactField.info.replace(/ /g, '').normalize('NFD')}
              >
                {contactField.info}
              </a>
            )}
        </FieldContainer>
      )}
    </Container>
  );
};

export default ContactInfoField;
