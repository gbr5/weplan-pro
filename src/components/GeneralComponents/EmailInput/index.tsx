import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { MdCheck, MdClose } from 'react-icons/md';
import { Container } from './styles';
import SelectField from '../../FormComponents/SelectField';
import ICheckBoxOptionDTO from '../../../dtos/ICheckBoxOptionDTO';
import Input from '../../Input';
import IEmailInputSubmitDTO from '../../../dtos/IEmailInputSubmitDTO';

interface EmailInputProps {
  defaultEmail?: string;
  defaultSendingType?: 'to' | 'cc' | 'cco';
  closeComponent: Function;
  handleSubmit: Function;
}

const EmailInput: React.FC<EmailInputProps> = ({
  defaultEmail,
  defaultSendingType,
  closeComponent,
  handleSubmit,
}) => {
  const formRef = useRef<FormHandles>(null);
  const sendingTypes: ICheckBoxOptionDTO[] = [
    { id: 'to', label: 'To', value: 'to' },
    { id: 'cc', label: 'Cc', value: 'cc' },
    { id: 'cco', label: 'Cco', value: 'cco' },
  ];

  const [sendingType, setSendingType] = useState(sendingTypes[0]);

  const handleSubmitComponent = useCallback(
    (e: IEmailInputSubmitDTO) => {
      handleSubmit(e);
      closeComponent();
    },
    [handleSubmit, closeComponent],
  );

  useEffect(() => {
    if (defaultSendingType === 'to') {
      setSendingType(sendingTypes[0]);
    } else if (defaultSendingType === 'cc') {
      setSendingType(sendingTypes[1]);
    } else if (defaultSendingType === 'cco') {
      setSendingType(sendingTypes[2]);
    }
  }, [defaultSendingType, sendingTypes]);

  return (
    <Form ref={formRef} onSubmit={handleSubmitComponent}>
      <Container>
        <SelectField
          defaultValue={sendingType}
          name="sending_type"
          options={sendingTypes}
        />

        <Input
          containerStyle={{
            borderLeft: 'none',
            borderRadius: '0 8px 8px 0',
          }}
          defaultValue={defaultEmail}
          name="email"
          type="email"
        />
        <button type="submit">
          <MdCheck color="green" />
        </button>
        <button type="button" onClick={() => closeComponent()}>
          <MdClose color="red" />
        </button>
      </Container>
    </Form>
  );
};

export default EmailInput;
