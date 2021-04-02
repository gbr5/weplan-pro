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
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';
import IGoogleProfileObjectDTO from '../../dtos/IGoogleProfileObjectDTO';
import GoogleFormAutoFill from '../../components/FormComponents/GoogleFormAutoFill';

interface IParams {
  id: string;
}

const UserForm: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<IParams>();
  const [form, setForm] = useState({} as IFormDTO);
  const history = useHistory();
  const [googleAutoFill, setGoogleAutoFill] = useState(false);

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

  const handleCreateCompanyContact = useCallback(
    async (name: string) => {
      try {
        const response = await api.post<ICompanyContactDTO>(
          `company/contacts`,
          {
            company_id: form.user_id,
            name,
            family_name: '',
            description: `Formulário - ${form.name}`,
            company_contact_type: 'Others',
            weplanUser: false,
            isCompany: false,
          },
        );
        return response.data;
      } catch (err) {
        throw new Error(err);
      }
    },
    [form],
  );

  const handleCreateCompanyContactInfo = useCallback(
    async (email: string, company_contact_id: string) => {
      try {
        await api.post(`company/contacts/info`, {
          company_contact_id,
          info_type: 'Email',
          info: email,
        });
        setGoogleAutoFill(true);
      } catch (err) {
        throw new Error(err);
      }
    },
    [],
  );

  const handleCreateCompanyContactWithGoogle = useCallback(
    async ({ email, givenName, familyName }: IGoogleProfileObjectDTO) => {
      if (form && form.id) {
        try {
          const response = await api.post<ICompanyContactDTO>(
            `company/contacts`,
            {
              company_id: form.user_id,
              name: givenName,
              family_name: familyName,
              description: `Formulário - ${form.name}`,
              company_contact_type: 'Others',
              weplanUser: false,
              isCompany: false,
            },
          );
          handleCreateCompanyContactInfo(email, response.data.id);
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    [form, handleCreateCompanyContactInfo],
  );

  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(
    async e => {
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

        if (googleAutoFill) {
          const { name, email } = e;

          const newContact = await handleCreateCompanyContact(name);
          const company_contact_id = newContact.id;
          handleCreateCompanyContactInfo(email, company_contact_id);
        }
        await api.post('send-form-results', {
          form_id: form.id,
          formResults,
        });
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
    [
      form,
      addToast,
      history,
      handleCreateCompanyContactInfo,
      handleCreateCompanyContact,
      googleAutoFill,
    ],
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
          <GoogleFormAutoFill
            buttonText="Preencha com o Google"
            handleGetUserInfo={(e: IGoogleProfileObjectDTO) =>
              handleCreateCompanyContactWithGoogle(e)
            }
          />
          <h1>{form.title}</h1>
          <p>{form.message}</p>
          {form &&
            form.fields &&
            !googleAutoFill &&
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
          {form &&
            form.fields &&
            googleAutoFill &&
            form.fields
              .filter(
                field => field.name !== 'name' && !field.name.includes('email'),
              )
              .map(field => {
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
