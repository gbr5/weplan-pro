import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiTarget } from 'react-icons/fi';
import { MdGroup, MdNaturePeople } from 'react-icons/md';
import IUserDTO from '../../../../dtos/IUserDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useFunnel } from '../../../../hooks/funnel';
import { useSignUp } from '../../../../hooks/signUp';
import { useStageCard } from '../../../../hooks/stageCard';
import formatHourDateShort from '../../../../utils/formatHourDateShort';
import SelectCustomer from '../../../GeneralComponents/SelectCustomer';
import CardBudgetsWindow from './CardBudgetsWindow';
import CardInfoButton from './CardInfoButton';
import CardParticipantsWindow from './CardParticipantsWindow';

import {
  Container,
  ButtonArrowMenu,
  ButtonContainer,
  CardParticipantsButton,
  InfoSection,
} from './styles';

const CardInfoSection: React.FC = () => {
  const { selectedFunnelCardInfoFields } = useFunnel();
  const {
    selectedCard,
    funnelCardInfos,
    getCardCheckLists,
    getCardCustomers,
    getFunnelCardInfos,
  } = useStageCard();
  const { getUserProfile } = useSignUp();
  const { customersContacts } = useCompanyContact();
  const { getFunnelCardInfoFields, selectedFunnel } = useFunnel();
  const [cardInfo, setCardInfo] = useState(false);
  const [cardParticipantsWindow, setCardParticipantsWindow] = useState(false);
  const [cardCustomersWindow, setCardCustomersWindow] = useState(false);
  const [cardBudgetsWindow, setCardBudgetsWindow] = useState(false);
  const [cardOwner, setCardOwner] = useState<IUserDTO>({} as IUserDTO);

  const handleCloseAllWindows = useCallback(() => {
    setCardParticipantsWindow(false);
    setCardBudgetsWindow(false);
    setCardCustomersWindow(false);
  }, []);

  const getCardOwner = useCallback(async () => {
    const response = await getUserProfile(selectedCard.card_owner);
    response && setCardOwner(response);
  }, [selectedCard, getUserProfile]);

  useEffect(() => {
    getCardOwner();
  }, [getCardOwner]);
  useEffect(() => {
    getCardCheckLists();
  }, [getCardCheckLists]);
  useEffect(() => {
    getCardCustomers();
  }, [getCardCustomers]);
  useEffect(() => {
    getFunnelCardInfos();
  }, [getFunnelCardInfos]);
  useEffect(() => {
    selectedFunnel &&
      selectedFunnel.id &&
      getFunnelCardInfoFields(selectedFunnel.id);
  }, [getFunnelCardInfoFields, selectedFunnel]);

  return (
    <>
      {cardParticipantsWindow && (
        <CardParticipantsWindow
          handleCloseWindow={handleCloseAllWindows}
          onHandleCloseWindow={() => setCardParticipantsWindow(false)}
        />
      )}
      {cardCustomersWindow && (
        <SelectCustomer closeWindow={handleCloseAllWindows} />
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
                <strong>Responsável:</strong>
                <p>{cardOwner.name}</p>
                {/* <button type="button">
                  <MdEdit />
                </button> */}
              </span>
              <span>
                <strong>Data de criação:</strong>
                <p>{formatHourDateShort(String(selectedCard.created_at))}</p>
              </span>
            </div>
            <InfoSection>
              {selectedFunnelCardInfoFields.map(field => {
                const funnelCardInfo = funnelCardInfos.find(
                  info => info.funnel_card_field_id === field.id,
                );

                if (funnelCardInfo) {
                  return (
                    <CardInfoButton
                      cardInfo={funnelCardInfo}
                      funnelCardInfoField={field}
                    />
                  );
                }
                return '';
              })}
            </InfoSection>
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
