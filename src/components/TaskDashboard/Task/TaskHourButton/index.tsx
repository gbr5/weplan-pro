import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { MdCheck } from 'react-icons/md';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import { Container, HourInputContainer } from './styles';
import { useCheckList } from '../../../../hooks/checkList';
import Input from '../../../Input';

import formatOnlyTime from '../../../../utils/formatOnlyTime';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

interface IFormParams {
  hour: string;
}

const TaskHourButton: React.FC<IProps> = ({ task, update }) => {
  const formRef = useRef<FormHandles>(null);
  const { updateTask, createTaskNote } = useCheckList();
  const [editField, setEditField] = useState(false);

  const handleEditFieldWindow = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleSubmit = useCallback(
    ({ hour }: IFormParams) => {
      const oldDueDate = task.due_date;
      const newHour = Number(`${hour[0]}${hour[1]}`);
      const newMinute = hour[2] ? Number(`${hour[2]}${hour[3]}`) : 0;

      console.log({ newHour, newMinute });

      const due_date = new Date(task.due_date);
      console.log({ due_date });
      due_date.setHours(newHour);
      due_date.setMinutes(newMinute);
      updateTask({
        ...task,
        due_date: String(due_date),
      });

      createTaskNote({
        note: `Tarefa Editada|||\n\nAntiga Horário de Entrega: ${formatOnlyTime(
          oldDueDate,
        )}\n.\nNova Horário de Entrega: ${formatOnlyTime(
          String(due_date),
        )}\n. . . . .`,
        task_id: task.id,
      });
      setEditField(false);
      update();
    },
    [task, createTaskNote, updateTask, update],
  );

  return (
    <Container>
      {editField ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <HourInputContainer>
            <Input
              containerStyle={{
                padding: '0.2rem',
                border: 'none',
                borderBottom: '1px solid black',
                background: 'transparent',
              }}
              name="hour"
              mask="time"
              pattern="\d*"
              placeholder={formatOnlyTime(task.due_date)}
              // defaultValue={formatOnlyTime(task.due_date)}
            />
            <button type="submit">
              <MdCheck size={18} />
            </button>
          </HourInputContainer>
        </Form>
      ) : (
        <button onClick={() => handleEditFieldWindow(true)} type="button">
          {formatOnlyTime(task.due_date)}
        </button>
      )}
    </Container>
  );
};

export default TaskHourButton;
