import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MdDelete } from 'react-icons/md';
import ICardParticipantDTO from '../../../../../dtos/ICardParticipantDTO';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import { useAuth } from '../../../../../hooks/auth';
import { useToast } from '../../../../../hooks/toast';
import api from '../../../../../services/api';
import WindowContainer from '../../../../WindowContainer';
import AddCardParticipantForm from '../AddCardParticipantForm';

import {
  Container,
  BooleanButton,
  RemoveParticipantButton,
  Participant,
  AddParticipantButton,
} from './styles';

interface IProps {
  card: IStageCardDTO;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const CardParticipantsWindow: React.FC<IProps> = ({
  card,
  handleCloseWindow,
  onHandleCloseWindow,
}: IProps) => {
  const { person } = useAuth();
  const { addToast } = useToast();

  const [createCardParticipantForm, setCreateCardParticipantForm] = useState(
    false,
  );
  const [selectedCardParticipant, setSelectedCardParticipant] = useState<
    ICardParticipantDTO
  >({} as ICardParticipantDTO);
  const [participants, setParticipants] = useState<ICardParticipantDTO[]>([]);

  const handleCloseParticipantForm = useCallback(() => {
    setCreateCardParticipantForm(false);
  }, []);

  const handleSetSelectedParticipant = useCallback(
    (props: ICardParticipantDTO) => {
      if (props.id === selectedCardParticipant.id) {
        return setSelectedCardParticipant({} as ICardParticipantDTO);
      }
      return setSelectedCardParticipant(props);
    },
    [selectedCardParticipant],
  );

  const addUserAsCardParticipant = useCallback(async () => {
    try {
      await api.post('card/participants', {
        user_id: person.id,
        card_unique_name: card.unique_name,
      });
      handleCloseWindow();
    } catch (err) {
      throw new Error(err);
    }
  }, [handleCloseWindow, person, card]);

  const getCardParticipants = useCallback(() => {
    try {
      api
        .get<ICardParticipantDTO[]>(`card/participants/${card.unique_name}`)
        .then(response => {
          const personParticipant = response.data.find(
            xParticipant => xParticipant.participant.id === person.id,
          );
          personParticipant === undefined && addUserAsCardParticipant();
          setParticipants(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [card, addUserAsCardParticipant, person]);

  const deleteCardParticipant = useCallback(
    async (props: ICardParticipantDTO) => {
      try {
        if (props.id === selectedCardParticipant.id) {
          await api.delete(`card/participants/${selectedCardParticipant.id}`);
          getCardParticipants();
          return addToast({
            type: 'success',
            title: 'Participante removido com sucesso',
            description: 'As alterações já foram propagadas.',
          });
        }
        return setSelectedCardParticipant(props);
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectedCardParticipant, getCardParticipants, addToast],
  );

  useEffect(() => {
    getCardParticipants();
  }, [getCardParticipants]);

  return (
    <>
      {createCardParticipantForm && (
        <AddCardParticipantForm
          onHandleCloseWindow={() => setCreateCardParticipantForm(false)}
          handleCloseWindow={handleCloseParticipantForm}
          card={card}
          getCardParticipants={getCardParticipants}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 25,
          top: '20%',
          left: '20%',
          height: '60%',
          width: '60%',
        }}
      >
        <Container>
          <div>
            <AddParticipantButton
              type="button"
              onClick={() => setCreateCardParticipantForm(true)}
            >
              <strong>Adicionar Participante</strong>
            </AddParticipantButton>
          </div>
          {participants.map(participant => (
            <Participant key={participant.id}>
              <BooleanButton
                onClick={() => handleSetSelectedParticipant(participant)}
                type="button"
                isActive={participant.id === selectedCardParticipant.id}
                key={participant.id}
              >
                <h1>{participant.participant.name}</h1>
              </BooleanButton>
              {card.card_owner !== participant.participant.id && (
                <RemoveParticipantButton
                  type="button"
                  isActive={participant.id === selectedCardParticipant.id}
                  onClick={() => deleteCardParticipant(participant)}
                >
                  <MdDelete size={32} />
                </RemoveParticipantButton>
              )}
            </Participant>
          ))}
        </Container>
      </WindowContainer>
    </>
  );
};

export default CardParticipantsWindow;
