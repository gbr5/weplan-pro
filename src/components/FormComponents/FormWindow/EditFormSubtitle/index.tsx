import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useForm } from '../../../../hooks/form';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container, DescriptionField, EditField } from './styles';

const EditFormSubTitle: React.FC = () => {
  const { updateForm, currentForm } = useForm();

  const [editSubTitle, setEditSubTitle] = useState(false);

  const handleEditSubTitle = useCallback((e: boolean) => {
    setEditSubTitle(e);
  }, []);

  const handleSubmit = useCallback(
    (e: string) => {
      updateForm({
        ...currentForm,
        message: e,
      });
    },
    [updateForm, currentForm],
  );

  return (
    <Container>
      {editSubTitle ? (
        <EditField>
          <InlineFormField
            closeComponent={() => handleEditSubTitle(false)}
            defaultValue={currentForm.message}
            placeholder={currentForm.message}
            handleOnSubmit={(e: string) => handleSubmit(e)}
          />
        </EditField>
      ) : (
        <DescriptionField>
          <button type="button" onClick={() => handleEditSubTitle(true)}>
            <MdEdit size={24} />
          </button>
          <p>{currentForm.message}</p>
        </DescriptionField>
      )}
    </Container>
  );
};

export default EditFormSubTitle;
