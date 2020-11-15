import React, { useCallback, useState } from 'react';
import { MdFlag } from 'react-icons/md';

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
} from './styles';
import TaskStatusContainer from '../TaskStatusContainer';
import TaskPriorityContainer from '../TaskPriorityContainer';

interface ITasks {
  id: string;
  check_list_id: string;
  task: string;
  color: string;
  isActive: boolean;
  priority: string;
  status: string;
  due_date: string;
  created_at: Date;
  updated_at: Date;
}

interface ICheckList {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  priority: string;
  due_date: string;
  tasks: ITasks[];
}

interface ICardCheckList {
  id: string;
  card_id: string;
  check_list_id: string;
  card_unique_name: string;
  created_at: Date;
  updated_at: Date;
  check_list: ICheckList;
}

interface IProps {
  checkList: ICheckList;
  getCardCheckLists: Function;
}

const CardCheckListContainer: React.FC<IProps> = ({
  checkList,
  getCardCheckLists,
}: IProps) => {
  const [selectedTask, setSelectedTask] = useState<ITasks>({} as ITasks);
  const [statusWindow, setStatusWindow] = useState(false);
  const [statusSection, setStatusSection] = useState('2');
  const [priorityWindow, setPriorityWindow] = useState(false);

  const handleCloseAllWindows = useCallback(() => {
    setStatusWindow(false);
    setPriorityWindow(false);
  }, []);

  const handleStatusWindow = useCallback(
    (props: ITasks) => {
      handleCloseAllWindows();
      setSelectedTask(props);
      setStatusWindow(true);
    },
    [handleCloseAllWindows],
  );

  const handlePriorityWindow = useCallback(
    (props: ITasks) => {
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

  return (
    <Main>
      <CheckListContainer>
        <h2>{checkList.name}</h2>
        <StatusMenuButtonContainer>
          <StatusMenuButton
            isActive={statusSection === '1'}
            type="button"
            onClick={handleNotStartedTasksSection}
          >
            Não iniciadas
          </StatusMenuButton>
          <StatusMenuButton
            isActive={statusSection === '2'}
            type="button"
            onClick={handleInProgressTasksSection}
          >
            Em execução
          </StatusMenuButton>
          <StatusMenuButton
            isActive={statusSection === '3'}
            type="button"
            onClick={handleFinishedTasksSection}
          >
            Finalizadas
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
            checkList.tasks.map(task => {
              if (task.status === '1') {
                return (
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
                );
              }
              return <h2>Tarefa não encontrada</h2>;
            })}
          {statusSection === '2' &&
            checkList.tasks.map(task => {
              if (task.status === '2') {
                return (
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
                );
              }
              return <h2>Tarefa não encontrada</h2>;
            })}
          {statusSection === '3' &&
            checkList.tasks.map(task => {
              if (task.status === '3') {
                return (
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
                );
              }
              return <h2>Tarefa não encontrada</h2>;
            })}
        </Container>
      </CheckListContainer>
    </Main>
  );
};

export default CardCheckListContainer;
