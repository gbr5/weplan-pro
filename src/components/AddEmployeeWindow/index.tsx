import React, { MouseEventHandler, useCallback, useState } from 'react';
import IUserDTO from '../../dtos/IUserDTO';
import IWPContractOrderDTO from '../../dtos/IWPContractOrderDTO';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import CompanyEmployeeForm from '../CompanyEmployeeForm';
import WindowContainer from '../WindowContainer';

import { Container } from './styles';

interface ISubmitFormDTO {
  position: string;
}

interface IWPModulesDTO {
  id: string;
  name: string;
}

interface IPropsDTO {
  wpCompanyContract: IWPContractOrderDTO;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
  getEmployees: Function;
  wpModules: IWPModulesDTO[];
}

const AddEmployeeWindow: React.FC<IPropsDTO> = ({
  wpCompanyContract,
  handleCloseWindow,
  onHandleCloseWindow,
  getEmployees,
  wpModules,
}: IPropsDTO) => {
  const { user } = useAuth();

  const [users, setUsers] = useState<IUserDTO[]>([]);
  const [addEmployeeFormWindow, setAddEmployeeFormWindow] = useState(false);
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
    setAddEmployeeFormWindow(true);
  }, []);

  return (
    <>
      {addEmployeeFormWindow && (
        <CompanyEmployeeForm
          wpModules={wpModules}
          getEmployees={getEmployees}
          onHandleCloseWindow={onHandleCloseWindow}
          wpCompanyContract={wpCompanyContract}
          userEmployee={userEmployee}
          handleCloseWindow={handleCloseWindow}
        />
      )}
      <WindowContainer
        onHandleCloseWindow={onHandleCloseWindow}
        containerStyle={{
          top: '10%',
          left: '25%',
          height: '80%',
          width: '50%',
          zIndex: 15,
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
              Selecionar usuário
            </button>
          )}
        </Container>
      </WindowContainer>
    </>
  );
};

export default AddEmployeeWindow;
