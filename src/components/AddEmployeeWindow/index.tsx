import React, { MouseEventHandler, useCallback, useState } from 'react';
import IUserDTO from '../../dtos/IUserDTO';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface ISubmitFormDTO {
  position: string;
}

interface IPropsDTO {
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getEmployees: Function;
}

const AddEmployeeWindow: React.FC<IPropsDTO> = ({
  handleCloseWindow,
  onHandleCloseWindow,
  getEmployees,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [userEmployee, setUserEmployee] = useState<IUserDTO>({} as IUserDTO);

  const handleSelectUser = useCallback(
    (props: IUserDTO) => {
      if (userEmployee.id === undefined) {
        setUserEmployee(props);
      } else {
        setUserEmployee({} as IUserDTO);
      }
    },
    [userEmployee],
  );

  const handleGetUsers = useCallback(
    (props: string) => {
      try {
        api.get<IUserDTO[]>(`/users?name=${props}`).then(response => {
          const allUsers = response.data.filter(
            thisUser => thisUser.id !== user.id,
          );
          setUsers(allUsers);
        });
      } catch (err) {
        throw new Error(err);
      }
    },
    [user],
  );

  const handleAddEmployee = useCallback(async () => {
    try {
      await api.post(`/supplier-employees/${userEmployee.id}`, {
        position: 'Diretor',
        modules: [
          {
            management_module_id: '2e1eb6d0-6fa9-4d03-bffa-5581eed30b11',
            access_level: 1,
          },
          {
            management_module_id: '9ccea020-8ff8-4656-b734-84620d3e563d',
            access_level: 1,
          },
          {
            management_module_id: '4dd5b84a-8912-4fe4-99b2-3c33a113c90f',
            access_level: 1,
          },
        ],
      });

      getEmployees();
      handleCloseWindow();

      addToast({
        type: 'success',
        title: 'Amigo adicionado com sucesso',
        description: 'As informações do evento já foram atualizadas.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar amigo',
        description: 'Erro ao adicionar amigo, tente novamente.',
      });
      throw new Error(err);
    }
  }, [addToast, getEmployees, handleCloseWindow, userEmployee]);

  return (
    <>
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '10%',
          left: '25%',
          height: '80%',
          width: '50%',
          zIndex: '1000',
        }}
      >
        <Container>
          <h1>Adicionar contato</h1>
          <input onChange={e => handleGetUsers(e.target.value)} />
          <ul>
            {users.map(thisUser => (
              <li key={thisUser.id}>
                <h2>{thisUser.name}</h2>
                {userEmployee.id !== thisUser.id ? (
                  <button
                    type="button"
                    onClick={() => handleSelectUser(thisUser)}
                  >
                    Selecionar
                  </button>
                ) : (
                  <span>
                    <button
                      type="button"
                      onClick={() => handleSelectUser(thisUser)}
                    >
                      Selecionado
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {userEmployee.id !== '' && (
            <button type="button" onClick={handleAddEmployee}>
              Adicionar
            </button>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default AddEmployeeWindow;
