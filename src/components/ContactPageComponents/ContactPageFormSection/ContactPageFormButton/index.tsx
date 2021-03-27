import React, { useCallback, useState } from 'react';
import IContactPageFormDTO from '../../../../dtos/IContactPageFormDTO';
import { useContactPage } from '../../../../hooks/contactPages';
import Button from '../../../Button';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';

import { Container } from './styles';

interface IProps {
  contactPageForm: IContactPageFormDTO;
}

const ContactPageFormButton: React.FC<IProps> = ({ contactPageForm }) => {
  const { deleteContactPageForm } = useContactPage();
  const [deleteFormConfirmation, setDeleteFormConfirmation] = useState(false);

  const handleDeleteFormConfirmation = useCallback((e: boolean) => {
    setDeleteFormConfirmation(e);
  }, []);

  const handleDeleteContactPageForm = useCallback(() => {
    deleteContactPageForm(contactPageForm.id);
  }, [deleteContactPageForm, contactPageForm]);

  return (
    <>
      {deleteFormConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteFormConfirmation(false)}
          zIndex={20}
          message="Deseja deletar o formulário da página?"
          firstButtonLabel="Deletar"
          firstButtonFunction={handleDeleteContactPageForm}
          secondButtonLabel="Não Deletar"
          secondButtonFunction={() => handleDeleteFormConfirmation(false)}
        />
      )}
      <Container>
        <Button
          type="button"
          onClick={() => handleDeleteFormConfirmation(true)}
        >
          {contactPageForm.form.name}
        </Button>
      </Container>
    </>
  );
};

export default ContactPageFormButton;
