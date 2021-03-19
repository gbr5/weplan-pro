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
import api from '../services/api';
import { textToSlug } from '../utils/textToSlug';
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
        if (currentForm && currentForm.id) {
          const thisForm = response.data.find(
            form => form.id === currentForm.id,
          );
          thisForm && setCurrentForm(thisForm);
        }
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [currentForm]);

  useEffect(() => {
    getForms();
  }, [getForms]);

  const createForm = useCallback(
    async (data: ICreateFormDTO) => {
      try {
        const thisForm = await api.post('user-form', {
          slug: textToSlug(data.title),
          name: data.name,
          title: data.title,
          message: data.message,
          isActive: data.isActive,
        });
        setCurrentForm(thisForm.data);
        addToast({
          type: 'success',
          title: 'Formulário criado com sucesso!',
        });
        getForms();
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

  const handleSetCurrentForm = useCallback((data: IFormDTO) => {
    setCurrentForm(data);
  }, []);
  const createFormField = useCallback(
    async (data: ICreateFormFieldDTO) => {
      try {
        await api.post('form-field', {
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
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
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
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
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
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
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
        await api.post(`form-field/${id}`);
        addToast({
          type: 'success',
          title: 'Campo deletado com sucesso!',
        });
        getForms();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getForms],
  );

  return (
    <FormContext.Provider
      value={{
        currentForm,
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