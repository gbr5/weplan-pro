import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ICheckBoxOptionDTO from '../dtos/ICheckBoxOptionDTO';
import ICreateFormDTO from '../dtos/ICreateFormDTO';
import ICreateFormEmailNotificationDTO from '../dtos/ICreateFormEmailNotificationDTO';
import ICreateFormFieldDTO from '../dtos/ICreateFormFieldDTO';
import IFormContextDTO from '../dtos/IFormContextDTO';
import IFormDTO from '../dtos/IFormDTO';
import IFormEmailNotificationDTO from '../dtos/IFormEmailNotificationDTO';
import IFormEmailNotificationRecipientDTO from '../dtos/IFormEmailNotificationRecipientDTO';
import IFormFieldDTO from '../dtos/IFormFieldDTO';
import IFormLandingPageDTO from '../dtos/IFormLandingPageDTO';
import IFormStylesDTO from '../dtos/IFormStylesDTO';
import IFormSuccessMessageDTO from '../dtos/IFormSuccessMessageDTO';
import api from '../services/api';
import { useToast } from './toast';

const FormContext = createContext<IFormContextDTO>({} as IFormContextDTO);

const FormProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const [currentForm, setCurrentForm] = useState<IFormDTO>({} as IFormDTO);
  const [userForms, setUserForms] = useState<IFormDTO[]>([]);

  const getForm = useCallback(async (id: string) => {
    try {
      const response = await api.get<IFormDTO>(`/user-form/show/${id}`);
      setCurrentForm(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getForms = useCallback(async () => {
    try {
      const response = await api.get<IFormDTO[]>('/user-form');
      setUserForms(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getForms();
  }, [getForms]);

  const createForm = useCallback(
    async (data: ICreateFormDTO) => {
      try {
        const thisForm = await api.post<IFormDTO>('user-form', {
          slug: data.slug,
          name: data.name,
          title: data.title,
          message: data.message,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Formulário criado com sucesso!',
          description: 'Para ativar vá até configurações do formulário',
        });
        getForms();
        return thisForm.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
  );

  const removeCurrentForm = useCallback(() => {
    setCurrentForm({} as IFormDTO);
  }, []);

  const handleSetCurrentForm = useCallback(
    (data: IFormDTO) => {
      removeCurrentForm();
      setCurrentForm(data);
    },
    [removeCurrentForm],
  );

  const createFormField = useCallback(
    async (data: ICreateFormFieldDTO) => {
      try {
        const thisFormField = await api.post('form-field', {
          name: data.name,
          form_id: data.form_id,
          position: data.position,
          placeholder: data.placeholder,
          title: data.title,
          type: data.type,
          isRequired: data.isRequired,
        });
        addToast({
          type: 'success',
          title: 'Campo criado com sucesso!',
        });
        getForms();
        getForm(data.form_id);
        return thisFormField.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [getForms, addToast, getForm],
  );
  const createFormEmailNotification = useCallback(
    async (data: ICreateFormEmailNotificationDTO) => {
      const form = await getForm(data.form_id);
      if (!form) {
        return addToast({
          type: 'error',
          title: 'Formulário não encontrado!',
          description: 'Tente novamente',
        });
      }
      const findSameNotificationType = form.emailNotifications.find(
        email => email.notification_type === data.notification_type,
      );

      if (findSameNotificationType) {
        return addToast({
          type: 'error',
          title: 'Este formulário já possui um e-mail resposta.',
          description:
            'Não é possível ter mais de um. Tente editar o já existente!',
        });
      }
      try {
        await api.post('form-email-notification', {
          form_id: data.form_id,
          subject: data.subject,
          message: data.message,
          notification_type: data.notification_type,
        });

        getForms();
        getForm(data.form_id);
        return addToast({
          type: 'success',
          title: 'E-mail resposta criado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar e-mail resposta!',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const createFormLandingPage = useCallback(
    async (data: Omit<IFormLandingPageDTO, 'id'>) => {
      const form = await getForm(data.form_id);
      if (!form) {
        return addToast({
          type: 'error',
          title: 'Formulário não encontrado!',
          description: 'Tente novamente',
        });
      }

      if (form.landingPage) {
        return addToast({
          type: 'error',
          title: 'Este formulário já possui uma landing page!',
          description:
            'Não é possível ter mais de uma. Tente editar a já existente.',
        });
      }
      try {
        await api.post('form-landing-page', {
          form_id: data.form_id,
          url: data.url,
          isActive: data.isActive,
        });

        getForms();
        getForm(data.form_id);
        return addToast({
          type: 'success',
          title: 'Landing page criada com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar landing page!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const createEmailNotificationRecipient = useCallback(
    async (data: Omit<IFormEmailNotificationRecipientDTO, 'id'>) => {
      try {
        await api.post('form-email-notification-recipient', {
          email_notification_id: data.email_notification_id,
          sending_type: data.sending_type,
          email: data.email,
        });

        getForms();
        currentForm && getForm(currentForm.id);
        return addToast({
          type: 'success',
          title: 'Destinatário criado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar destinatário',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm, currentForm],
  );
  const updateFormSuccessMessage = useCallback(
    async (data: IFormSuccessMessageDTO) => {
      try {
        await api.put(`form-success-message/${data.id}`, {
          title: data.title,
          message: data.message,
        });

        getForms();
        getForm(data.form_id);
        return addToast({
          type: 'success',
          title: 'Mensagem de sucesso criada com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar mensagem de sucesso',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateForm = useCallback(
    async (data: IFormDTO) => {
      try {
        await api.put(`user-form/${data.id}`, {
          slug: data.slug,
          name: data.name,
          title: data.title,
          message: data.message,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Formulário atualizado com sucesso!',
        });
        getForms();
        getForm(data.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateFormField = useCallback(
    async (data: IFormFieldDTO) => {
      try {
        await api.put(`form-field/${data.id}`, {
          name: data.name,
          position: data.position,
          placeholder: data.placeholder,
          title: data.title,
          type: data.type,
          isRequired: data.isRequired,
        });
        addToast({
          type: 'success',
          title: 'Campo atualizado com sucesso!',
        });
        getForms();
        getForm(data.form_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateFormLandingPage = useCallback(
    async (data: IFormLandingPageDTO) => {
      try {
        await api.put(`form-landing-page/${data.id}`, {
          url: data.url,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Landing page atualizada com sucesso!',
        });
        getForms();
        getForm(data.form_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar a landing page!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateFormStyles = useCallback(
    async (data: IFormStylesDTO) => {
      try {
        await api.put(`form-styles/${data.id}`, {
          background_color: data.background_color,
          text_color: data.text_color,
          button_color: data.button_color,
          button_text_color: data.button_text_color,
        });
        addToast({
          type: 'success',
          title: 'Layout atualizado com sucesso!',
        });
        getForms();
        getForm(data.form_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o layout!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateFormEmailNotification = useCallback(
    async (data: Omit<IFormEmailNotificationDTO, 'recipients'>) => {
      try {
        await api.put(`form-email-notification/${data.id}`, {
          subject: data.subject,
          message: data.message,
        });

        getForms();
        getForm(data.form_id);
        return addToast({
          type: 'success',
          title: 'Notificação atualizada com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar a notifação!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );
  const updateFormEmailNotificationRecipient = useCallback(
    async (data: IFormEmailNotificationRecipientDTO) => {
      try {
        await api.put(`form-email-notification-recipient/${data.id}`, {
          sending_type: data.sending_type,
          email: data.email,
        });

        getForms();
        currentForm && getForm(currentForm.id);
        return addToast({
          type: 'success',
          title: 'Destinatário atualizado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar destinatário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm, currentForm],
  );
  const deleteForm = useCallback(
    async (id: string) => {
      try {
        await api.delete(`user-form/${id}`);
        addToast({
          type: 'success',
          title: 'Formulário deletado com sucesso!',
        });
        getForms();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
  );
  const deleteFormField = useCallback(
    async (id: string) => {
      try {
        await api.delete(`form-field/${id}`);
        addToast({
          type: 'success',
          title: 'Campo deletado com sucesso!',
        });
        getForms();
        currentForm && getForm(currentForm.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm, currentForm],
  );
  const deleteFormEmailNotification = useCallback(
    async (data: Omit<IFormEmailNotificationDTO, 'recipients'>) => {
      try {
        await api.delete(`form-email-notification/${data.id}`);
        addToast({
          type: 'success',
          title: 'Email deletado com sucesso!',
        });
        getForms();
        getForm(data.form_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar email!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms, getForm],
  );

  const defaultFormStyles = {
    background_color: '#c9c9c9',
    text_color: '#050115',
    button_color: '#ff9900',
    button_text_color: '#050115',
  };

  const fieldTypes: ICheckBoxOptionDTO[] = [
    { id: 'text', label: 'Texto', value: 'text' },
    { id: 'email', label: 'Email', value: 'email' },
    { id: 'date', label: 'Data', value: 'date' },
    { id: 'number', label: 'Número', value: 'number' },
  ];

  return (
    <FormContext.Provider
      value={{
        fieldTypes,
        defaultFormStyles,
        currentForm,
        createFormLandingPage,
        createFormEmailNotification,
        createEmailNotificationRecipient,
        updateFormSuccessMessage,
        userForms,
        getForm,
        getForms,
        createForm,
        createFormField,
        updateForm,
        updateFormField,
        updateFormLandingPage,
        updateFormStyles,
        updateFormEmailNotification,
        updateFormEmailNotificationRecipient,
        deleteForm,
        deleteFormField,
        deleteFormEmailNotification,
        handleSetCurrentForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

function useForm(): IFormContextDTO {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useToggleTheme must be used within a theme provider');
  }

  return context;
}

export { FormProvider, useForm };
