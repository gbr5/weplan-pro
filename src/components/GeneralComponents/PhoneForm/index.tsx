import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';

import { Container } from './styles';

interface IFormParams {
  countryCode: number;
  localCode: number;
  phoneNumber: number;
}

interface IProps {
  handleSubmit: (phone: string) => void;
  defaultNumber?: string;
}

const PhoneForm: React.FC<IProps> = ({ handleSubmit, defaultNumber }) => {
  const height = '2.5rem';
  const formRef = useRef<FormHandles>(null);
  const [countryCode, setCountryCode] = useState('55');
  const [localCode, setLocalCode] = useState('31');
  const [number, setNumber] = useState('');

  const onSubmit = useCallback(
    (data: IFormParams) => {
      const phone = `${data.countryCode} ${data.localCode} ${data.phoneNumber}`;
      handleSubmit(phone);
    },
    [handleSubmit],
  );

  useEffect(() => {
    if (defaultNumber) {
      if (defaultNumber.includes(' ')) {
        const numberArray = defaultNumber.split(' ');
        setCountryCode(
          numberArray[2] && numberArray[1] ? numberArray[0] : '55',
        );
        setLocalCode(numberArray[2] && numberArray[1] ? numberArray[1] : '31');
        setNumber(
          numberArray[2] && numberArray[1] ? numberArray[2] : numberArray[0],
        );
      } else {
        setNumber(defaultNumber);
      }
    }
  }, [defaultNumber]);

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
            defaultValue={countryCode}
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
            defaultValue={localCode}
            type="number"
            pattern="\d*"
          />
          <Input
            containerStyle={{
              width: '12rem',
              height,
            }}
            name="phoneNumber"
            defaultValue={number}
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
