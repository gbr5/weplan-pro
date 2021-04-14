import React, { useCallback, useState } from 'react';
import WindowContainer from '../../../../../WindowContainer';
import { useToast } from '../../../../../../hooks/toast';

import { Container } from './styles';
import api from '../../../../../../services/api';
import { useEmployeeAuth } from '../../../../../../hooks/employeeAuth';
import { useStageCard } from '../../../../../../hooks/stageCard';

interface IProps {
  closeWindow: Function;
}

const CreateCheckListForm: React.FC<IProps> = ({ closeWindow }: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();
  const { selectedCard, getCardCheckLists } = useStageCard();

  const now = new Date();
  const day = now.getDate() + 3;
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const [checkListName, setCheckListName] = useState('');
  // const [checkListColor, setCheckListColor] = useState('rgb(179, 182, 178)');
  // const [checkListIsActive, setCheckListIsActive] = useState(true);
  // const [checkListPriority, setCheckListPriority] = useState('neutral');
  // const [checkListDueDate, setCheckListDueDate] = useState(
  //   `${day}/${month}/${year}`,
  // );

  const handleSubmit = useCallback(async () => {
    try {
      if (checkListName === '') {
        return addToast({
          type: 'error',
          title: 'Erro ao adicionar CARD',
          description: 'O nome do CARD deve ser preenchido, tente novamente.',
        });
      }
      const response = await api.post(`check-lists`, {
        user_id: employee.company.id,
        name: checkListName,
        color: 'rgb(179, 182, 178)',
        isActive: true,
        priority: 'neutral',
        due_date: `${day}/${month}/${year}`,
      });

      await api.post(`card/check-lists`, {
        card_id: selectedCard.id,
        check_list_id: response.data.id,
        card_unique_name: selectedCard.unique_name,
      });

      getCardCheckLists();
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
    checkListName,
    closeWindow,
    employee,
    selectedCard,
    day,
    month,
    year,
    getCardCheckLists,
  ]);

  return (
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
      <Container>
        <input
          placeholder="Nome do card"
          onChange={e => setCheckListName(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Criar card
        </button>
      </Container>
    </WindowContainer>
  );
};

export default CreateCheckListForm;
