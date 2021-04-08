import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useForm } from '../../../../hooks/form';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container, TitleField, EditField } from './styles';

const EditFormTitle: React.FC = () => {
  const { updateForm, currentForm } = useForm();

  const [editTitle, setEditTitle] = useState(false);

  const handleEditTitle = useCallback((e: boolean) => {
    setEditTitle(e);
  }, []);

  const handleSubmit = useCallback(
    (e: string) => {
      updateForm({
        ...currentForm,
        title: e,
      });
    },
    [updateForm, currentForm],
  );

  return (
    <Container>
      {editTitle ? (
        <EditField>
          <InlineFormField
            closeComponent={() => handleEditTitle(false)}
            defaultValue={currentForm.title}
            placeholder={currentForm.title}
            handleOnSubmit={(e: string) => handleSubmit(e)}
          />
        </EditField>
      ) : (
        <TitleField>
          <button type="button" onClick={() => handleEditTitle(true)}>
            <MdEdit size={24} />
          </button>
          <h1>{currentForm.title}</h1>
        </TitleField>
      )}
    </Container>
  );
};

export default EditFormTitle;
