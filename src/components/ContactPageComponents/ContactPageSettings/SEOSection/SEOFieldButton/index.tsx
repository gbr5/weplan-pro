import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import InlineFormField from '../../../../GeneralComponents/InlineFormField';

import { Container } from './styles';

interface IProps {
  name: string;
  editName: (e: string) => void;
}

const SEOFieldButton: React.FC<IProps> = ({ name, editName }) => {
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
          closeComponent={() => handleEditField(false)}
          defaultValue={name}
          handleOnSubmit={(e: string) => handleEditName(e)}
          placeholder={name}
        />
      ) : (
        <>
          <button type="button" onClick={() => handleEditField(true)}>
            <MdEdit size={24} />
          </button>
          <strong>{name}</strong>
        </>
      )}
    </Container>
  );
};

export default SEOFieldButton;
