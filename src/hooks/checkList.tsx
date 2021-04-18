import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';
import ICheckListDTO from '../dtos/ICheckListDTO';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO ';
import ICreateTaskNoteDTO from '../dtos/ICreateTaskNote';

// import ICreateTaskDTO from '../dtos/ICreateTaskDTO ';
import ITaskDTO from '../dtos/ITaskDTO';
import api from '../services/api';
import formatHourDateShort from '../utils/formatHourDateShort';
import { useEmployeeAuth } from './employeeAuth';
import { useStageCard } from './stageCard';
import { useToast } from './toast';

interface IPriorityColors {
  priority: string;
  color: string;
}

interface ICheckListContextData {
  priorityColors: IPriorityColors[];
  selectedDate: Date;
  dayTasks: ITaskDTO[];
  taskName: string;
  taskPriority: string;
  taskStatus: string;
  taskDueDate: string;
  taskPriorityTypes: ICheckBoxOptionDTO[];
  taskStatusTypes: ICheckBoxOptionDTO[];
  taskStatusIconTypes: ICheckBoxOptionDTO[];
  selectedCheckList: ICheckListDTO;
  selectedTask: ITaskDTO;
  employeeNotStartedTasks: ITaskDTO[];
  employeeInProgressTasks: ITaskDTO[];
  employeeFinishedTasks: ITaskDTO[];
  updateEmployeeTaskIsActive(data: ITaskDTO): void;
  selectTaskDate(date: Date): void;
  getEmployeeTasksByDate(): void;
  selectTaskName(task: string): void;
  selectTaskPriority(data: string): void;
  selectTaskStatus(data: string): void;
  selectTaskDueDate(data: string): void;
  createTask(data: ICreateTaskDTO): void;
  createTaskNote(data: ICreateTaskNoteDTO): void;
  updateTask(data: ITaskDTO): Promise<ITaskDTO>;
  selectCheckList(data: ICheckListDTO): void;
  selectTask(data: ITaskDTO): void;
  deleteTask(id: string): Promise<void>;
  getEmployeeTasks(): void;
  getTask(id: string): Promise<void>;
}

const CheckListContext = createContext<ICheckListContextData>(
  {} as ICheckListContextData,
);

const CheckListProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { selectedCardCheckList } = useStageCard();
  const { addToast } = useToast();
  const [selectedCheckList, setSelectedCheckList] = useState(() => {
    const findCheckList = localStorage.getItem('@WP-PRO:selected-check-list');
    if (findCheckList) {
      return JSON.parse(findCheckList);
    }
    return {} as ICheckListDTO;
  });
  const [selectedTask, setSelectedTask] = useState({} as ITaskDTO);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [dayTasks, setDayTasks] = useState<ITaskDTO[]>([]);
  const [employeeNotStartedTasks, setEmployeeNotStartedTasks] = useState<
    ITaskDTO[]
  >([]);
  const [employeeInProgressTasks, setEmployeeInProgressTasks] = useState<
    ITaskDTO[]
  >([]);
  const [employeeFinishedTasks, setEmployeeFinishedTasks] = useState<
    ITaskDTO[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getEmployeeTasks = useCallback(() => {
    try {
      employee &&
        employee.company &&
        employee.employeeUser &&
        api
          .get<ITaskDTO[]>(
            `check-lists/tasks/${employee.company.id}/${employee.employeeUser.id}`,
          )
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
  }, [employee]);

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
    [getEmployeeTasksByDate, getEmployeeTasks, addToast],
  );

  const selectTask = useCallback((data: ITaskDTO) => {
    setSelectedTask(data);
  }, []);
  const selectTaskName = useCallback((task: string) => {
    setTaskName(task);
  }, []);
  const selectTaskPriority = useCallback((data: string) => {
    setTaskPriority(data);
  }, []);
  const selectTaskStatus = useCallback((data: string) => {
    setTaskStatus(data);
  }, []);
  const selectTaskDueDate = useCallback((data: string) => {
    setTaskDueDate(data);
  }, []);
  const selectCheckList = useCallback((data: ICheckListDTO) => {
    setSelectedCheckList(data);
    localStorage.setItem('@WP-PRO:selected-check-list', JSON.stringify(data));
  }, []);
  const getTask = useCallback(
    async (id: string) => {
      try {
        const response = await api.get<ITaskDTO>(
          `/check-lists/tasks/show/${id}`,
        );
        selectTask(response.data);
      } catch (err) {
        throw new Error(err);
      }
    },
    [selectTask],
  );
  const updateTask = useCallback(
    async (data: ITaskDTO) => {
      try {
        const response = await api.put(`/check-lists/tasks/edit/${data.id}`, {
          task: data.task,
          status: data.status,
          color: data.color,
          isActive: data.isActive,
          priority: data.priority,
          due_date: data.due_date,
        });
        setSelectedTask(response.data);
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa editada com sucesso!',
        });
        return response.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar tarefa!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getEmployeeTasks],
  );
  const deleteTask = useCallback(
    async (id: string) => {
      try {
        await api.put(`/check-lists/tasks/edit/is-active/${id}`);
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa deletada com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar tarefa!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getEmployeeTasks],
  );
  const createTaskNote = useCallback(
    async (data: ICreateTaskNoteDTO) => {
      try {
        await api.post(`/check-list-task-notes`, {
          task_id: data.task_id,
          note: {
            author_id: employee.employeeUser.id,
            isNew: true,
            note: data.note,
          },
        });
        getTask(data.task_id);
        getEmployeeTasks();
        addToast({
          type: 'success',
          title: 'Tarefa criada com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar tarefa!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [employee, getTask, getEmployeeTasks, addToast],
  );
  const createTask = useCallback(
    async (data: ICreateTaskDTO) => {
      try {
        const response = await api.post(
          `/check-lists/tasks/${data.check_list_id}`,
          {
            owner_id: employee.employeeUser.id,
            task: taskName,
            color: '#555',
            isActive: true,
            priority: taskPriority,
            status: taskStatus,
            due_date: data.due_date,
          },
        );
        getEmployeeTasks();
        setSelectedTask(response.data);
        addToast({
          type: 'success',
          title: 'Tarefa criada com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar tarefa!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [employee, getEmployeeTasks, addToast, taskName, taskPriority, taskStatus],
  );

  const taskPriorityTypes: ICheckBoxOptionDTO[] = [
    { id: 'low', value: 'low', label: 'Baixa' },
    { id: 'neutral', value: 'neutral', label: 'Neutra' },
    { id: 'high', value: 'high', label: 'Alta' },
  ];
  const taskStatusTypes: ICheckBoxOptionDTO[] = [
    { id: '1', value: '1', label: 'Não Iniciada' },
    { id: '2', value: '2', label: 'Em Progresso' },
    { id: '3', value: '3', label: 'Concluída' },
  ];
  const taskStatusIconTypes: ICheckBoxOptionDTO[] = [
    { id: '1', value: '1', label: 'sleepyTask' },
    { id: '2', value: '2', label: 'runningTask' },
    { id: '3', value: '3', label: 'doneTask' },
  ];
  const priorityColors: IPriorityColors[] = [
    { priority: 'low', color: 'rgba(161, 255, 92, 0.7)' },
    { priority: 'neutral', color: 'rgba(255, 220, 92, 0.7)' },
    { priority: 'high', color: 'rgba(255, 124, 92, 0.7)' },
  ];

  useEffect(() => {
    if (employee && employee.id) {
      const findTaskByDate = localStorage.getItem(
        `@WP-PRO:tasks${formatHourDateShort(String(selectedDate))}`,
      );
      if (findTaskByDate) {
        setDayTasks(JSON.parse(findTaskByDate));
      } else {
        getEmployeeTasksByDate();
      }
    }
  }, [getEmployeeTasksByDate, employee, selectedDate]);

  useEffect(() => {
    if (selectedCardCheckList && selectedCardCheckList.id) {
      setSelectedCheckList(selectedCardCheckList.check_list);
    }
  }, [selectedCardCheckList]);

  return (
    <CheckListContext.Provider
      value={{
        priorityColors,
        getTask,
        createTaskNote,
        dayTasks,
        getEmployeeTasksByDate,
        employeeFinishedTasks,
        employeeInProgressTasks,
        employeeNotStartedTasks,
        selectTaskDate,
        getEmployeeTasks,
        selectedDate,
        updateEmployeeTaskIsActive,
        taskStatusIconTypes,
        deleteTask,
        taskName,
        selectTaskName,
        taskPriority,
        taskStatus,
        taskDueDate,
        selectTaskPriority,
        selectTaskStatus,
        selectTaskDueDate,
        selectTask,
        selectCheckList,
        createTask,
        selectedCheckList,
        selectedTask,
        updateTask,
        taskPriorityTypes,
        taskStatusTypes,
      }}
    >
      {children}
    </CheckListContext.Provider>
  );
};

function useCheckList(): ICheckListContextData {
  const context = useContext(CheckListContext);

  if (!context) {
    throw new Error('useCheckList must be used within a cardTask provider');
  }

  return context;
}

export { CheckListProvider, useCheckList };
