import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import WindowContainer from '../WindowContainer';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import SelectStageWindow from '../SelectStageWindow';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';
import CreateCompanyCustomerForm from '../CreateCompanyCustomerForm';

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  handleSetCurrentFunnel: Function;
  chosenFunnel: string;
}

const AddCardForm: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  handleSetCurrentFunnel,
  chosenFunnel,
}: IProps) => {
  const { addToast } = useToast();
  const { funnels, person, company } = useAuth();

  const [cardName, setCardName] = useState('');
  const [selectStageWindow, setSelectStageWindow] = useState(true);
  const [selectCustomerWindow, setSelectCustomerWindow] = useState(false);
  const [
    createCompanyCustomerFormWindow,
    setCreateCompanyCustomerFormWindow,
  ] = useState(false);
  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>();
  const [stages, setStages] = useState<IFunnelStageDTO[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );
  const [customers, setCustomers] = useState<ICompanyContactDTO[]>([]);

  const handleCreateCompanyCustomerFormWindow = useCallback(() => {
    setCreateCompanyCustomerFormWindow(true);
  }, []);
  const handleCloseCompanyCustomerFormWindow = useCallback(() => {
    setCreateCompanyCustomerFormWindow(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (selectedStage === undefined) {
        setSelectedStage(undefined);
        return setSelectStageWindow(true);
      }
      if (cardName === '') {
        return addToast({
          type: 'error',
          title: 'Erro ao adicionar CARD',
          description: 'O nome do CARD deve ser preenchido, tente novamente.',
        });
      }
      const response = await api.post(`funnels/${selectedStage.id}/cards`, {
        weplanEvent: false,
        name: cardName,
        card_owner: person.id,
      });
      const card_unique_name = response.data.unique_name;

      await api.post(`card/participants`, {
        user_id: person.id,
        card_unique_name,
      });

      await api.post(`card/customers`, {
        customer_id: selectedCustomer.id,
        card_unique_name,
        description: card_unique_name,
      });

      handleCloseWindow();
      handleSetCurrentFunnel();
      return addToast({
        type: 'success',
        title: 'Card criado com sucesso',
        description: 'Você já pode visualizá-lo no seu dashboard.',
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
    cardName,
    selectedStage,
    person,
    selectedCustomer,
    handleCloseWindow,
    handleSetCurrentFunnel,
  ]);

  const getCompanyContacts = useCallback(() => {
    try {
      api
        .get<ICompanyContactDTO[]>(`/company/contacts/${company.id}`)
        .then(response => {
          const companyCustomers = response.data.filter(
            xCustomer => xCustomer.company_contact_type === 'Customer',
          );
          if (companyCustomers.length <= 0) {
            setCreateCompanyCustomerFormWindow(true);
          } else {
            setCustomers(companyCustomers);
            setSelectCustomerWindow(true);
          }
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company]);

  const handleSelectCustomer = useCallback((props: ICompanyContactDTO) => {
    setSelectedCustomer(props);
    setSelectCustomerWindow(false);
  }, []);

  const handleCloseSelectStageWindow = useCallback(() => {
    setSelectStageWindow(false);
  }, []);

  useEffect(() => {
    getCompanyContacts();
  }, [getCompanyContacts]);

  useEffect(() => {
    const thisFunnel = funnels.find(funnel => funnel.name === chosenFunnel);
    if (thisFunnel && thisFunnel.stages.length > 0) {
      setStages(thisFunnel.stages);
    } else {
      handleCloseWindow();
    }
  }, [funnels, chosenFunnel, handleCloseWindow]);

  return (
    <>
      {createCompanyCustomerFormWindow && (
        <CreateCompanyCustomerForm
          setSelectedCustomer={(e: ICompanyContactDTO) =>
            setSelectedCustomer(e)
          }
          handleCloseWindow={handleCloseCompanyCustomerFormWindow}
          onHandleCloseWindow={() => setCreateCompanyCustomerFormWindow(false)}
          updateCompanyContacts={getCompanyContacts}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 10,
          top: '38%',
          left: '20%',
          height: '24%',
          width: '60%',
        }}
      >
        <Container>
          <button type="button" onClick={handleCreateCompanyCustomerFormWindow}>
            Adicionar Cliente
          </button>
          <input
            placeholder="Nome do card"
            onChange={e => setCardName(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Criar card
          </button>
        </Container>
      </WindowContainer>
      {selectStageWindow && (
        <SelectStageWindow
          onHandleCloseWindow={() => setSelectStageWindow(false)}
          stages={stages}
          handleCloseWindow={handleCloseSelectStageWindow}
          handleSetSelectedStage={(e: IFunnelStageDTO) => setSelectedStage(e)}
        />
      )}
      {selectCustomerWindow && (
        <WindowContainer
          onHandleCloseWindow={onHandleCloseWindow}
          containerStyle={{
            zIndex: 15,
            top: '38%',
            left: '20%',
            height: '24%',
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
      )}
    </>
  );
};

export default AddCardForm;
