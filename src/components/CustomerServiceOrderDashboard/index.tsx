import React, { useCallback, useEffect, useState } from 'react';
import ICustomerServiceOrderDTO from '../../dtos/ICustomerServiceOrderDTO';
import { useEmployeeAuth } from '../../hooks/employeeAuth';
import api from '../../services/api';
import CustomerServiceOrderWindow from '../CustomerServiceOrderWindow';

import {
  Container,
  FirstRow,
  MenuButton,
  ServiceOrder,
  ServiceOrderMenu,
} from './styles';

const CustomerServiceOrderDashboard: React.FC = () => {
  const { employee } = useEmployeeAuth();

  const [serviceOrderWindow, setServiceOrderWindow] = useState(false);
  const [respondedServiceOrders, setRespondedServiceOrders] = useState(false);
  const [
    respondedCustomerServiceOrders,
    setRespondedCustomerServiceOrders,
  ] = useState<ICustomerServiceOrderDTO[]>([]);

  const [
    notRespondedCustomerServiceOrders,
    setNotRespondedCustomerServiceOrders,
  ] = useState<ICustomerServiceOrderDTO[]>([]);

  const [
    selectedCustomerServiceOrder,
    setSelectedCustomerServiceOrder,
  ] = useState<ICustomerServiceOrderDTO>({} as ICustomerServiceOrderDTO);

  const handleRespondedServiceOrders = useCallback(() => {
    setRespondedServiceOrders(!respondedServiceOrders);
  }, [respondedServiceOrders]);

  const handleCloseServiceOrderWindow = useCallback(() => {
    setServiceOrderWindow(false);
  }, []);

  const handleSelectCustomerServiceOrder = useCallback(
    (props: ICustomerServiceOrderDTO) => {
      setSelectedCustomerServiceOrder(props);
      setServiceOrderWindow(true);
    },
    [],
  );

  const getCustomerServiceOrders = useCallback(() => {
    try {
      api
        .get<ICustomerServiceOrderDTO[]>(
          `/service-order/customer/${employee.company.id}`,
        )
        .then(response => {
          setRespondedCustomerServiceOrders(
            response.data.filter(serviceOrder => serviceOrder.isResponded),
          );
          setNotRespondedCustomerServiceOrders(
            response.data.filter(serviceOrder => !serviceOrder.isResponded),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [employee.company]);

  useEffect(() => {
    getCustomerServiceOrders();
  }, [getCustomerServiceOrders]);

  return (
    <>
      {!!serviceOrderWindow && (
        <CustomerServiceOrderWindow
          onHandleCloseWindow={() => setServiceOrderWindow(false)}
          getCustomerServiceOrder={getCustomerServiceOrders}
          handleCloseWindow={handleCloseServiceOrderWindow}
          serviceOrder={selectedCustomerServiceOrder}
        />
      )}
      <Container>
        <h2>Pedidos de Orçamento</h2>
        <ServiceOrderMenu>
          <MenuButton
            type="button"
            isActive={respondedServiceOrders}
            onClick={handleRespondedServiceOrders}
          >
            Respondidas
          </MenuButton>
          <MenuButton
            type="button"
            isActive={!respondedServiceOrders}
            onClick={handleRespondedServiceOrders}
          >
            Não Respondidas
          </MenuButton>
        </ServiceOrderMenu>
        <FirstRow>
          {respondedServiceOrders
            ? respondedCustomerServiceOrders.map(serviceOrder => {
                return (
                  <ServiceOrder
                    isActive={
                      selectedCustomerServiceOrder.id === serviceOrder.id
                    }
                    key={serviceOrder.id}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectCustomerServiceOrder(serviceOrder)
                      }
                    >
                      <p>Cliente: {serviceOrder.customer.name}</p>
                      <p>Assunto: {serviceOrder.title}</p>
                    </button>
                  </ServiceOrder>
                );
              })
            : notRespondedCustomerServiceOrders.map(serviceOrder => {
                return (
                  <ServiceOrder
                    isActive={
                      selectedCustomerServiceOrder.id === serviceOrder.id
                    }
                    key={serviceOrder.id}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectCustomerServiceOrder(serviceOrder)
                      }
                    >
                      <p>Cliente: {serviceOrder.customer.name}</p>
                      <p>Assunto: {serviceOrder.title}</p>
                    </button>
                  </ServiceOrder>
                );
              })}
        </FirstRow>
      </Container>
    </>
  );
};

export default CustomerServiceOrderDashboard;
