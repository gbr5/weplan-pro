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

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  chosenFunnel: string;
}

const AddCardForm: React.FC<IProps> = ({
  onHandleCloseWindow,
  chosenFunnel,
}: IProps) => {
  const { addToast } = useToast();
  const { funnels, person } = useAuth();

  const [cardName, setCardName] = useState('');
  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>();
  const [stages, setStages] = useState<IFunnelStageDTO[]>([]);

  const handleSubmit = useCallback(async () => {
    try {
      await api.post(`funnels/${selectedStage?.id}/cards`, {
        weplanEvent: false,
        name: cardName,
        card_owner: person.id,
      });
      addToast({
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
  }, [addToast, cardName, selectedStage, person]);

  useEffect(() => {
    const thisFunnel = funnels.find(funnel => funnel.name === chosenFunnel);
    if (thisFunnel && thisFunnel.stages.length > 0) {
      setStages(thisFunnel.stages);
    } else {
      throw new Error('Funnel not found');
    }
  }, [funnels, chosenFunnel]);
  return (
    <>
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          zIndex: 10,
          top: '10%',
          left: '20%',
          height: '80%',
          width: '60%',
        }}
      >
        {/* <Form> */}
        <Container>
          <input
            placeholder="Nome do card"
            onChange={e => setCardName(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Criar card
          </button>
        </Container>
        {/* </Form> */}
      </WindowContainer>
      {selectedStage === undefined && (
        <SelectStageWindow
          stages={stages}
          handleSetSelectedStage={(e: IFunnelStageDTO) => setSelectedStage(e)}
        />
      )}
    </>
  );
};

export default AddCardForm;
