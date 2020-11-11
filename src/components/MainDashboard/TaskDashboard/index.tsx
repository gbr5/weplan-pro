import React, { useCallback, useEffect, useState } from 'react';
import { MdFlag } from 'react-icons/md';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import sleepyTask from '../../../assets/sleepyTask1.svg';
import runningTask from '../../../assets/runningTask1.svg';
import doneTask from '../../../assets/doneTask1.svg';

import {
  Container,
  Task,
  Main,
  StatusMenuButtonContainer,
  StatusMenuButton,
  ButtonContainer,
  Status,
  Priority,
} from './styles';
import TaskStatusContainer from './TaskStatusContainer';
import TaskPriorityContainer from './TaskPriorityContainer';

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

const TaskDashboard: React.FC = () => {
  const { company, person } = useAuth();

  const [employeeNotStartedTasks, setEmployeeNotStartedTasks] = useState<
    ITasks[]
  >([]);
  const [employeeInProgressTasks, setEmployeeInProgressTasks] = useState<
    ITasks[]
  >([]);
  const [employeeFinishedTasks, setEmployeeFinishedTasks] = useState<ITasks[]>(
    [],
  );
  const [selectedTask, setSelectedTask] = useState<ITasks>({} as ITasks);
  const [statusWindow, setStatusWindow] = useState(false);
  const [statusSection, setStatusSection] = useState('2');
  const [priorityWindow, setPriorityWindow] = useState(false);

  const handleCloseAllWindows = useCallback(() => {
    setStatusWindow(false);
    setPriorityWindow(false);
  }, []);

  const getEmployeeTasks = useCallback(() => {
    try {
      api
        .get<ITasks[]>(`check-lists/tasks/${company.id}/${person.id}`)
        .then(response => {
          const activeTasks = response.data.filter(task => task.isActive);
          setEmployeeNotStartedTasks(
            activeTasks.filter(task => task.status === '1'),
          );
          setEmployeeInProgressTasks(
            activeTasks.filter(task => task.status === '2'),
          );
          setEmployeeFinishedTasks(
            activeTasks.filter(task => task.status === '3'),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, person]);

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

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
      <h2>Suas Tarefas</h2>

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
            getEmployeeTasks={getEmployeeTasks}
            onHandleCloseWindow={() => setStatusWindow(false)}
          />
        )}
        {priorityWindow && (
          <TaskPriorityContainer
            handleCloseWindow={() => setPriorityWindow(false)}
            task={selectedTask}
            getEmployeeTasks={getEmployeeTasks}
            onHandleCloseWindow={() => setPriorityWindow(false)}
          />
        )}
        {statusSection === '1' &&
          employeeNotStartedTasks.map(task => (
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
                        <img src={sleepyTask} alt="Sleepy Task - We Plan" />
                      </>
                    )}
                    {task.status === '2' && (
                      <>
                        <p>Em Execução</p>
                        <img src={runningTask} alt="Running Task - We Plan" />
                      </>
                    )}
                    {task.status === '3' && (
                      <>
                        <p>Finalizadas</p>
                        <img src={doneTask} alt="Done Task - We Plan" />
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
          employeeInProgressTasks.map(task => (
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
                        <img src={sleepyTask} alt="Sleepy Task - We Plan" />
                      </>
                    )}
                    {task.status === '2' && (
                      <>
                        <p>Em Execução</p>
                        <img src={runningTask} alt="Running Task - We Plan" />
                      </>
                    )}
                    {task.status === '3' && (
                      <>
                        <p>Finalizadas</p>
                        <img src={doneTask} alt="Done Task - We Plan" />
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
        {statusSection === '3' &&
          employeeFinishedTasks.map(task => (
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
                        <img src={sleepyTask} alt="Sleepy Task - We Plan" />
                      </>
                    )}
                    {task.status === '2' && (
                      <>
                        <p>Em Execução</p>
                        <img src={runningTask} alt="Running Task - We Plan" />
                      </>
                    )}
                    {task.status === '3' && (
                      <>
                        <p>Finalizadas</p>
                        <img src={doneTask} alt="Done Task - We Plan" />
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
      </Container>
    </Main>
  );
};

export default TaskDashboard;
