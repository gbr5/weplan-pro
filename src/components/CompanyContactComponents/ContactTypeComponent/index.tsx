import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import Button from '../../Button';
import SelectField from '../../FormComponents/SelectField';

import { EditFieldContainer } from './styles';

interface IFormParams {
  company_contact_type: string;
}

interface IProps {
  contactDefaultType?: string;
  handleSubmit: (company_contact_type: string) => void;
}

const ContactTypeComponent: React.FC<IProps> = ({
  handleSubmit,
  contactDefaultType,
}) => {
  const { contactTypes } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);
  const [defaultType, setDefaultType] = useState(contactTypes[0]);

  useEffect(() => {
    const response = contactTypes.find(
      field => field.value === contactDefaultType,
    );
    response && setDefaultType(response);
  }, [contactTypes, contactDefaultType]);

  const submit = useCallback(
    (data: IFormParams) => {
      handleSubmit(data.company_contact_type);
    },
    [handleSubmit],
  );

  return (
    <Form ref={formRef} onSubmit={submit}>
      <EditFieldContainer>
        <section>
          <strong>Categoria</strong>
          <SelectField
            isSearchable={false}
            defaultValue={defaultType}
            name="company_contact_type"
            options={contactTypes}
          />
        </section>
        <Button type="submit">Salvar</Button>
      </EditFieldContainer>
    </Form>
  );
};

export default ContactTypeComponent;
