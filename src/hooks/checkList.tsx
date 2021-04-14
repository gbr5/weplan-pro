import React, { createContext, useCallback, useState, useContext } from 'react';
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';
import ICheckListDTO from '../dtos/ICheckListDTO';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO ';

// import ICreateTaskDTO from '../dtos/ICreateTaskDTO ';
import ITaskDTO from '../dtos/ITaskDTO';
import api from '../services/api';
import { useEmployeeAuth } from './employeeAuth';
import { useStageCard } from './stageCard';
import { useToast } from './toast';

interface ICheckListContextData {
  taskName: string;
  taskPriority: string;
  taskStatus: string;
  taskDueDate: string;
  taskPriorityTypes: ICheckBoxOptionDTO[];
  taskStatusTypes: ICheckBoxOptionDTO[];
  taskStatusIconTypes: ICheckBoxOptionDTO[];
  selectedCheckList: ICheckListDTO;
  selectedTask: ITaskDTO;
  selectTaskName(task: string): void;
  selectTaskPriority(data: string): void;
  selectTaskStatus(data: string): void;
  selectTaskDueDate(data: string): void;
  createTask(data: ICreateTaskDTO): void;
  updateTask(data: ITaskDTO): Promise<ITaskDTO>;
  selectCheckList(data: ICheckListDTO): void;
  selectTask(data: ITaskDTO): void;
  getCheckList(id: string): void;
  getTask(id: string): void;
  deleteTask(id: string): void;
}

const CheckListContext = createContext<ICheckListContextData>(
  {} as ICheckListContextData,
);

const CheckListProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { getCardCheckLists } = useStageCard();
  const { addToast } = useToast();
  const [selectedCheckList, setSelectedCheckList] = useState(
    {} as ICheckListDTO,
  );
  const [selectedTask, setSelectedTask] = useState({} as ITaskDTO);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
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
  }, []);
  const getCheckList = useCallback(async (id: string) => {
    try {
      const response = await api.get<ICheckListDTO>(`/ /${id}`);
      setSelectedCheckList(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
  const getTask = useCallback(async (id: string) => {
    try {
      const response = await api.get<ITaskDTO>(`/ /${id}`);
      setSelectedTask(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);
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
        getTask(data.id);
        getCheckList(data.check_list_id);
        setSelectedTask(response.data);
        addToast({
          type: 'success',
          title: 'Tarefa adicionada com sucesso!',
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
    [getCheckList, getTask, addToast],
  );
  const deleteTask = useCallback(
    async (id: string) => {
      try {
        await api.put(`/check-lists/tasks/edit/is-active/${id}`);
        getCheckList(selectedCheckList.id);
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
    [getCheckList, selectedCheckList, addToast],
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
        getCardCheckLists();
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
    [employee, addToast, taskName, taskPriority, taskStatus, getCardCheckLists],
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

  return (
    <CheckListContext.Provider
      value={{
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
        getTask,
        createTask,
        selectedCheckList,
        getCheckList,
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
