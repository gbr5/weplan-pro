import React, { useCallback, useState } from 'react';
import ICheckListDTO from '../../../../dtos/ICheckListDTO';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';
import { useCheckList } from '../../../../hooks/checkList';
import { useEmployeeAuth } from '../../../../hooks/employeeAuth';
import { useStageCard } from '../../../../hooks/stageCard';
import Button from '../../../Button';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';
import WindowContainer from '../../../WindowContainer';
import CreateTask from '../../CreateTask';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
}

const SelectNewTaskCheckList: React.FC<IProps> = ({ closeWindow }) => {
  const { employee } = useEmployeeAuth();
  const { getOwnerCards } = useStageCard();
  const { getCardCheckList } = useCheckList();

  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [employeeCards, setEmployeeCards] = useState<IStageCardDTO[]>([]);
  const [selectedCheckList, setSelectedCheckList] = useState(
    {} as ICheckListDTO,
  );
  const [
    selectCardCheckListConfirmation,
    setSelectCardCheckListConfirmation,
  ] = useState(true);
  const [selectCardCheckList, setSelectCardCheckList] = useState(true);

  const handleSelectEmployeeCheckList = useCallback(() => {
    if (employee && employee.checkList && employee.checkList.check_list) {
      setSelectedCheckList(employee.checkList.check_list);
      setSelectCardCheckListConfirmation(false);
      setCreateTaskWindow(true);
    }
  }, [employee]);

  const handleSelectCardCheckList = useCallback(async () => {
    const response = await getOwnerCards(employee.employeeUser.id);
    if (response.length <= 0) return handleSelectEmployeeCheckList();
    setEmployeeCards(response);
    setSelectCardCheckListConfirmation(false);
    return setSelectCardCheckList(true);
  }, [getOwnerCards, employee, handleSelectEmployeeCheckList]);

  const handleSelectCard = useCallback(
    async (e: IStageCardDTO) => {
      const response = await getCardCheckList(e.unique_name);
      setSelectedCheckList(response);
      setSelectCardCheckList(false);
      setCreateTaskWindow(true);
    },
    [getCardCheckList],
  );

  const handleCreateTaskWindow = useCallback((e: boolean) => {
    setCreateTaskWindow(e);
  }, []);

  return (
    <>
      {selectCardCheckListConfirmation && (
        <ConfirmationWindow
          closeWindow={closeWindow}
          firstButtonFunction={handleSelectEmployeeCheckList}
          firstButtonLabel="Não"
          message="Deseja adicionar a tarefa a algum 'Negócio'?"
          secondButtonFunction={handleSelectCardCheckList}
          secondButtonLabel="Sim"
          zIndex={15}
        />
      )}
      {selectCardCheckList && employeeCards.length > 0 && (
        <WindowContainer
          onHandleCloseWindow={() => closeWindow()}
          containerStyle={{
            zIndex: 15,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <Container>
            <h2>Selecione o Negócio</h2>
            {employeeCards.map(card => {
              return (
                <Button
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  type="button"
                >
                  {card.name}
                </Button>
              );
            })}
          </Container>
        </WindowContainer>
      )}
      {createTaskWindow && selectedCheckList && selectedCheckList.id && (
        <CreateTask
          checkList={selectedCheckList}
          closeWindow={() => handleCreateTaskWindow(false)}
        />
      )}
    </>
  );
};

export default SelectNewTaskCheckList;
