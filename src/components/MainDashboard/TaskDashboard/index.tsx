import React, { useCallback, useEffect, useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
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
  const { addToast } = useToast();

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

  const updateEmployeeTaskIsActive = useCallback(
    async (task: ITasks) => {
      try {
        await api.put(`check-lists/tasks/edit/${task.id}`, {
          task: task.task,
          color: task.color,
          isActive: !task.isActive,
          priority: task.priority,
          status: task.status,
          due_date: task.due_date,
        });
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa atualizada com sucesso',
          description:
            'Você já pode visualizar as alterações no seu dashboard.',
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [getEmployeeTasks, addToast],
  );

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

  return (
    <Main>
      <h2>Suas Tarefas</h2>
      <Container>
        {employeeTasks.map(task => (
          <Task style={{ background: `${task.color}` }} key={task.id}>
            <div>
              <h2>{task.task}</h2>

              <span>
                <p>Data de entrega: {task.due_date}</p>
                <p>Módulo Comercial</p>
              </span>
            </div>
            <button
              type="button"
              onClick={() => updateEmployeeTaskIsActive(task)}
            >
              {task.isActive ? (
                <FiCheckSquare size={30} />
              ) : (
                <FiSquare size={30} />
              )}
            </button>
          </Task>
        ))}
      </Container>
    </Main>
  );
};

export default TaskDashboard;
