import React, { MouseEventHandler, useCallback, useState } from 'react';
import WindowContainer from '../../../../WindowContainer';
import { useToast } from '../../../../../hooks/toast';

import { Container, Employee } from './styles';
import api from '../../../../../services/api';
import IUserEmployeeDTO from '../../../../../dtos/IUserEmployeeDTO';
import IStageCardDTO from '../../../../../dtos/IStageCardDTO';
import { useEmployeeAuth } from '../../../../../hooks/employeeAuth';

interface IProps {
  card: IStageCardDTO;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getCardParticipants: Function;
}

const AddCardParticipantForm: React.FC<IProps> = ({
  card,
  onHandleCloseWindow,
  handleCloseWindow,
  getCardParticipants,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();

  const [employees, setEmployees] = useState<IUserEmployeeDTO[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<IUserEmployeeDTO>(
    {} as IUserEmployeeDTO,
  );

  const getCompanyEmployees = useCallback(
    (props: string) => {
      try {
        api
          .get<IUserEmployeeDTO[]>(
            `supplier-employees/${employee.company.id}?name=${props}`,
          )
          .then(response => {
            const allEmployees = response.data.filter(
              thisEmployee =>
                thisEmployee.employee.id !== employee.user.id &&
                thisEmployee.isActive,
            );
            setEmployees(allEmployees);
          });
      } catch (err) {
        throw new Error(err);
      }
    },
    [employee],
  );

  const handleSelectEmployee = useCallback(
    (props: IUserEmployeeDTO) => {
      if (selectedEmployee.id === props.id) {
        return setSelectedEmployee({} as IUserEmployeeDTO);
      }
      return setSelectedEmployee(props);
    },
    [selectedEmployee],
  );

  const handleSubmit = useCallback(async () => {
    try {
      await api.post(`card/participants`, {
        user_id: selectedEmployee.employee.id,
        card_unique_name: card.unique_name,
      });
      getCardParticipants();
      handleCloseWindow();
      return addToast({
        type: 'success',
        title: 'Participante adicionado com sucesso',
        description: 'Ele já tem acesso ao card.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar colaborador',
        description: 'Erro ao adicionar colaborador, tente novamente.',
      });

      throw new Error(err);
    }
  }, [
    addToast,
    getCardParticipants,
    handleCloseWindow,
    selectedEmployee,
    card,
  ]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 30,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      <Container>
        <h1>Adicionar Participante ao Card</h1>
        <p>Digite o nome do colaborador</p>
        <input
          placeholder="Nome do colaborador"
          onChange={e => getCompanyEmployees(e.target.value)}
        />
        {employees.map(xEmployee => (
          <Employee
            isActive={xEmployee.id === selectedEmployee.id}
            type="button"
            onClick={() => handleSelectEmployee(xEmployee)}
            key={xEmployee.id}
          >
            <strong>{xEmployee.employee.name}</strong>
          </Employee>
        ))}
        {selectedEmployee.isActive && (
          <button type="button" onClick={handleSubmit}>
            Adicionar Participante
          </button>
        )}
      </Container>
    </WindowContainer>
  );
};

export default AddCardParticipantForm;
