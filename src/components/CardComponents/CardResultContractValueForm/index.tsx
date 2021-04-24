import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IFormParams {
  contract_value: string;
}
// handleContractValue has to call close window aswell so this window closes
interface IProps {
  defaultValue: string;
  closeWindow: () => void;
  handleContractValue: (e: number) => void;
}

const CardResultContractValueForm: React.FC<IProps> = ({
  closeWindow,
  handleContractValue,
  defaultValue,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    ({ contract_value }: IFormParams) => {
      handleContractValue(
        Number(
          contract_value.replace(/\D*/, '').replace(/\./, '').replace(/,/, '.'),
        ),
      );
    },
    [handleContractValue],
  );
  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Container>
          <strong>Qual o valor do contrato?</strong>
          <Input
            required
            name="contract_value"
            defaultValue=""
            type="number"
            min="0.00"
            step="0.01"
            placeholder={defaultValue}
          />
          <Button type="submit">Salvar</Button>
        </Container>
      </Form>
    </WindowContainer>
  );
};

export default CardResultContractValueForm;
