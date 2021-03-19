import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useForm } from '../../../hooks/form';
import AddContactForm from '../../AddContactForm';

import { Container, ListContainer, PageSection } from './styles';

const FormDashboard: React.FC = () => {
  const [addContactForm, setAddContactForm] = useState(false);
  const { userForms } = useForm();

  const handleContactForm = useCallback((e: boolean) => {
    setAddContactForm(e);
  }, []);

  const handleFormPage = useCallback((e: boolean) => {
    setAddContactForm(e);
  }, []);
  return (
    <>
      {addContactForm && (
        <AddContactForm
          handleFormPage={handleFormPage}
          handleCloseWindow={() => handleContactForm(false)}
        />
      )}
      <Container>
        <span>
          <h1>Formulários de contato</h1>
          <button type="button" onClick={() => handleContactForm(true)}>
            <MdAdd size={28} />
          </button>
        </span>

        <ListContainer>
          {userForms.map(form => {
            return (
              <PageSection key={form.id}>
                <button type="button">
                  <h2>{form.title}</h2>
                </button>
              </PageSection>
            );
          })}
        </ListContainer>
      </Container>
    </>
  );
};

export default FormDashboard;
