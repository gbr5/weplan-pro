import React, { useCallback, useState } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { useAuth } from '../../../hooks/auth';
import { useForm } from '../../../hooks/form';
import { textToSlug } from '../../../utils/textToSlug';
import AddFormField from '../AddFormField';
import WindowFormContainer from '../WindowFormContainer';

import {
  Container,
  FormContainer,
  AddField,
  FakeInput,
  FakeField,
} from './styles';

interface IProps {
  handleCloseWindow: Function;
}

const FormWindow: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { currentForm } = useForm();
  const { company } = useAuth();

  const [addFormField, setAddFormField] = useState(false);

  const url = 'https://weplanweb.vercel.app';
  const companyName = textToSlug(company.name);

  const handleAddFormField = useCallback((e: boolean) => {
    setAddFormField(e);
  }, []);

  return (
    <WindowFormContainer onHandleCloseWindow={handleCloseWindow}>
      {currentForm && currentForm.id && (
        <Container>
          <span>
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
          </span>
          <aside>
            <strong>url:</strong>
            <a
              href={`${url}/form/${companyName}/${currentForm.slug}`}
              target="blank"
            >
              {`${url}/form/${companyName}/${currentForm.slug}`}
            </a>
          </aside>
          <FormContainer>
            <h1>{currentForm.title}</h1>
            <p>{currentForm.message}</p>
            <section>
              {currentForm.fields.map(field => {
                console.log(field);
                return (
                  <FakeField key={field.id}>
                    <button type="button">
                      <MdEdit size={24} />
                    </button>
                    <strong>{field.title}</strong>
                    <FakeInput />
                  </FakeField>
                );
              })}
            </section>

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
