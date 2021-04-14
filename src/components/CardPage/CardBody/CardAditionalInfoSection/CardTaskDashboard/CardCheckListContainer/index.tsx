import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, Main, CheckListContainer, CheckListHeader } from './styles';
import AddCardTaskForm from '../AddCardTaskForm';
import Task from '../../../../../TaskDashboard/Task';
import TaskStatusMenu from '../../../../../TaskDashboard/TaskStatusMenu';
import { useStageCard } from '../../../../../../hooks/stageCard';
import { useCheckList } from '../../../../../../hooks/checkList';

const CardCheckListContainer: React.FC = () => {
  const { getCardCheckLists } = useStageCard();
  const { selectedCheckList } = useCheckList();

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
      {createCheckListTaskForm && selectedCheckList && selectedCheckList.id && (
        <AddCardTaskForm closeWindow={handleCloseCreateCheckListTaskForm} />
      )}
      <Main>
        <CheckListContainer>
          <CheckListHeader>
            <h2>
              {selectedCheckList &&
                selectedCheckList.id &&
                selectedCheckList.name}
            </h2>
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
              selectedCheckList &&
              selectedCheckList.id &&
              selectedCheckList.tasks &&
              selectedCheckList.tasks
                .filter(task => task.status === '1')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task
                      update={getCardCheckLists}
                      key={task.id}
                      backgroundColor="#ebf8ff"
                      task={task}
                    />
                  );
                })}
            {statusSection === '2' &&
              selectedCheckList &&
              selectedCheckList.id &&
              selectedCheckList.tasks &&
              selectedCheckList.tasks
                .filter(task => task.status === '2')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task
                      update={getCardCheckLists}
                      key={task.id}
                      backgroundColor="#fddede"
                      task={task}
                    />
                  );
                })}
            {statusSection === '3' &&
              selectedCheckList &&
              selectedCheckList.id &&
              selectedCheckList.tasks &&
              selectedCheckList.tasks
                .filter(task => task.status === '3')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task
                      update={getCardCheckLists}
                      key={task.id}
                      backgroundColor="#e6fffa"
                      task={task}
                    />
                  );
                })}
          </Container>
        </CheckListContainer>
      </Main>
    </>
  );
};

export default CardCheckListContainer;
