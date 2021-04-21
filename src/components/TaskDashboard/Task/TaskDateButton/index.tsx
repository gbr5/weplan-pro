import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { MdCheck, MdClose } from 'react-icons/md';
import ITaskDTO from '../../../../dtos/ITaskDTO';
import { Container, HourInputContainer } from './styles';
import { useCheckList } from '../../../../hooks/checkList';
import Input from '../../../Input';

import formatOnlyDate from '../../../../utils/formatOnlyDate';

interface IProps {
  task: ITaskDTO;
  update: Function;
}

interface IFormParams {
  date: string;
}

const TaskDateButton: React.FC<IProps> = ({ task, update }) => {
  const formRef = useRef<FormHandles>(null);
  const { updateTask, createTaskNote } = useCheckList();
  const [editField, setEditField] = useState(false);

  const handleEditFieldWindow = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleSubmit = useCallback(
    ({ date }: IFormParams) => {
      const today = new Date();
      const thisYear = Number(
        `${String(today.getFullYear())[2]}${String(today.getFullYear())[3]}`,
      );

      const thisMonth = Number(today.getMonth());
      const thisDay = Number(today.getDate());
      const dueDate = new Date(task.due_date);
      const hour = dueDate.getHours();
      const minutes = dueDate.getMinutes();
      const newDay = date[0] ? Number(`${date[0]}${date[1]}`) : thisDay;
      const newMonth = date[2] ? Number(`${date[2]}${date[3]}`) : thisMonth + 1;
      const newYear = date[4] ? Number(`${date[4]}${date[5]}`) : thisYear;

      const oldDueDate = task.due_date;
      const due_date = new Date(task.due_date);
      due_date.setDate(newDay);
      due_date.setMonth(newMonth - 1);
      due_date.setFullYear(newYear);
      due_date.setHours(hour);
      due_date.setMinutes(minutes);

      updateTask({
        ...task,
        due_date: String(due_date),
      });

      createTaskNote({
        note: `Tarefa Editada|||\nTarefa: ${
          task.task
        }\n.\nAntiga Data de Entrega: ${formatOnlyDate(
          oldDueDate,
        )}\n.\nNova Data de Entrega: ${formatOnlyDate(
          String(due_date),
        )}\n. . . . .`,
        task_id: task.id,
        check_list_id: task.check_list_id,
      });
      setEditField(false);
      update();
    },
    [task, updateTask, update, createTaskNote],
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
              required
              name="date"
              mask="brlDateFormat"
              pattern="\d*"
              placeholder={formatOnlyDate(task.due_date)}
            />
            <button
              style={{ background: 'rgba(250, 50, 10)' }}
              type="button"
              onClick={() => handleEditFieldWindow(false)}
            >
              <MdClose size={18} />
            </button>
            <button type="submit">
              <MdCheck size={18} />
            </button>
          </HourInputContainer>
        </Form>
      ) : (
        <button onClick={() => handleEditFieldWindow(true)} type="button">
          {formatOnlyDate(task.due_date)}
        </button>
      )}
    </Container>
  );
};

export default TaskDateButton;
