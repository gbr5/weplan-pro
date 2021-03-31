import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiTarget } from 'react-icons/fi';
import { MdEdit, MdGroup, MdNaturePeople } from 'react-icons/md';
import ICardCustomerDTO from '../../../../dtos/ICardCustomerDTO';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import IFunnelCardInfoDTO from '../../../../dtos/IFunnelCardInfoDTO';
import IFunnelCardInfoFieldDTO from '../../../../dtos/IFunnelCardInfoFieldDTO';
import IFunnelDTO from '../../../../dtos/IFunnelDTO';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useEmployeeAuth } from '../../../../hooks/employeeAuth';
import api from '../../../../services/api';
import CardBudgetsWindow from './CardBudgetsWindow';
import CardCustomersWindow from './CardCustomersWindow';
import CardParticipantsWindow from './CardParticipantsWindow';

import {
  Container,
  ButtonArrowMenu,
  ButtonContainer,
  CardParticipantsButton,
} from './styles';

interface IProps {
  card: IStageCardDTO;
  selectedFunnel: string;
}

const CardInfoSection: React.FC<IProps> = ({ card, selectedFunnel }) => {
  const { employee } = useEmployeeAuth();

  const [cardInfo, setCardInfo] = useState(false);
  const [cardParticipantsWindow, setCardParticipantsWindow] = useState(false);
  const [cardCustomersWindow, setCardCustomersWindow] = useState(false);
  const [cardBudgetsWindow, setCardBudgetsWindow] = useState(false);
  const [cardOwner, setCardOwner] = useState<IUserDTO>({} as IUserDTO);
  const [customers, setCustomers] = useState<ICompanyContactDTO[]>([]);
  const [funnel, setFunnel] = useState<IFunnelDTO>({} as IFunnelDTO);
  const [
    selectedFunnelCardInfoField,
    setSelectedFunnelCardInfoField,
  ] = useState<IFunnelCardInfoFieldDTO[]>([]);
  const [selectedFunnelCardInfo, setSelectedFunnelCardInfo] = useState<
    IFunnelCardInfoDTO[]
  >([]);

  useEffect(() => {
    const thisFunnel = employee.company.supplierFunnels.find(
      xFunnel => xFunnel.name === selectedFunnel,
    );

    if (thisFunnel) {
      setFunnel(thisFunnel);
    } else {
      setFunnel(employee.company.supplierFunnels[0]);
    }
  }, [employee.company.supplierFunnels, selectedFunnel]);

  const handleCloseAllWindows = useCallback(() => {
    setCardParticipantsWindow(false);
    setCardBudgetsWindow(false);
  }, []);
  const getFunnelCardInfoField = useCallback(() => {
    try {
      api
        .get(`/funnels/company-funnel-card-info-field/${funnel.id}`)
        .then(response => {
          setSelectedFunnelCardInfoField(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [funnel]);
  const getFunnelCardInfo = useCallback(() => {
    try {
      api
        .get(`/funnels/card/company-funnel-card-info/${card.unique_name}`)
        .then(response => {
          setSelectedFunnelCardInfo(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  const getCardOwner = useCallback(() => {
    try {
      api.get<IUserDTO>(`/users/${card.card_owner}`).then(response => {
        setCardOwner(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);
  const getCardCustomers = useCallback(() => {
    try {
      api
        .get<ICardCustomerDTO[]>(`/card/customers/${card.unique_name}`)
        .then(response => {
          setCustomers(
            response.data.map(xCardCustomer => xCardCustomer.customer),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card]);

  useEffect(() => {
    getCardCustomers();
  }, [getCardCustomers]);

  useEffect(() => {
    if (funnel.id) {
      getFunnelCardInfoField();
    }
  }, [getFunnelCardInfoField, funnel]);

  useEffect(() => {
    getFunnelCardInfo();
  }, [getFunnelCardInfo]);

  useEffect(() => {
    getCardOwner();
  }, [getCardOwner]);

  return (
    <>
      {cardParticipantsWindow && (
        <CardParticipantsWindow
          handleCloseWindow={handleCloseAllWindows}
          card={card}
          onHandleCloseWindow={() => setCardParticipantsWindow(false)}
        />
      )}
      {cardCustomersWindow && (
        <CardCustomersWindow
          handleCloseWindow={handleCloseAllWindows}
          card={card}
          onHandleCloseWindow={() => setCardCustomersWindow(false)}
        />
      )}
      {cardBudgetsWindow && (
        <CardBudgetsWindow
          card={card}
          customers={customers}
          onHandleCloseWindow={() => setCardBudgetsWindow(false)}
        />
      )}
      {cardInfo ? (
        <Container>
          <ButtonArrowMenu type="button" onClick={() => setCardInfo(false)}>
            <FiChevronLeft size={40} />
          </ButtonArrowMenu>

          <h3>Informações do Card</h3>
          <div>
            <CardParticipantsButton
              type="button"
              onClick={() => setCardBudgetsWindow(true)}
            >
              <strong>Orçamentos</strong>
              <FiTarget size={32} />
            </CardParticipantsButton>
            <CardParticipantsButton
              type="button"
              onClick={() => setCardParticipantsWindow(true)}
            >
              <strong>Participantes da empresa</strong>
              <MdGroup size={32} />
            </CardParticipantsButton>
            <CardParticipantsButton
              type="button"
              onClick={() => setCardCustomersWindow(true)}
            >
              <strong>Clientes</strong>
              <MdNaturePeople size={32} />
            </CardParticipantsButton>
            <div>
              <span>
                <strong>Nome:</strong>
                <p>{card.name}</p>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
              <span>
                <strong>Responsável:</strong>
                <p>{cardOwner.name}</p>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
              <span>
                <strong>Due_date:</strong>
                <p>20/04/20</p>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
              <span>
                <strong>Última atualização:</strong>
                <p>15/04/20</p>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
              <span>
                <strong>Data de criação:</strong>
                <p>15/03/20</p>
                <button type="button">
                  <MdEdit />
                </button>
              </span>
            </div>
            <div>
              {selectedFunnelCardInfoField.map(field => {
                const funnelCardInfo = selectedFunnelCardInfo.find(
                  info => info.funnel_card_field_id === field.id,
                );

                if (funnelCardInfo) {
                  return (
                    <span key={field.id}>
                      <strong>{field.name}:</strong>
                      <p>{funnelCardInfo.response}</p>
                      <button type="button">
                        <MdEdit />
                      </button>
                    </span>
                  );
                }
                return '';
              })}
            </div>
          </div>
        </Container>
      ) : (
        <ButtonContainer>
          <ButtonArrowMenu type="button" onClick={() => setCardInfo(true)}>
            <FiChevronRight size={40} />
          </ButtonArrowMenu>
        </ButtonContainer>
      )}
    </>
  );
};

export default CardInfoSection;
