import React, { createContext, useCallback, useState, useContext } from 'react';
import ITaskDTO from '../dtos/ITaskDTO';
import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

interface ITaskContextData {
  selectedTask: ITaskDTO;
  selectedDate: Date;
  dayTasks: ITaskDTO[];
  selectTask(data: ITaskDTO): void;
  updateEmployeeTaskIsActive(data: ITaskDTO): void;
  selectTaskDate(date: Date): void;
  getEmployeeTasksByDate(): void;
}

const TaskContext = createContext<ITaskContextData>({} as ITaskContextData);

const TaskProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();
  const [selectedTask, setSelectedTask] = useState(() => {
    const task = localStorage.getItem('@WP-PRO:selected-task');
    if (task) {
      return JSON.parse(task);
    }
    return {} as ITaskDTO;
  });
  const [dayTasks, setDayTasks] = useState<ITaskDTO[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectTask = useCallback((data: ITaskDTO) => {
    setSelectedTask(data);
    localStorage.setItem('@WP-PRO:selected-task', JSON.stringify(data));
  }, []);

  const getEmployeeTasksByDate = useCallback(() => {
    employee &&
      employee.company &&
      employee.employeeUser &&
      api
        .get<ITaskDTO[]>(
          `/check-lists/tasks/${employee.company.id}/${employee.employeeUser.id}`,
          {
            params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            },
          },
        )
        .then(response => {
          setDayTasks(response.data);
        });
  }, [selectedDate, employee]);

  const selectTaskDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const updateEmployeeTaskIsActive = useCallback(
    async (task: ITaskDTO) => {
      try {
        await api.put(`check-lists/tasks/edit/${task.id}`, {
          task: task.task,
          color: task.color,
          isActive: !task.isActive,
          priority: task.priority,
          status: task.status,
          due_date: task.due_date,
        });
        getEmployeeTasksByDate();
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
    [getEmployeeTasksByDate, addToast],
  );

  return (
    <TaskContext.Provider
      value={{
        selectedDate,
        selectTaskDate,
        selectTask,
        selectedTask,
        updateEmployeeTaskIsActive,
        dayTasks,
        getEmployeeTasksByDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

function useTask(): ITaskContextData {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a selectedTask provider');
  }

  return context;
}

export { TaskProvider, useTask };
