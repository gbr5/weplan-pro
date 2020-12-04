import React, { MouseEventHandler, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import WindowContainer from '../../../../WindowContainer';
import { useToast } from '../../../../../hooks/toast';

import getValidationErrors from '../../../../../utils/getValidationErros';
import Input from '../../../../Input';
import { Container } from './styles';
import { useAuth } from '../../../../../hooks/auth';
import api from '../../../../../services/api';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import ICompanyContactDTO from '../../../../../dtos/ICompanyContactDTO';

interface IFormDTO {
  description: string;
  value: number;
  validity_date: string;
  number_of_installments: number;
}

interface IProps {
  card: IStageCardDTO;
  customers: ICompanyContactDTO[];
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getCardBudgets: Function;
}

const AddCardBudgetForm: React.FC<IProps> = ({
  card,
  customers,
  onHandleCloseWindow,
  handleCloseWindow,
  getCardBudgets,
}: IProps) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { company, person } = useAuth();

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required('Descrição é obrigatória'),
          value: Yup.number().required('Valor é obrigatório'),
          validity_date: Yup.date().required('Data de validade é obrigatória'),
          number_of_installments: Yup.number().required(
            'Número de parcelas é obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post(`card/budgets`, {
          customers_id: customers[0].id,
          company_id: company.id,
          sales_person_id: person.id,
          card_unique_name: card.unique_name,
          description: data.description,
          value: Number(data.value),
          validity_date: String(data.validity_date),
          number_of_installments: Number(data.number_of_installments),
          isValid: true,
        });
        getCardBudgets();
        handleCloseWindow();
        return addToast({
          type: 'success',
          title: 'Orçamento criado com sucesso!',
          description: 'As alterações já foram propagadas.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        return addToast({
          type: 'error',
          title: 'Erro ao adicionar colaborador',
          description: 'Erro ao adicionar colaborador, tente novamente.',
        });
      }
    },
    [
      addToast,
      getCardBudgets,
      handleCloseWindow,
      card,
      company,
      person,
      customers,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 30,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Criar Orçamento</h1>
          <p>Descrição:</p>
          <Input name="description" placeholder="Alguma informação útil" />
          <p>Valor:</p>
          <Input
            name="value"
            type="number"
            placeholder="Alguma informação útil"
          />
          <p>Valido até:</p>
          <Input
            name="validity_date"
            type="date"
            placeholder="Alguma informação útil"
          />
          <p>Número de parcelas:</p>
          <Input
            name="number_of_installments"
            type="number"
            placeholder="Alguma informação útil"
          />
          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </WindowContainer>
  );
};

export default AddCardBudgetForm;
