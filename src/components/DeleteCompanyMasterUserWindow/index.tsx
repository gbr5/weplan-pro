import React, { MouseEventHandler, useCallback } from 'react';
import api from '../../services/api';
import WindowContainer from '../WindowContainer';

interface IProps {
  companyMasterUserID: string;
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
}

const DeleteCompanyMasterWindow: React.FC<IProps> = ({
  companyMasterUserID,
  handleCloseWindow,
  onHandleCloseWindow,
}) => {
  const handleDeleteMasterUser = useCallback(async () => {
    await api.delete(`suppliers/master/user/${companyMasterUserID}`);
    handleCloseWindow();
  }, [companyMasterUserID, handleCloseWindow]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 100,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <h1>Tem certeza de que deseja deletar o usuário master?</h1>
      <div>
        <button
          style={{ background: 'red' }}
          type="button"
          onClick={handleDeleteMasterUser}
        >
          Sim
        </button>
        <button
          style={{ background: 'green' }}
          type="button"
          onClick={handleDeleteMasterUser}
        >
          Não
        </button>
      </div>
    </WindowContainer>
  );
};

export default DeleteCompanyMasterWindow;
