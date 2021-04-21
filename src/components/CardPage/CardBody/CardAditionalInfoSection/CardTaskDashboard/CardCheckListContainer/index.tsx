import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, Main, CheckListContainer, CheckListHeader } from './styles';
import AddCardTaskForm from '../AddCardTaskForm';
import Task from '../../../../../TaskDashboard/Task';
import TaskStatusMenu from '../../../../../TaskDashboard/TaskStatusMenu';
import { useCheckList } from '../../../../../../hooks/checkList';
import { sortActiveTasks } from '../../../../../../utils/sortActiveTasks';

const CardCheckListContainer: React.FC = () => {
  const { selectedCheckList, getCheckList } = useCheckList();

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
              sortActiveTasks(selectedCheckList.tasks)
                .filter(task => task.status === '1')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task update={getCheckList} key={task.id} task={task} />
                  );
                })}
            {statusSection === '2' &&
              selectedCheckList &&
              selectedCheckList.id &&
              selectedCheckList.tasks &&
              sortActiveTasks(selectedCheckList.tasks)
                .filter(task => task.status === '2')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task update={getCheckList} key={task.id} task={task} />
                  );
                })}
            {statusSection === '3' &&
              selectedCheckList &&
              selectedCheckList.id &&
              selectedCheckList.tasks &&
              sortActiveTasks(selectedCheckList.tasks)
                .filter(task => task.status === '3')
                .filter(task => task.isActive)
                .map(task => {
                  return (
                    <Task update={getCheckList} key={task.id} task={task} />
                  );
                })}
          </Container>
        </CheckListContainer>
      </Main>
    </>
  );
};

export default CardCheckListContainer;
