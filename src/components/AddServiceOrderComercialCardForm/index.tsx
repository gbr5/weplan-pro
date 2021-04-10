import React, { useCallback, useEffect, useState } from 'react';
import WindowContainer from '../WindowContainer';
import { useToast } from '../../hooks/toast';

import { Container, Employee } from './styles';
import api from '../../services/api';
import SelectStageWindow from '../SelectStageWindow';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import ICustomerServiceOrderDTO from '../../dtos/ICustomerServiceOrderDTO';
import IUserEmployeeDTO from '../../dtos/IUserEmployeeDTO';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import { useEmployeeAuth } from '../../hooks/employeeAuth';
import { useFunnel } from '../../hooks/funnel';

interface IProps {
  closeWindow: Function;
  getCustomerServiceOrder: Function;
  handleCloseAllWindow: Function;
  serviceOrder: ICustomerServiceOrderDTO;
}

const AddServiceOrderComercialCardForm: React.FC<IProps> = ({
  closeWindow,
  getCustomerServiceOrder,
  handleCloseAllWindow,
  serviceOrder,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();
  const { funnels } = useFunnel();

  const [cardName, setCardName] = useState('');
  const [cardUniqueName, setCardUniqueName] = useState('');
  const [selectStageWindow, setSelectStageWindow] = useState(false);
  const [
    selectCompanyEmployeeWindow,
    setSelectCompanyEmployeeWindow,
  ] = useState(false);
  const [addPersonAsCardOwner, setAddPersonAsCardOwner] = useState(false);
  const [
    addPersonAsCardOwnerQuestion,
    setAddPersonAsCardOwnerQuestion,
  ] = useState(true);
  const [addPersonAsCardParticipant, setAddPersonAsCardParticipant] = useState(
    false,
  );
  const [
    addPersonAsCardParticipantQuestion,
    setAddPersonAsCardParticipantQuestion,
  ] = useState(false);
  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>();
  const [stages, setStages] = useState<IFunnelStageDTO[]>([]);
  const [companyEmployees, setCompanyEmployees] = useState<IUserEmployeeDTO[]>(
    [],
  );
  const [selectedCompanyEmployee, setSelectedCompanyEmployee] = useState<
    IUserEmployeeDTO
  >({} as IUserEmployeeDTO);

  const getCompanyEmployees = useCallback(() => {
    try {
      api
        .get<IUserEmployeeDTO[]>(`/supplier-employees/${employee.company.id}`)
        .then(response => {
          setCompanyEmployees(
            response.data.filter(thisEmployee => thisEmployee.isActive),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [employee.company]);

  useEffect(() => {
    getCompanyEmployees();
  }, [getCompanyEmployees]);

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

      if (addPersonAsCardOwner) {
        const response = await api.post(`funnels/${selectedStage.id}/cards`, {
          weplanEvent: false,
          name: cardName,
          card_owner: employee.employeeUser.id,
        });
        Promise.all([
          api.post(`/card/customer-service-orders`, {
            customer_service_order_id: serviceOrder.id,
            card_unique_name: cardName,
          }),
          api.post(`card/participants`, {
            user_id: employee.id,
            card_unique_name: response.data.card_unique_name,
          }),
        ]);
      } else {
        const response = await api.post<IStageCardDTO>(
          `funnels/${selectedStage.id}/cards`,
          {
            weplanEvent: false,
            name: cardName,
            card_owner: selectedCompanyEmployee.employee.id,
          },
        );
        setCardUniqueName(response.data.unique_name);
        Promise.all([
          api.post(`/card/customer-service-orders`, {
            customer_service_order_id: serviceOrder.id,
            card_unique_name: cardName,
          }),
          api.post(`card/participants`, {
            user_id: selectedCompanyEmployee.id,
            card_unique_name: response.data.unique_name,
          }),
        ]);
      }

      if (addPersonAsCardParticipant) {
        await api.post(`card/participants`, {
          user_id: selectedCompanyEmployee.id,
          card_unique_name: cardUniqueName,
        });

        closeWindow();
        return addToast({
          type: 'success',
          title: 'Card criado com sucesso',
          description: 'Você já pode visualizá-lo no seu dashboard.',
        });
      }
      await api.put(`/service-order/customer/${serviceOrder.id}`, {
        isResponded: true,
      });
      getCustomerServiceOrder();
      handleCloseAllWindow();

      closeWindow();
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
    getCustomerServiceOrder,
    closeWindow,
    serviceOrder,
    handleCloseAllWindow,
    employee,
    addPersonAsCardOwner,
    addPersonAsCardParticipant,
    selectedCompanyEmployee,
    cardUniqueName,
  ]);

  const handleCloseSelectStageWindow = useCallback(() => {
    setSelectStageWindow(false);
  }, []);

  useEffect(() => {
    const thisFunnel = funnels.find(funnel => funnel.name === 'Comercial');
    if (thisFunnel && thisFunnel.stages.length > 0) {
      setStages(thisFunnel.stages);
    } else {
      closeWindow();
    }
  }, [funnels, closeWindow]);

  const handlePersonAsCardOwnerQuestion = useCallback((props: boolean) => {
    if (props) {
      setAddPersonAsCardOwner(true);
      setAddPersonAsCardOwnerQuestion(false);
    } else {
      setAddPersonAsCardOwner(false);
      setAddPersonAsCardOwnerQuestion(false);
      setAddPersonAsCardParticipantQuestion(true);
    }
  }, []);
  const handlePersonAsCardParticipantQuestion = useCallback(
    (props: boolean) => {
      setAddPersonAsCardParticipant(props);
      setAddPersonAsCardParticipantQuestion(false);
      setSelectCompanyEmployeeWindow(true);
    },
    [],
  );
  const handleSetSelectedEmployee = useCallback((props: IUserEmployeeDTO) => {
    setSelectedCompanyEmployee(props);
    setSelectCompanyEmployeeWindow(false);
    setSelectStageWindow(true);
  }, []);

  return (
    <>
      <WindowContainer
        onHandleCloseWindow={() => closeWindow()}
        containerStyle={{
          zIndex: 13,
          top: '38%',
          left: '20%',
          height: '24%',
          width: '60%',
        }}
      >
        <Container>
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
          stages={stages}
          closeWindow={handleCloseSelectStageWindow}
          handleSetSelectedStage={(e: IFunnelStageDTO) => setSelectedStage(e)}
        />
      )}
      {addPersonAsCardOwnerQuestion && (
        <WindowContainer
          onHandleCloseWindow={() => closeWindow()}
          containerStyle={{
            zIndex: 200,
            top: '38%',
            left: '20%',
            height: '24%',
            width: '60%',
          }}
        >
          <h2>Você será o dono do card?</h2>
          <div>
            <button
              type="button"
              onClick={() => handlePersonAsCardOwnerQuestion(true)}
            >
              Sim
            </button>
            <button
              type="button"
              onClick={() => handlePersonAsCardOwnerQuestion(false)}
            >
              Não
            </button>
          </div>
        </WindowContainer>
      )}
      {selectCompanyEmployeeWindow && (
        <WindowContainer
          onHandleCloseWindow={() => closeWindow()}
          containerStyle={{
            zIndex: 18,
            top: '38%',
            left: '20%',
            height: '24%',
            width: '60%',
          }}
        >
          {companyEmployees.map(thisEmployee => {
            return (
              <div key={thisEmployee.id}>
                <Employee
                  type="button"
                  onClick={() => handleSetSelectedEmployee(thisEmployee)}
                >
                  <p>{thisEmployee.employee.name}</p>
                </Employee>
              </div>
            );
          })}
        </WindowContainer>
      )}
      {addPersonAsCardParticipantQuestion && (
        <WindowContainer
          onHandleCloseWindow={() => closeWindow()}
          containerStyle={{
            zIndex: 15,
            top: '38%',
            left: '20%',
            height: '24%',
            width: '60%',
          }}
        >
          <h2>Você será deseja ser adicionado como participante do card?</h2>
          <div>
            <button
              type="button"
              onClick={() => handlePersonAsCardParticipantQuestion(true)}
            >
              Sim
            </button>
            <button
              type="button"
              onClick={() => handlePersonAsCardParticipantQuestion(false)}
            >
              Não
            </button>
          </div>
        </WindowContainer>
      )}
    </>
  );
};

export default AddServiceOrderComercialCardForm;
