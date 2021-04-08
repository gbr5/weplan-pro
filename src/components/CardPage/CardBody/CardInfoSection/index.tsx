import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiTarget } from 'react-icons/fi';
import { MdEdit, MdGroup, MdNaturePeople } from 'react-icons/md';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useFunnel } from '../../../../hooks/funnel';
import { useSignUp } from '../../../../hooks/signUp';
import { useStageCard } from '../../../../hooks/stageCard';
import CardBudgetsWindow from './CardBudgetsWindow';
import CardCustomersWindow from './CardCustomersWindow';
import CardParticipantsWindow from './CardParticipantsWindow';

import {
  Container,
  ButtonArrowMenu,
  ButtonContainer,
  CardParticipantsButton,
} from './styles';

const CardInfoSection: React.FC = () => {
  const { selectedFunnelCardInfoFields } = useFunnel();
  const { selectedCard, funnelCardInfos } = useStageCard();
  const { getUserProfile } = useSignUp();
  const { customersContacts } = useCompanyContact();
  const [cardInfo, setCardInfo] = useState(false);
  const [cardParticipantsWindow, setCardParticipantsWindow] = useState(false);
  const [cardCustomersWindow, setCardCustomersWindow] = useState(false);
  const [cardBudgetsWindow, setCardBudgetsWindow] = useState(false);
  const [cardOwner, setCardOwner] = useState<IUserDTO>({} as IUserDTO);

  const handleCloseAllWindows = useCallback(() => {
    setCardParticipantsWindow(false);
    setCardBudgetsWindow(false);
  }, []);

  const getCardOwner = useCallback(async () => {
    const response = await getUserProfile(selectedCard.card_owner);
    response && setCardOwner(response);
  }, [selectedCard, getUserProfile]);

  useEffect(() => {
    getCardOwner();
  }, [getCardOwner]);

  return (
    <>
      {cardParticipantsWindow && (
        <CardParticipantsWindow
          handleCloseWindow={handleCloseAllWindows}
          onHandleCloseWindow={() => setCardParticipantsWindow(false)}
        />
      )}
      {cardCustomersWindow && (
        <CardCustomersWindow
          handleCloseWindow={handleCloseAllWindows}
          onHandleCloseWindow={() => setCardCustomersWindow(false)}
        />
      )}
      {cardBudgetsWindow && (
        <CardBudgetsWindow
          customers={customersContacts}
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
                <p>{selectedCard.name}</p>
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
              {selectedFunnelCardInfoFields.map(field => {
                const funnelCardInfo = funnelCardInfos.find(
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
