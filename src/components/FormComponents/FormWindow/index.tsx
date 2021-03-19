import React from 'react';
import { useAuth } from '../../../hooks/auth';
import { useForm } from '../../../hooks/form';
import { textToSlug } from '../../../utils/textToSlug';
import Input from '../../Input';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  handleCloseWindow: Function;
}

const FormWindow: React.FC<IProps> = ({ handleCloseWindow }) => {
  const { currentForm } = useForm();
  const { company } = useAuth();
  // const url = process.env.REACT_APP_API_URL;
  const url = 'https://weplanweb.vercel.app/';
  const companyName = textToSlug(company.name);

  return (
    <WindowContainer
      onHandleCloseWindow={handleCloseWindow}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        <header>
          <a href={`${url}/form/${companyName}/${currentForm.slug}`}>
            Visualizar página {`${url}/form/${companyName}/${currentForm.slug}`}
          </a>
          <button type="button">Editar formulário</button>
        </header>
        <h1>{currentForm.title}</h1>
        <h3>{currentForm.message}</h3>
        <section>
          {currentForm.fields.map(field => {
            return (
              <span key={field.id}>
                <strong>{field.title}</strong>
                <Input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </span>
            );
          })}
        </section>
      </Container>
    </WindowContainer>
  );
};

export default FormWindow;
