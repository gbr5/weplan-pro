import { isBefore } from 'date-fns';
import { isAfter } from 'date-fns/esm';
import React, { useCallback, useEffect, useState } from 'react';
import ICardBudgetDTO from '../../dtos/ICardBudgetDTO';
import ICardBudgetInstallmentDTO from '../../dtos/ICardBudgetInstallmentDTO';
import { useAuth } from '../../hooks/auth';

import { Container, PageHeader, Body } from './styles';

interface IProps {
  budget: ICardBudgetDTO;
}

const BudgetToPrintPDF: React.FC<IProps> = ({ budget }: IProps) => {
  const { company } = useAuth();

  const [sortedInstallments, setSortedInstallments] = useState<
    ICardBudgetInstallmentDTO[]
  >([]);

  const today = new Date();

  const sortInstallments = useCallback(
    (a: ICardBudgetInstallmentDTO, b: ICardBudgetInstallmentDTO) => {
      const aDueDate = new Date(a.due_date);
      const bDueDate = new Date(b.due_date);
      if (isAfter(aDueDate, bDueDate)) {
        return 1;
      }
      if (isBefore(aDueDate, bDueDate)) {
        return -1;
      }
      return 0;
    },
    [],
  );

  useEffect(() => {
    const budgetSortedInstallments = budget.installments.sort(sortInstallments);
    setSortedInstallments(budgetSortedInstallments);
  }, [sortInstallments, budget]);

  return (
    <Container>
      <PageHeader>
        <span>
          <img src={company.avatar_url} alt={company.name} />
          <h3>Orçamento | {company.name}</h3>
          <p>{today}</p>
        </span>
        <div>
          <div>
            <p>Cliente:</p>
            <strong>{budget.customer.name}</strong>
          </div>
          {budget.customer.contact_infos.map(contactInfo => (
            <div key={contactInfo.id}>
              <p>{contactInfo.info_type}</p>
              <strong>{contactInfo.info}</strong>
            </div>
          ))}
        </div>
      </PageHeader>
      <Body>
        <div>
          <div>
            <p>Valor do Orçamento: </p>
            <p>{budget.value}</p>
          </div>
          <div>
            <p>Valido até: </p>
            <p>{budget.validity_date}</p>
          </div>
        </div>
        <div>
          <h3>Parcelas:</h3>
          {sortedInstallments.map(installment => {
            const index = budget.installments.findIndex(
              xInstallment => xInstallment.id === installment.id,
            );

            return (
              <div key={index}>
                <strong>{index}</strong>
                <div>
                  <p>Valor: </p>
                  <p>{installment.value}</p>
                </div>
                <div>
                  <p>Valido até: </p>
                  <p>{installment.due_date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Body>
    </Container>
  );
};

export default BudgetToPrintPDF;
