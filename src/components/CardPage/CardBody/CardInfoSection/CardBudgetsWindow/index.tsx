import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FiCheckSquare, FiSquare, FiTrash } from 'react-icons/fi';
import ICardBudgetDTO from '../../../../../dtos/ICardBudgetDTO';
import ICompanyContactDTO from '../../../../../dtos/ICompanyContactDTO';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import WindowContainer from '../../../../WindowContainer';
import AddCardBudgetForm from '../AddCardBudgetForm';

import {
  Container,
  BooleanButtonMenu,
  BooleanButton,
  RemoveBudgetButton,
  Budget,
  AddBudgetButton,
} from './styles';

interface IProps {
  card: IStageCardDTO;
  customers: ICompanyContactDTO[];
  onHandleCloseWindow: MouseEventHandler;
}

const CardBudgetsWindow: React.FC<IProps> = ({
  card,
  customers,
  onHandleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [createCardBudgetForm, setCreateCardBudgetForm] = useState(false);
  const [validSection, setValidSection] = useState(true);
  const [selectedCardBudget, setSelectedCardBudget] = useState<ICardBudgetDTO>(
    {} as ICardBudgetDTO,
  );
  const [validBudgets, setValidBudgets] = useState<ICardBudgetDTO[]>([]);
  const [invalidBudgets, setInvalidBudgets] = useState<ICardBudgetDTO[]>([]);

  const handleValidSection = useCallback(() => {
    setValidSection(!validSection);
  }, [validSection]);

  const handleCloseBudgetForm = useCallback(() => {
    setCreateCardBudgetForm(false);
  }, []);

  const handleSetSelectedBudget = useCallback(
    (props: ICardBudgetDTO) => {
      if (props.id === selectedCardBudget.id) {
        return setSelectedCardBudget({} as ICardBudgetDTO);
      }
      return setSelectedCardBudget(props);
    },
    [selectedCardBudget],
  );

  const getCardBudgets = useCallback(() => {
    try {
      api
        .get<ICardBudgetDTO[]>(`card/budgets/${card.unique_name}`)
        .then(response => {
          setValidBudgets(response.data.filter(xBudget => xBudget.isValid));
          setInvalidBudgets(response.data.filter(xBudget => !xBudget.isValid));
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  const validateCardBudget = useCallback(
    async (thisBudget: ICardBudgetDTO) => {
      try {
        await api.put(`card/budgets/validate/${thisBudget.id}`, {
          isValid: !thisBudget.isValid,
        });
        getCardBudgets();
      } catch (err) {
        throw new Error(err);
      }
    },
    [getCardBudgets],
  );

  const deleteCardBudget = useCallback(
    async (props: ICardBudgetDTO) => {
      try {
        if (props.id === selectedCardBudget.id) {
          await api.delete(`card/validBudgets/${selectedCardBudget.id}`);
          getCardBudgets();
          return addToast({
            type: 'success',
            title: 'Budgete removido com sucesso',
            description: 'As alterações já foram propagadas.',
          });
        }
        return setSelectedCardBudget(props);
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectedCardBudget, getCardBudgets, addToast],
  );

  useEffect(() => {
    getCardBudgets();
  }, [getCardBudgets]);

  return (
    <>
      {createCardBudgetForm && (
        <AddCardBudgetForm
          customers={customers}
          onHandleCloseWindow={() => setCreateCardBudgetForm(false)}
          handleCloseWindow={handleCloseBudgetForm}
          card={card}
          getCardBudgets={getCardBudgets}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 25,
          top: '20%',
          left: '20%',
          height: '60%',
          width: '60%',
        }}
      >
        <Container>
          <div>
            <AddBudgetButton
              type="button"
              onClick={() => setCreateCardBudgetForm(true)}
            >
              <strong>Adicionar Orçamento</strong>
            </AddBudgetButton>
          </div>
          <BooleanButtonMenu>
            <BooleanButton
              type="button"
              isActive={validSection}
              onClick={handleValidSection}
            >
              Orçamentos Válidos
            </BooleanButton>
            <BooleanButton
              type="button"
              isActive={!validSection}
              onClick={handleValidSection}
            >
              Orçamentos Inválidos
            </BooleanButton>
          </BooleanButtonMenu>

          {validSection &&
            validBudgets.map(budget => (
              <Budget>
                <BooleanButton
                  onClick={() => handleSetSelectedBudget(budget)}
                  type="button"
                  isActive={budget.id === selectedCardBudget.id}
                  key={budget.id}
                >
                  <h1>{budget.value}</h1>
                </BooleanButton>
                <span>
                  <button
                    type="button"
                    onClick={() => validateCardBudget(budget)}
                  >
                    {budget.isValid ? (
                      <FiCheckSquare size={32} />
                    ) : (
                      <FiSquare size={32} />
                    )}
                  </button>
                </span>
                <RemoveBudgetButton
                  isActive={selectedCardBudget.id === budget.id}
                  type="button"
                  onClick={() => deleteCardBudget(budget)}
                >
                  <FiTrash size={32} />
                </RemoveBudgetButton>
              </Budget>
            ))}

          {!validSection &&
            invalidBudgets.map(budget => (
              <Budget>
                <BooleanButton
                  onClick={() => handleSetSelectedBudget(budget)}
                  type="button"
                  isActive={budget.id === selectedCardBudget.id}
                  key={budget.id}
                >
                  <h1>{budget.value}</h1>
                </BooleanButton>
                <span>
                  <button
                    type="button"
                    onClick={() => validateCardBudget(budget)}
                  >
                    {budget.isValid ? (
                      <FiCheckSquare size={32} />
                    ) : (
                      <FiSquare size={32} />
                    )}
                  </button>
                </span>
                <RemoveBudgetButton
                  isActive={selectedCardBudget.id === budget.id}
                  type="button"
                  onClick={() => deleteCardBudget(budget)}
                >
                  <FiTrash size={32} />
                </RemoveBudgetButton>
              </Budget>
            ))}
        </Container>
      </WindowContainer>
    </>
  );
};

export default CardBudgetsWindow;
