import React, { MouseEventHandler, useCallback, useState } from 'react';
import ICustomerServiceOrderDTO from '../../dtos/ICustomerServiceOrderDTO';
import WindowContainer from '../WindowContainer';
import AddServiceOrderComercialCardForm from '../AddServiceOrderComercialCardForm';

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
  const [
    addServiceOrderComercialCardForm,
    setAddServiceOrderComercialCardForm,
  ] = useState(false);

  const handleSetAddServiceOrderComercialCardForm = useCallback(() => {
    setAddServiceOrderComercialCardForm(true);
  }, []);
  const handleCloseAddServiceOrderComercialCardForm = useCallback(() => {
    setAddServiceOrderComercialCardForm(false);
  }, []);

  return (
    <>
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
          {!serviceOrder.isResponded && (
            <ConfirmButton
              type="button"
              onClick={handleSetAddServiceOrderComercialCardForm}
            >
              Criar Card
            </ConfirmButton>
          )}
        </List>
      </WindowContainer>
      {addServiceOrderComercialCardForm && (
        <AddServiceOrderComercialCardForm
          getCustomerServiceOrder={getCustomerServiceOrder}
          handleCloseAllWindow={handleCloseWindow}
          closeWindow={handleCloseAddServiceOrderComercialCardForm}
          serviceOrder={serviceOrder}
        />
      )}
    </>
  );
};

export default CustomerServiceOrderWindow;
