import React from 'react';
import { FiEdit } from 'react-icons/fi';
import IFormDTO from '../../../dtos/IFormDTO';
import { useAuth } from '../../../hooks/auth';
import { textToSlug } from '../../../utils/textToSlug';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  handleCloseWindow: Function;
  form: IFormDTO;
}

const EditForm: React.FC<IProps> = ({ handleCloseWindow, form }) => {
  const { company } = useAuth();
  const url = process.env.REACT_APP_API_URL;
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
        <section>
          <strong>Nome do Formulário</strong>
          <button type="button">
            <h1>{form.name}</h1>
            <FiEdit />
          </button>
        </section>
        <section>
          <strong>Título</strong>
          <button type="button">
            <h1>{form.title}</h1>
            <FiEdit />
          </button>
        </section>
        <section>
          <strong>Slug</strong>
          <button type="button">
            <h3>{form.slug}</h3>
            <FiEdit />
          </button>
          <p>{`${url}/${companyName}/${form.slug}`}</p>
        </section>
        <section>
          <strong>Mensagem</strong>
          <button type="button">
            <h3>{form.message}</h3>
            <FiEdit />
          </button>
        </section>
        <section>
          <strong>Formulário ativo</strong>
          <button type="button">
            <h3>{form.isActive ? 'Ativo' : 'Inativo'}</h3>
            <FiEdit />
          </button>
        </section>
      </Container>
    </WindowContainer>
  );
};

export default EditForm;
