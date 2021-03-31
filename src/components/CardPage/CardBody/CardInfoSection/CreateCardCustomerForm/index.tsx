import React, { MouseEventHandler, useCallback, useState } from 'react';
import WindowContainer from '../../../../WindowContainer';
import { useToast } from '../../../../../hooks/toast';

import { Container, Contact, CompanyContactList } from './styles';
import api from '../../../../../services/api';
import ICompanyContactDTO from '../../../../../dtos/ICompanyContactDTO';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import { useEmployeeAuth } from '../../../../../hooks/employeeAuth';

interface IProps {
  card: IStageCardDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getCardCustomers: Function;
}

const CreateCardCustomerForm: React.FC<IProps> = ({
  card,
  onHandleCloseWindow,
  handleCloseWindow,
  getCardCustomers,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();

  const [employees, setContacts] = useState<ICompanyContactDTO[]>([]);
  const [customerDescription, setCustomerDescription] = useState(
    'Não tem descrição',
  );
  const [selectedContact, setSelectedContact] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );

  const getCompanyContacts = useCallback(
    (props: string) => {
      try {
        api
          .get<ICompanyContactDTO[]>(
            `company/contacts/${employee.company.id}?name=${props}`,
          )
          .then(response => {
            setContacts(response.data);
          });
      } catch (err) {
        throw new Error(err);
      }
    },
    [employee],
  );

  const handleSelectContact = useCallback(
    (props: ICompanyContactDTO) => {
      if (selectedContact.id === props.id) {
        return setSelectedContact({} as ICompanyContactDTO);
      }
      return setSelectedContact(props);
    },
    [selectedContact],
  );

  const handleSubmit = useCallback(async () => {
    try {
      await api.post(`/card/customers`, {
        customer_id: selectedContact.id,
        card_unique_name: card.unique_name,
        description: customerDescription,
      });
      getCardCustomers();
      handleCloseWindow();
      return addToast({
        type: 'success',
        title: 'Customere adicionado com sucesso',
        description: 'Ele já tem acesso ao card.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar colaborador',
        description: 'Erro ao adicionar colaborador, tente novamente.',
      });

      throw new Error(err);
    }
  }, [
    addToast,
    getCardCustomers,
    handleCloseWindow,
    selectedContact,
    card,
    customerDescription,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 30,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Container>
        <h1>Adicionar Cliente ao Card</h1>
        {!selectedContact.id ? (
          <>
            <p>Digite o nome do cliente</p>
            <input
              placeholder="Nome do cliente"
              onChange={e => getCompanyContacts(e.target.value)}
            />
            <CompanyContactList>
              {employees.map(xContact => (
                <Contact
                  isActive={xContact.id === selectedContact.id}
                  type="button"
                  onClick={() => handleSelectContact(xContact)}
                  key={xContact.id}
                >
                  <strong>{xContact.name}</strong>
                </Contact>
              ))}
            </CompanyContactList>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSelectedContact({} as ICompanyContactDTO)}
            >
              {selectedContact.name}
            </button>
            <p>Descrição</p>
            <input
              placeholder="Descrição"
              onChange={e => setCustomerDescription(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>
              Adicionar cliente
            </button>
          </>
        )}
      </Container>
    </WindowContainer>
  );
};

export default CreateCardCustomerForm;
