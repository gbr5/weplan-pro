import React from 'react';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
  customers: ICompanyContactDTO[];
  handleSelectCustomer: Function;
}

const SelectCustomerWindow: React.FC<IProps> = ({
  closeWindow,
  customers,
  handleSelectCustomer,
}: IProps) => {
  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Container>
        {customers.map(xCustomer => (
          <button
            key={xCustomer.id}
            type="button"
            onClick={() => handleSelectCustomer(xCustomer)}
          >
            {xCustomer.name}
          </button>
        ))}
      </Container>
    </WindowContainer>
  );
};

export default SelectCustomerWindow;
