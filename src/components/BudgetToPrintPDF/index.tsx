import { isBefore } from 'date-fns';
import { isAfter } from 'date-fns/esm';
import React, {
  AnchorHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useReactToPrint } from 'react-to-print';
import ICardBudgetDTO from '../../dtos/ICardBudgetDTO';
import ICardBudgetInstallmentDTO from '../../dtos/ICardBudgetInstallmentDTO';
import { useAuth } from '../../hooks/auth';
import WindowContainer from '../WindowContainer';

import imgPlaceholder from '../../assets/weplan.svg';

import {
  Container,
  PageHeader,
  Body,
  PrintButtonContainer,
  Footer,
} from './styles';

interface IProps extends AnchorHTMLAttributes<HTMLElement> {
  budget: ICardBudgetDTO;
  onHandleCloseWindow: MouseEventHandler;
}

const BudgetToPrintPDF: React.FC<IProps> = ({
  budget,
  onHandleCloseWindow,
  ...rest
}: IProps) => {
  const { company } = useAuth();
  const componentRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const budgetSortedInstallments = budget.installments.sort(sortInstallments);
    setSortedInstallments(budgetSortedInstallments);
  }, [sortInstallments, budget]);

  return (
    <>
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 30,
          width: '68%',
          height: '90%',
          top: '5%',
          left: '15%',
        }}
        {...rest}
      >
        <Container ref={componentRef}>
          <PageHeader>
            <span>
              <img
                src={company.avatar_url || imgPlaceholder}
                alt={company.name}
              />
              <h3>Orçamento | {company.name}</h3>
              <p>{`${today}`}</p>
            </span>
          </PageHeader>
          <Body>
            <div>
              <div>
                <p>Cliente:</p>
                <strong>{budget.customer.name}</strong>
              </div>
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
              {budget.customer.contact_infos.map(contactInfo => (
                <div key={contactInfo.id}>
                  <p>{contactInfo.info_type}</p>
                  <strong>{contactInfo.info}</strong>
                </div>
              ))}
            </div>
            <div>
              <h3>Parcelas:</h3>
              {sortedInstallments.map(installment => {
                const index = budget.installments.findIndex(
                  xInstallment => xInstallment.id === installment.id,
                );
                return (
                  <div key={installment.id}>
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
          <Footer>
            <div>
              <a href="http://weplan.party">
                Venha fazer parte desta <strong>Evolução</strong> ;D !
              </a>
              <img src={imgPlaceholder} alt="WePlan" /> <h1>PARTY</h1>
            </div>
          </Footer>
        </Container>
        <PrintButtonContainer>
          <button type="button" onClick={handlePrint}>
            Salvar em PDF
          </button>
        </PrintButtonContainer>
      </WindowContainer>
    </>
  );
};

export default BudgetToPrintPDF;
