import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MdDelete } from 'react-icons/md';
import ICardCustomerDTO from '../../../../../dtos/ICardCustomerDTO';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import WindowContainer from '../../../../WindowContainer';
import CreateCardCustomerForm from '../CreateCardCustomerForm';

import {
  Container,
  BooleanButton,
  RemoveCustomerButton,
  Customer,
  AddCustomerButton,
} from './styles';

interface IProps {
  card: IStageCardDTO;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const CardCustomersWindow: React.FC<IProps> = ({
  card,
  handleCloseWindow,
  onHandleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [createCardCustomerForm, setCreateCardCustomerForm] = useState(false);
  const [selectedCardCustomer, setSelectedCardCustomer] = useState<
    ICardCustomerDTO
  >({} as ICardCustomerDTO);
  const [customers, setCustomers] = useState<ICardCustomerDTO[]>([]);

  const handleCloseCustomerForm = useCallback(() => {
    setCreateCardCustomerForm(false);
  }, []);

  const handleSetSelectedCustomer = useCallback(
    (props: ICardCustomerDTO) => {
      if (props.id === selectedCardCustomer.id) {
        return setSelectedCardCustomer({} as ICardCustomerDTO);
      }
      return setSelectedCardCustomer(props);
    },
    [selectedCardCustomer],
  );

  const getCardCustomers = useCallback(() => {
    try {
      api
        .get<ICardCustomerDTO[]>(`card/customers/${card.unique_name}`)
        .then(response => {
          setCustomers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  const deleteCardCustomer = useCallback(
    async (props: ICardCustomerDTO) => {
      try {
        if (props.id === selectedCardCustomer.id) {
          await api.delete(`card/customers/${selectedCardCustomer.id}`);
          getCardCustomers();
          handleCloseWindow();
          return addToast({
            type: 'success',
            title: 'Customere removido com sucesso',
            description: 'As alterações já foram propagadas.',
          });
        }
        return setSelectedCardCustomer(props);
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectedCardCustomer, getCardCustomers, handleCloseWindow, addToast],
  );

  useEffect(() => {
    getCardCustomers();
  }, [getCardCustomers]);

  return (
    <>
      {createCardCustomerForm && (
        <CreateCardCustomerForm
          onHandleCloseWindow={() => setCreateCardCustomerForm(false)}
          handleCloseWindow={handleCloseCustomerForm}
          card={card}
          getCardCustomers={getCardCustomers}
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
            <AddCustomerButton
              type="button"
              onClick={() => setCreateCardCustomerForm(true)}
            >
              <strong>Adicionar Customere</strong>
            </AddCustomerButton>
          </div>
          {customers.map(customer => (
            <Customer key={customer.id}>
              <BooleanButton
                onClick={() => handleSetSelectedCustomer(customer)}
                type="button"
                isActive={customer.id === selectedCardCustomer.id}
                key={customer.id}
              >
                <h1>{customer.customer.name}</h1>
              </BooleanButton>
              {card.card_owner !== customer.customer.id && (
                <RemoveCustomerButton
                  type="button"
                  isActive={customer.id === selectedCardCustomer.id}
                  onClick={() => deleteCardCustomer(customer)}
                >
                  <MdDelete size={32} />
                </RemoveCustomerButton>
              )}
            </Customer>
          ))}
        </Container>
      </WindowContainer>
    </>
  );
};

export default CardCustomersWindow;
