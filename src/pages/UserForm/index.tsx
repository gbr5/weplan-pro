import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLoader } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
import IFormDTO from '../../dtos/IFormDTO';
import api from '../../services/api';
import { Container, FormContainer, InputField, WePlanButtons } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

interface IParams {
  id: string;
}

interface IFormProps {
  [key: string]: unknown;
}

const UserForm: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<IParams>();
  const [form, setForm] = useState({} as IFormDTO);
  const history = useHistory();

  const handleGetUserForm = useCallback(async () => {
    try {
      const response = await api.get<IFormDTO>(`external-user-form/${id}`);
      setForm(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [id]);

  useEffect(() => {
    handleGetUserForm();
  }, [handleGetUserForm]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async e => {
      console.log({ e, form });
      setLoading(true);
      try {
        const formResults = JSON.stringify(e)
          .replace(/\{/g, '')
          .replace(/\}/g, '')
          .replace(/"/g, '')
          .split(',')
          .map(result => {
            const name = result.split(':')[0];
            const value = result.split(':')[1];

            return {
              name,
              value,
            };
          });
        console.log({
          form_id: form.id,
          formResults,
        });

        await api.post('send-form-results', {
          form_id: form.id,
          formResults,
        });
        console.log('Cheguei aqui pessu!!');
        addToast({
          type: 'success',
          title: 'Formulário enviado com sucesso',
        });
        // if (form.landingPage && form.landingPage.isActive) {
        //   window.location.replace(form.landingPage.url);
        // }
        if (form.successMessage && form.successMessage.title) {
          history.push(`/success-message/${form.successMessage.id}`);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro, tenten novamente!',
        });
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    },
    [form, addToast, history],
  );

  const background = (form.styles && form.styles.background_color) || '#c9c9c9';
  const text = (form.styles && form.styles.text_color) || '#010101';
  const buttonBackground =
    (form.styles && form.styles.button_color) || '#FF9900';
  const buttonText =
    (form.styles && form.styles.button_text_color) || '#010101';
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContainer
          background={background}
          text={text}
          buttonBackground={buttonBackground}
          buttonText={buttonText}
        >
          <WePlanButtons>
            <a target="blank" href="https://www.weplan.party">
              Sou WePlan!
            </a>
            <a target="blank" href="https://www.weplan.party/signup">
              Quero ser WePlan!
            </a>
          </WePlanButtons>
          <h1>{form.title}</h1>
          <p>{form.message}</p>
          {form &&
            form.fields &&
            form.fields.map(field => {
              return (
                <InputField key={field.id}>
                  <strong>{field.title}</strong>
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                  />
                </InputField>
              );
            })}
          <Button loading={loading} type="submit">
            {loading ? <FiLoader /> : 'Enviar'}
          </Button>
        </FormContainer>
      </Form>
    </Container>
  );
};
export default UserForm;
