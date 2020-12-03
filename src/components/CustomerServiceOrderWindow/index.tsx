import React, { MouseEventHandler, useCallback } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import ICustomerServiceOrderDTO from '../../dtos/ICustomerServiceOrderDTO';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import { List, ConfirmButton } from './styles';

interface IProps {
  serviceOrder: ICustomerServiceOrderDTO;
  getCustomerServiceOrder: Function;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const CustomerServiceOrderWindow: React.FC<IProps> = ({
  serviceOrder,
  getCustomerServiceOrder,
  handleCloseWindow,
  onHandleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const handleSetIsResponded = useCallback(async () => {
    try {
      await api.put(`/service-order/customer/${serviceOrder.id}`, {
        isResponded: !serviceOrder.isResponded,
      });
      getCustomerServiceOrder();
      addToast({
        type: 'success',
        title: 'Pedido de orçamento atualizado com sucesso',
        description:
          'As alterações já podem ser visualizadas por toda a empresa.',
      });
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao selecionar etapa do funil',
        description: 'Selecione uma etapa do funil e tente novamente.',
      });
    }
  }, [addToast, getCustomerServiceOrder, serviceOrder, handleCloseWindow]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 12,
        top: '25%',
        left: '10%',
        height: '50%',
        width: '80%',
      }}
    >
      <List>
        <strong>{serviceOrder.title}</strong>
        <p>{serviceOrder.message}</p>
        <ConfirmButton type="button" onClick={handleSetIsResponded}>
          {serviceOrder.isResponded ? <FiCheckSquare /> : <FiSquare />}
        </ConfirmButton>
      </List>
    </WindowContainer>
  );
};

export default CustomerServiceOrderWindow;
