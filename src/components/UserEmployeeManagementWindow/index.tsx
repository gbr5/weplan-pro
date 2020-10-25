import React, { MouseEventHandler, useCallback } from 'react';
import { FiDelete, FiEdit2, FiSquare } from 'react-icons/fi';

import api from '../../services/api';

import IEmployeeDTO from '../../dtos/IEmployeeDTO';

import {
  EmployeeScrollList,
  EmployeeSection,
  ConfirmedEmployeeSection,
  UnConfirmedEmployeeSection,
} from './styles';
import WindowContainer from '../WindowContainer';

interface IModuleAccessDTO {
  id: string;
  name: string;
}

interface IMasterUserDTO {
  id: string;
  company: {
    id: string;
    name: string;
    avatar: string;
  };
  isConfirmed: boolean;
}

interface IPropsDTO {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  getUserAsEmployee: Function;
  userAsEmployee: IEmployeeDTO[];
  unConfirmedEmployees: IEmployeeDTO[];
}

const UserEmployeeManagementWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  userAsEmployee,
  unConfirmedEmployees,
  getUserAsEmployee,
}: IPropsDTO) => {
  const handleDeleteEmployee = useCallback(
    async (confirmationId: string) => {
      try {
        await api.delete(`supplier-employees/${confirmationId}`);
        getUserAsEmployee();
        handleCloseWindow();
      } catch (err) {
        throw new Error(err);
      }
    },
    [handleCloseWindow, getUserAsEmployee],
  );

  const handleConfirmEmployee = useCallback(
    async (confirmationId: string) => {
      try {
        await api.put(
          `/supplier-employees/user/confirmation/${confirmationId}`,
          {
            isConfirmed: true,
          },
        );
        getUserAsEmployee();
        handleCloseWindow();
      } catch (err) {
        throw new Error(err);
      }
    },
    [handleCloseWindow, getUserAsEmployee],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
        zIndex: 10000,
      }}
    >
      <EmployeeSection>
        <h2>Seus acessos por empresa</h2>
        <ConfirmedEmployeeSection>
          <h3>Seus acessos por empresa</h3>
          <EmployeeScrollList>
            <table>
              <tr>
                <th>N°</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>
                  <FiEdit2 size={30} />
                </th>
              </tr>
              {userAsEmployee.map(thiEmployee => {
                const employeeIndex =
                  userAsEmployee.findIndex(
                    index => index.id === thiEmployee.id,
                  ) + 1;
                return (
                  <tr key={employeeIndex}>
                    <td>{employeeIndex}</td>
                    <td>{thiEmployee.employee.name}</td>
                    <td>{thiEmployee.position}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteEmployee(thiEmployee.id)}
                      >
                        <FiDelete size={24} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </EmployeeScrollList>
        </ConfirmedEmployeeSection>
        <UnConfirmedEmployeeSection>
          <h2>A confirmar</h2>
          <EmployeeScrollList>
            <table>
              <tr>
                <th>N°</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>
                  <FiEdit2 size={30} />
                </th>
              </tr>
              {unConfirmedEmployees.map(thiEmployee => {
                const employeeIndex =
                  unConfirmedEmployees.findIndex(
                    index => index.id === thiEmployee.id,
                  ) + 1;
                return (
                  <tr key={employeeIndex}>
                    <td>{employeeIndex}</td>
                    <td>{thiEmployee.employee.name}</td>
                    <td>{thiEmployee.position}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          handleConfirmEmployee(thiEmployee.confirmation.id)
                        }
                      >
                        <FiSquare size={24} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </EmployeeScrollList>
        </UnConfirmedEmployeeSection>
      </EmployeeSection>
    </WindowContainer>
  );
};

export default UserEmployeeManagementWindow;
