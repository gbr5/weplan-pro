import React, { useCallback, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdAdd, MdEdit } from 'react-icons/md';
import IFormFieldDTO from '../../../dtos/IFormFieldDTO';
import { useForm } from '../../../hooks/form';
import { sortFormFields } from '../../../utils/sortFormFields';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import AddFormField from '../AddFormField';
import EditFormField from '../EditFormField';
import EditFormStyles from '../EditFormStyles';
import FormSettings from '../FormSettings';
import WindowFormContainer from '../WindowFormContainer';
import EditFormSubTitle from './EditFormSubtitle';
import EditFormTitle from './EditFormTitle';

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
  const { currentForm, deleteForm, defaultFormStyles } = useForm();

  const [addFormField, setAddFormField] = useState(false);
  const [editFormField, setEditFormField] = useState(false);
  const [editFormStyles, setEditFormStyles] = useState(false);
  const [formSettings, setFormSettings] = useState(false);
  const [selectedField, setSelectedField] = useState({} as IFormFieldDTO);
  const [formStyles, setFormStyles] = useState(defaultFormStyles);
  const [deleteFormConfirmation, setDeleteFormConfirmation] = useState(false);

  const url = 'https://weplan.pro';

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

  const handleFormStyles = useCallback((e: boolean) => {
    setEditFormStyles(e);
  }, []);

  const handleFormSettings = useCallback((e: boolean) => {
    setFormSettings(e);
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
    <>
      {formSettings && (
        <FormSettings closeWindow={() => handleFormSettings(false)} />
      )}
      {editFormStyles && (
        <EditFormStyles
          form={currentForm}
          handleCloseWindow={() => handleFormStyles(false)}
        />
      )}
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
              <button type="button" onClick={() => handleFormStyles(true)}>
                Definir Cores
              </button>
              <button type="button" onClick={() => handleFormSettings(true)}>
                Configurações
              </button>
            </FirstButtonRow>
            <UrlContainer>
              {currentForm.emailNotifications &&
              currentForm.emailNotifications.length > 0 ? (
                <>
                  <strong>Url</strong>
                  <a href={`${url}/form/${currentForm.id}`} target="blank">
                    {`${url}/form/${currentForm.id}`}
                  </a>
                </>
              ) : (
                <Button type="button" onClick={() => handleFormSettings(true)}>
                  Terminar configurações
                </Button>
              )}
            </UrlContainer>
            <FormContainer formStyles={formStyles}>
              <EditFormTitle />
              <EditFormSubTitle />
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
                          {field.name !== 'name' && field.name !== 'email' && (
                            <button
                              type="button"
                              onClick={() => handleOpenEditField(field)}
                            >
                              <MdEdit size={24} />
                            </button>
                          )}
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
                <AddFormField
                  closeComponent={() => handleAddFormField(false)}
                />
              )}
              <AddField type="button" onClick={() => handleAddFormField(true)}>
                <MdAdd size={32} />
              </AddField>
              <Button
                type="button"
                style={{
                  background: 'red',
                  paddingTop: '1rem',
                  paddingBottom: '1rem',
                }}
                onClick={() => handleDeleteFormConfirmation(true)}
              >
                <FiTrash2 size={24} />
                Deletar Formulário
              </Button>
            </FormContainer>
          </Container>
        )}
      </WindowFormContainer>
    </>
  );
};

export default FormWindow;
