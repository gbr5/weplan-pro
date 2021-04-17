import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IFormParams {
  countryCode: number;
  localCode: number;
  phoneNumber: number;
}

interface IProps {
  handleSubmit: (phone: number) => void;
}

const PhoneForm: React.FC<IProps> = ({ handleSubmit }) => {
  const height = '2.5rem';
  const formRef = useRef<FormHandles>(null);

  const onSubmit = useCallback(
    ({ countryCode, localCode, phoneNumber }: IFormParams) => {
      const phone = Number(`${countryCode}${localCode}${phoneNumber}`);
      handleSubmit(phone);
    },
    [handleSubmit],
  );

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <Container>
        <span>
          <Input
            containerStyle={{
              width: '4.5rem',
              height,
              padding: 'auto 0',
            }}
            name="countryCode"
            defaultValue={55}
            type="number"
            pattern="\d*"
          />
          <Input
            containerStyle={{
              width: '5rem',
              height,
              padding: 'auto 0',
            }}
            name="localCode"
            defaultValue={11}
            type="number"
            pattern="\d*"
          />
          <Input
            containerStyle={{
              width: '12rem',
              height,
            }}
            name="phoneNumber"
            defaultValue={11}
            type="number"
            pattern="\d*"
          />
        </span>
        <Button type="submit">Salvar</Button>
      </Container>
    </Form>
  );
};

export default PhoneForm;
