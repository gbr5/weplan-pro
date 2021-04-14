import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, Main, CheckListContainer, CheckListHeader } from './styles';
import AddCardTaskForm from '../AddCardTaskForm';
import ICardCheckListDTO from '../../../../../../dtos/ICardCheckListDTO';
import Task from '../../../../../TaskDashboard/Task';
import TaskStatusMenu from '../../../../../TaskDashboard/TaskStatusMenu';

interface IProps {
  checkList: ICardCheckListDTO;
  getCardCheckLists: Function;
}

const CardCheckListContainer: React.FC<IProps> = ({
  checkList,
  getCardCheckLists,
}: IProps) => {
  const iconsize = 40;
  const [createCheckListTaskForm, setCreateCheckListTaskForm] = useState(false);
  const [statusSection, setStatusSection] = useState('2');

  const handleTaskStatusSection = useCallback((e: string) => {
    setStatusSection(e);
  }, []);

  const handleCloseCreateCheckListTaskForm = useCallback(() => {
    setCreateCheckListTaskForm(false);
  }, []);

  return (
    <>
      {createCheckListTaskForm && (
        <AddCardTaskForm
          cardCheckList={checkList}
          handleCloseWindow={handleCloseCreateCheckListTaskForm}
          onHandleCloseWindow={() => setCreateCheckListTaskForm(false)}
          getCardCheckLists={getCardCheckLists}
        />
      )}
      <Main>
        <CheckListContainer>
          <CheckListHeader>
            <h2>{checkList.check_list.name}</h2>
            <button
              type="button"
              onClick={() => setCreateCheckListTaskForm(true)}
            >
              <MdAdd size={iconsize} />
            </button>
          </CheckListHeader>
          <TaskStatusMenu
            currentSection={statusSection}
            handleSection={handleTaskStatusSection}
          />
          <Container>
            {statusSection === '1' &&
              checkList.check_list.tasks
                .filter(task => task.status === '1')
                .map(task => {
                  return (
                    <Task key={task.id} backgroundColor="#ebf8ff" task={task} />
                  );
                })}
            {statusSection === '2' &&
              checkList.check_list.tasks
                .filter(task => task.status === '2')
                .map(task => {
                  return (
                    <Task key={task.id} backgroundColor="#fddede" task={task} />
                  );
                })}
            {statusSection === '3' &&
              checkList.check_list.tasks
                .filter(task => task.status === '3')
                .map(task => {
                  return (
                    <Task key={task.id} backgroundColor="#e6fffa" task={task} />
                  );
                })}
          </Container>
        </CheckListContainer>
      </Main>
    </>
  );
};

export default CardCheckListContainer;
