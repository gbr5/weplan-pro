import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdEdit, MdGroup } from 'react-icons/md';
import IFunnelCardInfoDTO from '../../../../dtos/IFunnelCardInfoDTO';
import IFunnelCardInfoFieldDTO from '../../../../dtos/IFunnelCardInfoFieldDTO';
import IFunnelDTO from '../../../../dtos/IFunnelDTO';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
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
  const { funnels } = useAuth();

  const [cardInfo, setCardInfo] = useState(false);
  const [cardParticipantsWindow, setCardParticipantsWindow] = useState(false);
  const [cardOwner, setCardOwner] = useState<IUserDTO>({} as IUserDTO);
  const [funnel, setFunnel] = useState<IFunnelDTO>({} as IFunnelDTO);
  const [
    selectedFunnelCardInfoField,
    setSelectedFunnelCardInfoField,
  ] = useState<IFunnelCardInfoFieldDTO[]>([]);
  const [selectedFunnelCardInfo, setSelectedFunnelCardInfo] = useState<
    IFunnelCardInfoDTO[]
  >([]);

  useEffect(() => {
    const thisFunnel = funnels.find(xFunnel => xFunnel.name === selectedFunnel);

    thisFunnel !== undefined && setFunnel(thisFunnel);
  }, [funnels, selectedFunnel]);

  const handleCloseCardParticipantWindow = useCallback(() => {
    setCardParticipantsWindow(false);
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

  useEffect(() => {
    getFunnelCardInfoField();
  }, [getFunnelCardInfoField]);

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
          handleCloseWindow={handleCloseCardParticipantWindow}
          card={card}
          onHandleCloseWindow={() => setCardParticipantsWindow(false)}
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
              onClick={() => setCardParticipantsWindow(true)}
            >
              <strong>Participantes</strong>
              <MdGroup size={32} />
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

                return (
                  <span>
                    <strong>{field.name}:</strong>
                    <p key={field.id}>{funnelCardInfo?.response}</p>
                    <button type="button">
                      <MdEdit />
                    </button>
                  </span>
                );
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
