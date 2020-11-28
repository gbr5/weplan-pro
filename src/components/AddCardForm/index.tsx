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
  const { funnels, person } = useAuth();

  const [cardName, setCardName] = useState('');
  const [selectStageWindow, setSelectStageWindow] = useState(true);
  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>();
  const [stages, setStages] = useState<IFunnelStageDTO[]>([]);

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

      await api.post(`card/participants`, {
        user_id: person.id,
        card_unique_name: response.data.card_unique_name,
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
    handleCloseWindow,
    handleSetCurrentFunnel,
  ]);

  const handleCloseSelectStageWindow = useCallback(() => {
    setSelectStageWindow(false);
  }, []);

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
    </>
  );
};

export default AddCardForm;
