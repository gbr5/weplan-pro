import React, { useCallback, useState } from 'react';
import { MdAdd, MdCloudDone, MdFlag, MdLightbulbOutline } from 'react-icons/md';

import { FiRss } from 'react-icons/fi';
import sleepyTask from '../../../../../../assets/sleepyTask1.svg';
import runningTask from '../../../../../../assets/runningTask1.svg';
import doneTask from '../../../../../../assets/doneTask1.svg';

import {
  Container,
  Task,
  Main,
  StatusMenuButtonContainer,
  StatusMenuButton,
  ButtonContainer,
  Status,
  Priority,
  CheckListContainer,
  CheckListHeader,
} from './styles';
import TaskStatusContainer from '../TaskStatusContainer';
import TaskPriorityContainer from '../TaskPriorityContainer';
import AddCardTaskForm from '../AddCardTaskForm';
import ITaskDTO from '../../../../../../dtos/ITaskDTO';
import ICardCheckListDTO from '../../../../../../dtos/ICardCheckListDTO';

interface IProps {
  checkList: ICardCheckListDTO;
  getCardCheckLists: Function;
}

const CardCheckListContainer: React.FC<IProps> = ({
  checkList,
  getCardCheckLists,
}: IProps) => {
  const iconsize = 32;
  const [createCheckListTaskForm, setCreateCheckListTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskDTO>({} as ITaskDTO);
  const [statusWindow, setStatusWindow] = useState(false);
  const [statusSection, setStatusSection] = useState('2');
  const [priorityWindow, setPriorityWindow] = useState(false);

  const handleCloseAllWindows = useCallback(() => {
    setStatusWindow(false);
    setPriorityWindow(false);
  }, []);

  const handleStatusWindow = useCallback(
    (props: ITaskDTO) => {
      handleCloseAllWindows();
      setSelectedTask(props);
      setStatusWindow(true);
    },
    [handleCloseAllWindows],
  );

  const handlePriorityWindow = useCallback(
    (props: ITaskDTO) => {
      handleCloseAllWindows();
      setSelectedTask(props);
      setPriorityWindow(true);
    },
    [handleCloseAllWindows],
  );

  const handleNotStartedTasksSection = useCallback(() => {
    handleCloseAllWindows();
    setStatusSection('1');
  }, [handleCloseAllWindows]);
  const handleInProgressTasksSection = useCallback(() => {
    handleCloseAllWindows();
    setStatusSection('2');
  }, [handleCloseAllWindows]);
  const handleFinishedTasksSection = useCallback(() => {
    handleCloseAllWindows();
    setStatusSection('3');
  }, [handleCloseAllWindows]);

  const handleCloseCreateCheckListTaskForm = useCallback(() => {
    setCreateCheckListTaskForm(false);
  }, []);

  return (
    <>
      {createCheckListTaskForm && (
        <AddCardTaskForm
          handleCloseWindow={handleCloseCreateCheckListTaskForm}
          onHandleCloseWindow={() => setCreateCheckListTaskForm(false)}
          getCardCheckLists={getCardCheckLists}
          cardCheckList={checkList}
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
          <StatusMenuButtonContainer>
            <StatusMenuButton
              isActive={statusSection === '1'}
              type="button"
              onClick={handleNotStartedTasksSection}
            >
              <MdLightbulbOutline size={iconsize} />
            </StatusMenuButton>
            <StatusMenuButton
              isActive={statusSection === '2'}
              type="button"
              onClick={handleInProgressTasksSection}
            >
              <FiRss size={iconsize} />
            </StatusMenuButton>
            <StatusMenuButton
              isActive={statusSection === '3'}
              type="button"
              onClick={handleFinishedTasksSection}
            >
              <MdCloudDone size={iconsize} />
            </StatusMenuButton>
          </StatusMenuButtonContainer>
          <Container>
            {statusWindow && (
              <TaskStatusContainer
                handleCloseWindow={() => setStatusWindow(false)}
                task={selectedTask}
                getEmployeeTasks={getCardCheckLists}
                onHandleCloseWindow={() => setStatusWindow(false)}
              />
            )}
            {priorityWindow && (
              <TaskPriorityContainer
                handleCloseWindow={() => setPriorityWindow(false)}
                task={selectedTask}
                getEmployeeTasks={getCardCheckLists}
                onHandleCloseWindow={() => setPriorityWindow(false)}
              />
            )}
            {statusSection === '1' &&
              checkList.check_list.tasks
                .filter(xTask => xTask.status === '1')
                .map(task => (
                  <Task style={{ background: `${task.color}` }} key={task.id}>
                    <div>
                      <h2>{task.task}</h2>
                      <ButtonContainer>
                        <Priority
                          type="button"
                          onClick={() => handlePriorityWindow(task)}
                        >
                          <h3>Prioridade:</h3>
                          {task.priority === 'low' && (
                            <>
                              <p>Não prioritária</p>
                              <MdFlag size={40} style={{ color: 'green' }} />
                            </>
                          )}
                          {task.priority === 'neutral' && (
                            <>
                              <p>Neutra</p>
                              <MdFlag size={40} style={{ color: 'yellow' }} />
                            </>
                          )}
                          {task.priority === 'high' && (
                            <>
                              <p>Urgente</p>
                              <MdFlag size={40} style={{ color: 'red' }} />
                            </>
                          )}
                        </Priority>
                        <Status
                          type="button"
                          onClick={() => handleStatusWindow(task)}
                        >
                          <h3>Status:</h3>
                          {task.status === '1' && (
                            <>
                              <p>Não iniciada</p>
                              <img
                                src={sleepyTask}
                                alt="Sleepy Task - We Plan"
                              />
                            </>
                          )}
                        </Status>
                      </ButtonContainer>
                      <span>
                        <p>Criado: {task.created_at}</p>
                        <p>Atualizado: {task.updated_at}</p>
                        <p>Data de entrega: {task.due_date}</p>
                      </span>
                    </div>
                  </Task>
                ))}
            {statusSection === '2' &&
              checkList.check_list.tasks
                .filter(xTask => xTask.status === '2')
                .map(task => (
                  <Task style={{ background: `${task.color}` }} key={task.id}>
                    <div>
                      <h2>{task.task}</h2>
                      <ButtonContainer>
                        <Priority
                          type="button"
                          onClick={() => handlePriorityWindow(task)}
                        >
                          <h3>Prioridade:</h3>
                          {task.priority === 'low' && (
                            <>
                              <p>Não prioritária</p>
                              <MdFlag size={40} style={{ color: 'green' }} />
                            </>
                          )}
                          {task.priority === 'neutral' && (
                            <>
                              <p>Neutra</p>
                              <MdFlag size={40} style={{ color: 'yellow' }} />
                            </>
                          )}
                          {task.priority === 'high' && (
                            <>
                              <p>Urgente</p>
                              <MdFlag size={40} style={{ color: 'red' }} />
                            </>
                          )}
                        </Priority>
                        <Status
                          type="button"
                          onClick={() => handleStatusWindow(task)}
                        >
                          <h3>Status:</h3>
                          <p>Em Execução</p>
                          <img src={runningTask} alt="Running Task - We Plan" />
                        </Status>
                      </ButtonContainer>
                      <span>
                        <p>Criado: {task.created_at}</p>
                        <p>Atualizado: {task.updated_at}</p>
                        <p>Data de entrega: {task.due_date}</p>
                      </span>
                    </div>
                  </Task>
                ))}
            {statusSection === '3' &&
              checkList.check_list.tasks
                .filter(xTask => xTask.status === '3')
                .map(task => (
                  <Task style={{ background: `${task.color}` }} key={task.id}>
                    <div>
                      <h2>{task.task}</h2>
                      <ButtonContainer>
                        <Priority
                          type="button"
                          onClick={() => handlePriorityWindow(task)}
                        >
                          <h3>Prioridade:</h3>
                          {task.priority === 'low' && (
                            <>
                              <p>Não prioritária</p>
                              <MdFlag size={40} style={{ color: 'green' }} />
                            </>
                          )}
                          {task.priority === 'neutral' && (
                            <>
                              <p>Neutra</p>
                              <MdFlag size={40} style={{ color: 'yellow' }} />
                            </>
                          )}
                          {task.priority === 'high' && (
                            <>
                              <p>Urgente</p>
                              <MdFlag size={40} style={{ color: 'red' }} />
                            </>
                          )}
                        </Priority>
                        <Status
                          type="button"
                          onClick={() => handleStatusWindow(task)}
                        >
                          <h3>Status:</h3>
                          <p>Finalizada</p>
                          <img src={doneTask} alt="Done Task - We Plan" />
                        </Status>
                      </ButtonContainer>
                      <span>
                        <p>Criado: {task.created_at}</p>
                        <p>Atualizado: {task.updated_at}</p>
                        <p>Data de entrega: {task.due_date}</p>
                      </span>
                    </div>
                  </Task>
                ))}
          </Container>
        </CheckListContainer>
      </Main>
    </>
  );
};

export default CardCheckListContainer;
