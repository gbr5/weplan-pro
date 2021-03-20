import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd, MdEdit } from 'react-icons/md';
import IFormFieldDTO from '../../../dtos/IFormFieldDTO';
import { useAuth } from '../../../hooks/auth';
import { useForm } from '../../../hooks/form';
import { sortFormFields } from '../../../utils/sortFormFields';
import { textToSlug } from '../../../utils/textToSlug';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import AddFormField from '../AddFormField';
import EditFormField from '../EditFormField';
import WindowFormContainer from '../WindowFormContainer';

import {
  Container,
  FormContainer,
  AddField,
  FakeInput,
  FakeField,
  FakeFieldSection,
  FirstButtonRow,
  UrlContainer,
  FakeButton,
} from './styles';

interface IProps {
  handleCloseWindow: Function;
}

const FormWindow: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { currentForm, deleteForm } = useForm();
  const { company } = useAuth();

  const defaultFormStyles = {
    background_color: '#c9c9c9',
    text_color: '#050115',
    button_color: '#ff9900',
    button_text_color: '#050115',
  };

  const [addFormField, setAddFormField] = useState(false);
  const [editFormField, setEditFormField] = useState(false);
  const [selectedField, setSelectedField] = useState({} as IFormFieldDTO);
  const [formStyles, setFormStyles] = useState(defaultFormStyles);
  const [deleteFormConfirmation, setDeleteFormConfirmation] = useState(false);

  const url = 'https://weplanweb.vercel.app';
  const companyName = textToSlug(company.name);

  const handleAddFormField = useCallback((e: boolean) => {
    setAddFormField(e);
  }, []);

  const handleOpenEditField = useCallback((data: IFormFieldDTO) => {
    setSelectedField(data);
    setEditFormField(true);
  }, []);

  const handleCloseEditField = useCallback(() => {
    setEditFormField(false);
    setSelectedField({} as IFormFieldDTO);
  }, []);

  const handleDeleteForm = useCallback(() => {
    currentForm && deleteForm(currentForm.id);
    setDeleteFormConfirmation(false);
    handleCloseWindow();
  }, [currentForm, deleteForm, handleCloseWindow]);

  const handleDeleteFormConfirmation = useCallback((e: boolean) => {
    setDeleteFormConfirmation(e);
  }, []);

  useEffect(() => {
    if (currentForm && currentForm.styles) {
      const { background_color } = currentForm.styles;
      const { text_color } = currentForm.styles;
      const { button_color } = currentForm.styles;
      const { button_text_color } = currentForm.styles;
      setFormStyles({
        background_color,
        text_color,
        button_color,
        button_text_color,
      });
    }
  }, [currentForm]);

  return (
    <WindowFormContainer onHandleCloseWindow={handleCloseWindow}>
      {deleteFormConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteFormConfirmation(false)}
          firstButtonFunction={handleDeleteForm}
          firstButtonLabel="Deletar"
          message="Deseja realmente deletar este formulário?"
          secondButtonFunction={() => handleDeleteFormConfirmation(false)}
          secondButtonLabel="Não deletar"
          zIndex={17}
        />
      )}
      {currentForm && currentForm.id && (
        <Container>
          <FirstButtonRow>
            <button type="button">Definir Cores</button>
            <button type="button">Opções de envio</button>
          </FirstButtonRow>
          <UrlContainer>
            <strong>Url</strong>
            <a
              href={`${url}/form/${companyName}/${currentForm.slug}`}
              target="blank"
            >
              {`${url}/form/${companyName}/${currentForm.slug}`}
            </a>
          </UrlContainer>
          <FormContainer formStyles={formStyles}>
            <h1>{currentForm.title}</h1>
            <p>{currentForm.message}</p>
            {editFormField ? (
              <EditFormField
                closeWindow={() => handleCloseEditField()}
                field={selectedField}
              />
            ) : (
              <FakeFieldSection>
                {currentForm &&
                  currentForm.fields &&
                  currentForm.fields.length > 0 &&
                  sortFormFields(currentForm.fields).map(field => {
                    return (
                      <FakeField formStyles={formStyles} key={field.id}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditField(field)}
                        >
                          <MdEdit size={24} />
                        </button>
                        <strong>{field.title}</strong>
                        <FakeInput />
                      </FakeField>
                    );
                  })}
                <FakeButton formStyles={formStyles} type="button">
                  Enviar
                </FakeButton>
              </FakeFieldSection>
            )}

            {addFormField && (
              <AddFormField closeComponent={() => handleAddFormField(false)} />
            )}
            <AddField type="button" onClick={() => handleAddFormField(true)}>
              <MdAdd size={32} />
            </AddField>
            <Button
              type="button"
              onClick={() => handleDeleteFormConfirmation(true)}
            >
              Deletar Formulário <FiTrash2 size={32} />
            </Button>
          </FormContainer>
        </Container>
      )}
    </WindowFormContainer>
  );
};

export default FormWindow;
