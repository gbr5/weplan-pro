import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container } from './styles';

interface IProps {
  name: string;
  editName: (e: string) => void;
}

const FormNameButton: React.FC<IProps> = ({ editName, name }) => {
  const [editField, setEditField] = useState(false);

  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);

  const handleEditName = useCallback(
    (e: string) => {
      editName(e);
      setEditField(false);
    },
    [editName],
  );
  return (
    <Container>
      {editField ? (
        <InlineFormField
          defaultValue={name}
          handleOnSubmit={(e: string) => handleEditName(e)}
          placeholder={name}
          closeComponent={() => handleEditField(false)}
        />
      ) : (
        <>
          <button type="button" onClick={() => handleEditField(true)}>
            <MdEdit size={24} />
          </button>
          <h2>{name}</h2>
        </>
      )}
    </Container>
  );
};

export default FormNameButton;
