import React, { useCallback, useState } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import IFormFieldDTO from '../../../dtos/IFormFieldDTO';
import { useAuth } from '../../../hooks/auth';
import { useForm } from '../../../hooks/form';
import { sortFormFields } from '../../../utils/sortFormFields';
import { textToSlug } from '../../../utils/textToSlug';
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
} from './styles';

interface IProps {
  handleCloseWindow: Function;
}

const FormWindow: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { currentForm } = useForm();
  const { company } = useAuth();

  const [addFormField, setAddFormField] = useState(false);
  const [editFormField, setEditFormField] = useState(false);
  const [selectedField, setSelectedField] = useState({} as IFormFieldDTO);

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

  return (
    <WindowFormContainer onHandleCloseWindow={handleCloseWindow}>
      {currentForm && currentForm.id && (
        <Container>
          <FirstButtonRow>
            <a
              href={`${url}/form/${companyName}/${currentForm.slug}`}
              target="blank"
            >
              Visualizar
            </a>
            {/* <a
              href={`${url}/form/${companyName}/${currentForm.slug}`}
              target="blank"
            >
              {`${url}/form/${companyName}/${currentForm.slug}`}
            </a> */}
            <button type="button">Editar</button>
          </FirstButtonRow>
          <UrlContainer>
            <strong>url:</strong>
            <a
              href={`${url}/form/${companyName}/${currentForm.slug}`}
              target="blank"
            >
              {`${url}/form/${companyName}/${currentForm.slug}`}
            </a>
          </UrlContainer>
          <FormContainer>
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
                      <FakeField key={field.id}>
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
              </FakeFieldSection>
            )}

            {addFormField && (
              <AddFormField closeComponent={() => handleAddFormField(false)} />
            )}
            <AddField type="button" onClick={() => handleAddFormField(true)}>
              <MdAdd size={32} />
            </AddField>
          </FormContainer>
        </Container>
      )}
    </WindowFormContainer>
  );
};

export default FormWindow;
