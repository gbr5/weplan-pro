import React, { MouseEventHandler, useCallback, useState } from 'react';
import { FiDelete, FiEdit2, FiSquare } from 'react-icons/fi';

import api from '../../services/api';

import {
  EmployeeScrollList,
  EmployeeSection,
  ConfirmedEmployeeSection,
  UnConfirmedEmployeeSection,
} from './styles';

import WindowContainer from '../WindowContainer';
import DeleteCompanyMasterWindow from '../DeleteCompanyMasterUserWindow';

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
  userAsCompanyMasters: IMasterUserDTO[];
  unConfirmedCompanyMasters: IMasterUserDTO[];
}

const UserCompanyMasterManagementWindow: React.FC<IPropsDTO> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  userAsCompanyMasters,
  unConfirmedCompanyMasters,
}: IPropsDTO) => {
  const [deleteMasterWindow, setDeleteMasterWindow] = useState(false);
  const [selectedMasterID, setSelectedMasterID] = useState('');

  // const handleDeleteEmployee = useCallback(
  //   async (company_user_master_Id: string) => {
  //     try {
  //       await api.delete(`suppliers/master/user/${company_user_master_Id}`);
  //       getUserAsCompanyMaster();
  //       handleCloseWindow();
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   },
  //   [handleCloseWindow, getUserAsCompanyMaster],
  // );

  const handleCloseDeleteMasterWindow = useCallback(() => {
    setDeleteMasterWindow(!deleteMasterWindow);
  }, [deleteMasterWindow]);

  const handleDeleteMasterWindow = useCallback((master_id: string) => {
    setSelectedMasterID(master_id);
    setDeleteMasterWindow(true);
  }, []);

  const handleConfirmMaster = useCallback(
    async (company_user_master_id: string) => {
      try {
        await api.put(`/suppliers/masters/user/${company_user_master_id}`, {
          isConfirmed: true,
        });
        handleCloseWindow();
      } catch (err) {
        throw new Error(err);
      }
    },
    [handleCloseWindow],
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
      {deleteMasterWindow && (
        <DeleteCompanyMasterWindow
          companyMasterUserID={selectedMasterID}
          handleCloseWindow={handleCloseDeleteMasterWindow}
          onHandleCloseWindow={() => setDeleteMasterWindow(false)}
        />
      )}
      <EmployeeSection>
        <h2>Seus acessos por empresa</h2>
        <ConfirmedEmployeeSection>
          <h3>Seus acessos por empresa</h3>
          <EmployeeScrollList>
            <table>
              <tr>
                <th>N°</th>
                <th>Nome</th>
                <th>
                  <FiEdit2 size={30} />
                </th>
              </tr>
              {userAsCompanyMasters.map(tMaster => {
                const masterIndex =
                  userAsCompanyMasters.findIndex(
                    index => index.id === tMaster.id,
                  ) + 1;
                return (
                  <tr key={masterIndex}>
                    <td>{masterIndex}</td>
                    <td>{tMaster.company.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteMasterWindow(tMaster.id)}
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
                <th>
                  <FiEdit2 size={30} />
                </th>
              </tr>
              {unConfirmedCompanyMasters.map(tMaster => {
                const masterIndex =
                  unConfirmedCompanyMasters.findIndex(
                    index => index.id === tMaster.id,
                  ) + 1;
                return (
                  <tr key={masterIndex}>
                    <td>{masterIndex}</td>
                    <td>{tMaster.company.name}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleConfirmMaster(tMaster.id)}
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

export default UserCompanyMasterManagementWindow;
