import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import { Container, Task, Main } from './styles';

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

  const [employeeTasks, setEmployeeTasks] = useState<ITasks[]>([]);

  const getEmployeeTasks = useCallback(() => {
    try {
      api
        .get<ITasks[]>(`check-lists/tasks/${company.id}/${person.id}`)
        .then(response => {
          setEmployeeTasks(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [company, person]);

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

  return (
    <Main>
      <h2>Suas Tarefas</h2>
      <Container>
        {employeeTasks.map(task => (
          <Task key={task.id}>
            <div>
              <h2>{task.task}</h2>

              <span>
                <p>Data de entrega: {task.due_date}</p>
                <p>Módulo Comercial</p>
              </span>
            </div>
            <button type="button">
              <FiChevronRight size={30} />
            </button>
          </Task>
        ))}
      </Container>
    </Main>
  );
};

export default TaskDashboard;
