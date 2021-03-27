import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useContactPage } from '../../../hooks/contactPages';
import AddContactPageForm from './AddContactPageForm';
import ContactPageFormButton from './ContactPageFormButton';

import { Container, AddButtonLink } from './styles';

const ContactPageFormSection: React.FC = () => {
  const { currentContactPage } = useContactPage();
  const [addPageForm, setAddPageForm] = useState(false);

  const handleAddPageForm = useCallback((e: boolean) => {
    setAddPageForm(e);
  }, []);

  return (
    <Container>
      {currentContactPage &&
        currentContactPage.forms &&
        currentContactPage.forms.map(link => {
          return <ContactPageFormButton key={link.id} contactPageForm={link} />;
        })}
      {addPageForm && (
        <AddContactPageForm closeComponent={() => handleAddPageForm(false)} />
      )}
      <AddButtonLink onClick={() => handleAddPageForm(true)} type="button">
        <MdAdd size={64} />
      </AddButtonLink>
    </Container>
  );
};

export default ContactPageFormSection;
