import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ICreateFormDTO from '../dtos/ICreateFormDTO';
import ICreateFormFieldDTO from '../dtos/ICreateFormFieldDTO';
import IFormContextDTO from '../dtos/IFormContextDTO';
import IFormDTO from '../dtos/IFormDTO';
import IFormFieldDTO from '../dtos/IFormFieldDTO';
import IFormStylesDTO from '../dtos/IFormStylesDTO';
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

  const getForms = useCallback(() => {
    try {
      api.get<IFormDTO[]>('/user-form').then(response => {
        setUserForms(response.data);
      });
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
        getForm(currentForm.id);
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

  const defaultFormStyles = {
    background_color: '#c9c9c9',
    text_color: '#050115',
    button_color: '#ff9900',
    button_text_color: '#050115',
  };

  return (
    <FormContext.Provider
      value={{
        currentForm,
        defaultFormStyles,
        updateFormStyles,
        userForms,
        getForm,
        getForms,
        createForm,
        createFormField,
        updateForm,
        updateFormField,
        deleteForm,
        deleteFormField,
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
