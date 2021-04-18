import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IFormDTO from '../../../dtos/IFormDTO';
import { useForm } from '../../../hooks/form';
import Header from '../../Header';
import AddCompanyForm from '../AddCompanyForm';
import FormWindow from '../FormWindow';

import { Container, ListContainer, ButtonForm } from './styles';

const FormDashboard: React.FC = () => {
  const [addCompanyForm, setAddCompanyForm] = useState(false);
  const [formPage, setFormPage] = useState(false);
  const { userForms, getForms, handleSetCurrentForm, currentForm } = useForm();

  const [forms, setForms] = useState(userForms);

  const handleGetForms = useCallback(async () => {
    const response = await getForms();
    setForms(response);
  }, [getForms]);

  useEffect(() => {
    if (userForms.length !== forms.length) {
      handleGetForms();
    }
  }, [handleGetForms, userForms, forms]);

  const handleAddForm = useCallback((e: boolean) => {
    setAddCompanyForm(e);
  }, []);

  const closeFormPage = useCallback(() => {
    setFormPage(false);
  }, []);

  const navigateToFormPage = useCallback(
    (data: IFormDTO) => {
      if (data && data.id) {
        handleSetCurrentForm(data);
        setFormPage(true);
      }
    },
    [handleSetCurrentForm],
  );

  useEffect(() => {
    if (currentForm && currentForm.id) {
      navigateToFormPage(currentForm);
    }
  }, [currentForm, navigateToFormPage]);

  return (
    <>
      {formPage && currentForm && (
        <FormWindow handleCloseWindow={closeFormPage} />
      )}
      {addCompanyForm && (
        <AddCompanyForm handleCloseWindow={() => handleAddForm(false)} />
      )}
      <Header />
      <Container>
        <span>
          <h1>Formulários</h1>
          <button type="button" onClick={() => handleAddForm(true)}>
            <MdAdd size={28} />
          </button>
        </span>

        <ListContainer>
          {forms.map(form => {
            return (
              <ButtonForm
                key={form.id}
                backgroundColor="#555"
                textColor="#000"
                type="button"
                onClick={() => navigateToFormPage(form)}
              >
                {form.name}
              </ButtonForm>
            );
          })}
        </ListContainer>
      </Container>
    </>
  );
};

export default FormDashboard;
