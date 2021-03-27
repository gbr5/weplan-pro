import React, { useCallback, useState } from 'react';
import IFormDTO from '../../../../dtos/IFormDTO';
import { useContactPage } from '../../../../hooks/contactPages';
import { useForm } from '../../../../hooks/form';
import Button from '../../../Button';

import { Container, FormList, FormOption } from './styles';

interface IProps {
  closeComponent: Function;
}

const AddContactPageForm: React.FC<IProps> = ({ closeComponent }) => {
  const { createContactPageForm } = useContactPage();
  const { userForms } = useForm();
  const [selectedForm, setSelectedForm] = useState({} as IFormDTO);

  const hansleSelectForm = useCallback((form: IFormDTO) => {
    setSelectedForm(form);
  }, []);

  const handleCreateContactPageForm = useCallback(() => {
    selectedForm && selectedForm.id && createContactPageForm(selectedForm);
    selectedForm && selectedForm.id && closeComponent();
  }, [createContactPageForm, selectedForm, closeComponent]);

  return (
    <Container>
      <h2>Selecione o formulário</h2>
      <FormList>
        {userForms.map(form => {
          return (
            <FormOption
              isSelected={selectedForm && selectedForm.id === form.id}
              type="button"
              key={form.id}
              onClick={() => hansleSelectForm(form)}
            >
              {form.name}
            </FormOption>
          );
        })}
      </FormList>
      {selectedForm && selectedForm.id && (
        <Button type="button" onClick={handleCreateContactPageForm}>
          Adicionar Formulário
        </Button>
      )}
    </Container>
  );
};

export default AddContactPageForm;
