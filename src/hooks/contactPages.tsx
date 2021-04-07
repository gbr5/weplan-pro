import React, {
  ChangeEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import IContactPageCampaignDTO from '../dtos/IContactPageCampaignDTO';
import IContactPageContextDTO from '../dtos/IContactPageContextDTO';
import IContactPageDTO from '../dtos/IContactPageDTO';
import IContactPageFormDTO from '../dtos/IContactPageFormDTO';
import IContactPageLinkDTO from '../dtos/IContactPageLinkDTO';
import IContactPagePostDTO from '../dtos/IContactPagePostDTO';
import IContactPageSEODTO from '../dtos/IContactPageSEODTO';
import ICreateContactPageCampaignDTO from '../dtos/ICreateContactPageCampaignDTO';
import ICreateContactPageDTO from '../dtos/ICreateContactPageDTO';
import ICreateContactPageLinkDTO from '../dtos/ICreateContactPageLinkDTO';
import ICreateContactPageSEODTO from '../dtos/ICreateContactPageSEODTO';
import IFormDTO from '../dtos/IFormDTO';
import api from '../services/api';
import { textToSlug } from '../utils/textToSlug';
import { useEmployeeAuth } from './employeeAuth';
import { useToast } from './toast';

const ContactPageContext = createContext<IContactPageContextDTO>(
  {} as IContactPageContextDTO,
);

const ContactPageProvider: React.FC = ({ children }) => {
  const { employee } = useEmployeeAuth();
  const { addToast } = useToast();
  const [currentContactPagePost, setCurrentContactPagePost] = useState<
    IContactPagePostDTO
  >({} as IContactPagePostDTO);
  const [currentContactPage, setCurrentContactPage] = useState<IContactPageDTO>(
    {} as IContactPageDTO,
  );
  const [currentContactPages, setCurrentContactPages] = useState<
    IContactPageDTO[]
  >([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getContactPage = useCallback(async (id: string) => {
    try {
      const response = await api.get<IContactPageDTO>(
        `/user-contact-page/show/${id}`,
      );
      setCurrentContactPage(response.data);
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  const getContactPages = useCallback(async () => {
    try {
      const response = await api.get<IContactPageDTO[]>('/user-contact-page');
      setCurrentContactPages(response.data);
      localStorage.setItem('@WP-PRO:e-links', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    if (employee && employee.id) {
      const findContactPages = localStorage.getItem('@WP-PRO:e-links');

      if (findContactPages) {
        const parsedPages = JSON.parse(findContactPages);
        setCurrentContactPages(parsedPages);
      } else {
        getContactPages();
      }
    }
  }, [getContactPages, employee]);

  const createContactPage = useCallback(
    async (data: ICreateContactPageDTO) => {
      try {
        const thisContactPage = await api.post<IContactPageDTO>(
          'user-contact-page',
          {
            slug: textToSlug(data.title),
            cta_label: data.cta_label,
            title: data.title,
            cta_url: data.cta_url,
            image_url: '',
            isActive: false,
          },
        );
        addToast({
          type: 'success',
          title: 'ContactPageulário criado com sucesso!',
          description: 'Para ativar vá até configurações do formulário',
        });
        getContactPages();
        setCurrentContactPage(thisContactPage.data);
        return thisContactPage.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao criar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages],
  );
  const createContactPageLink = useCallback(
    async (data: ICreateContactPageLinkDTO) => {
      try {
        await api.post('contact-page-link', {
          contact_page_id: currentContactPage.id,
          label: data.label,
          url: data.url,
          text_color: data.text_color,
          background_color: data.background_color,
          isActive: true,
        });
        addToast({
          type: 'success',
          title: 'Botão criado com sucesso!',
          description:
            'Agora a sua página está pronta para ser indexada no google!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar o botão',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPage, getContactPages, currentContactPage],
  );
  const createContactPageSEO = useCallback(
    async (data: ICreateContactPageSEODTO) => {
      try {
        await api.post('contact-page-seo', {
          contact_page_id: data.contact_page_id,
          image_url: currentContactPage.image_url || '',
          title: data.title,
          description: data.description,
          shouldIndexPage: true,
        });
        addToast({
          type: 'success',
          title: 'SEO criado com sucesso!',
          description:
            'Agora a sua página está pronta para ser indexada no google!',
        });
        getContactPages();
        getContactPage(data.contact_page_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar o SEO da sua página',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPage, getContactPages, currentContactPage],
  );
  const createContactPageCampaign = useCallback(
    async (data: ICreateContactPageCampaignDTO) => {
      try {
        await api.post('contact-page-campaign', {
          contact_page_id: currentContactPage.id,
          name: data.name,
          message: data.message,
          cta_label: data.cta_label,
          url: data.url,
          text_color: '#111',
          background_color: '#ff99af',
          cta_text_color: '#111',
          cta_background_color: '#ff9900',
        });
        addToast({
          type: 'success',
          title: 'Campanha criado com sucesso!',
          description: 'Você já pode customizar e ativar a sua campanha!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar a campanha da sua página',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPage, getContactPages, currentContactPage],
  );
  const handleSetCurrentPost = useCallback((e: IContactPagePostDTO) => {
    setCurrentContactPagePost(e);
  }, []);
  const createContactPagePost = useCallback(
    async (destination_url: string) => {
      try {
        const post = await api.post('contact-page-post', {
          contact_page_id: currentContactPage.id,
          destination_url,
          image_url: '',
        });
        handleSetCurrentPost(post.data);
        addToast({
          type: 'success',
          title: 'Post criado com sucesso!',
          description: 'Agora falta fazer o upload da imagem!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
        return post.data;
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar o post',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      getContactPage,
      getContactPages,
      currentContactPage,
      handleSetCurrentPost,
    ],
  );
  const createContactPageForm = useCallback(
    async (data: IFormDTO) => {
      try {
        await api.post('contact-page-form', {
          contact_page_id: currentContactPage.id,
          form_id: data.id,
          isActive: true,
        });
        addToast({
          type: 'success',
          title: 'Formulário adicionado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não foi possível criar o post',
          description: 'Tente novamente!',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPage, getContactPages, currentContactPage],
  );
  const removeCurrentContactPage = useCallback(() => {
    setCurrentContactPage({} as IContactPageDTO);
  }, []);
  const handleSetCurrentContactPage = useCallback(
    (data: IContactPageDTO) => {
      removeCurrentContactPage();
      setCurrentContactPage(data);
    },
    [removeCurrentContactPage],
  );
  const updateContactPage = useCallback(
    async (data: IContactPageDTO) => {
      try {
        await api.put(`user-contact-page/${data.id}`, {
          slug: data.slug,
          title: data.title,
          cta_label: data.cta_label,
          cta_url: data.cta_url,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Página de contato atualizada com sucesso!',
        });
        getContactPages();
        getContactPage(data.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar a página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage],
  );
  const updateContactPageSEO = useCallback(
    async (data: IContactPageSEODTO) => {
      try {
        await api.put(`contact-page-seo/${data.id}`, {
          image_url: data.image_url,
          title: data.title,
          description: data.description,
          shouldIndexPage: data.shouldIndexPage,
        });
        addToast({
          type: 'success',
          title: 'SEO da página atualizado com sucesso!',
        });
        getContactPages();
        getContactPage(data.contact_page_id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o SEO da página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage],
  );
  const updateContactPageForm = useCallback(
    async (data: IContactPageFormDTO) => {
      try {
        await api.put(`contact-page-form/${data.id}`, {
          isActive: !data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Formulário da página atualizado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o formulário da página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, currentContactPage, getContactPage],
  );
  const updateContactPageLink = useCallback(
    async (data: IContactPageLinkDTO) => {
      try {
        await api.put(`contact-page-link/${data.id}`, {
          label: data.label,
          url: data.url,
          text_color: data.text_color,
          background_color: data.background_color,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Botão da página atualizado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o botão da página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage.id],
  );
  const updateContactPagePost = useCallback(
    async (data: IContactPagePostDTO) => {
      try {
        await api.put(`contact-page-post/${data.id}`, {
          image_url: data.image_url,
          destination_url: data.destination_url,
        });
        addToast({
          type: 'success',
          title: 'Post da página atualizado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o post da página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage.id],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUploadProgress = useCallback((e: ProgressEvent) => {
    setUploadProgress(Math.round((e.loaded / e.total) * 100));
    console.log('Progress: ', `${Math.round((e.loaded / e.total) * 100)} %`);
  }, []);

  const updateContactPageCampaign = useCallback(
    async (data: IContactPageCampaignDTO) => {
      try {
        await api.put(`contact-page-campaign/${data.id}`, {
          name: data.name,
          message: data.message,
          cta_label: data.cta_label,
          url: data.url,
          text_color: data.text_color,
          background_color: data.background_color,
          cta_text_color: data.cta_text_color,
          cta_background_color: data.cta_background_color,
          isActive: data.isActive,
        });
        addToast({
          type: 'success',
          title: 'Campanha da página atualizada com sucesso!',
        });
        getContactPage(currentContactPage.id);
        getContactPages();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar a campanha da página!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, currentContactPage, getContactPages, getContactPage],
  );

  const updateContactPageMainImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (e.target.files) {
          const data = new FormData();
          const pageId = currentContactPage.id;
          data.append('image_url', e.target.files[0]);
          await api.patch(`/user-contact-page/image/${pageId}`, data, {
            onUploadProgress,
            maxContentLength: Infinity,
            timeout: 5000000,
          });
          getContactPage(pageId);
          getContactPages();
          addToast({
            type: 'success',
            title: 'Imagem atualizado com sucesso.',
          });
        } else {
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: 'Ocorreu um erro a imagem da página, tente novamente.',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      getContactPages,
      getContactPage,
      onUploadProgress,
      currentContactPage,
    ],
  );
  const patchContactPageImagePost = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (e.target.files) {
          const data = new FormData();
          const postId = currentContactPage.id;
          data.append('image_url', e.target.files[0]);
          await api.patch(
            `/contact-page-image-post/${currentContactPagePost.id}`,
            data,
            {
              onUploadProgress,
              maxContentLength: Infinity,
              timeout: 5000000,
            },
          );
          getContactPage(postId);
          getContactPages();
          addToast({
            type: 'success',
            title: 'Imagem atualizado com sucesso.',
          });
        } else {
          addToast({
            type: 'error',
            title: 'Erro na atualização',
            description: 'Ocorreu um erro a imagem da página, tente novamente.',
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar o campo!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      currentContactPagePost,
      getContactPages,
      getContactPage,
      currentContactPage,
      onUploadProgress,
    ],
  );
  const deleteContactPage = useCallback(
    async (id: string) => {
      try {
        await api.delete(`user-contact-page/${id}`);
        addToast({
          type: 'success',
          title: 'ContactPageulário deletado com sucesso!',
        });
        getContactPages();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages],
  );
  const deleteContactPageSEO = useCallback(
    async (id: string) => {
      try {
        await api.delete(`contact-page-seo/${id}`);
        addToast({
          type: 'success',
          title: 'SEO deletado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar SEO!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPage, currentContactPage, getContactPages],
  );
  const deleteContactPageCampaign = useCallback(
    async (id: string) => {
      try {
        await api.delete(`contact-page-campaign/${id}`);
        addToast({
          type: 'success',
          title: 'Campanha deletada com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar campanha!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage],
  );
  const deleteContactPageLink = useCallback(
    async (id: string) => {
      try {
        await api.delete(`contact-page-link/${id}`);
        addToast({
          type: 'success',
          title: 'Botão deletado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar botão!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage],
  );
  const deleteContactPagePost = useCallback(
    async (id: string) => {
      try {
        await api.delete(`contact-page-post/${id}`);
        addToast({
          type: 'success',
          title: 'Post deletado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar post!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage],
  );
  const deleteContactPageForm = useCallback(
    async (id: string) => {
      try {
        await api.delete(`contact-page-form/${id}`);
        addToast({
          type: 'success',
          title: 'Formulário deletado com sucesso!',
        });
        getContactPages();
        getContactPage(currentContactPage.id);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar formulário!',
          description: 'Tente novamente',
        });
        throw new Error(err);
      }
    },
    [addToast, getContactPages, getContactPage, currentContactPage],
  );
  return (
    <ContactPageContext.Provider
      value={{
        uploadProgress,
        currentContactPage,
        currentContactPagePost,
        currentContactPages,
        getContactPage,
        getContactPages,
        createContactPage,
        createContactPageSEO,
        createContactPageCampaign,
        createContactPagePost,
        createContactPageForm,
        createContactPageLink,
        updateContactPage,
        updateContactPageSEO,
        updateContactPageCampaign,
        updateContactPageMainImage,
        updateContactPageForm,
        updateContactPagePost,
        updateContactPageLink,
        deleteContactPage,
        deleteContactPageSEO,
        deleteContactPageCampaign,
        deleteContactPagePost,
        deleteContactPageForm,
        deleteContactPageLink,
        handleSetCurrentContactPage,
        handleSetCurrentPost,
        patchContactPageImagePost,
      }}
    >
      {children}
    </ContactPageContext.Provider>
  );
};

function useContactPage(): IContactPageContextDTO {
  const context = useContext(ContactPageContext);

  if (!context) {
    throw new Error('useToggleTheme must be used within a theme provider');
  }

  return context;
}

export { ContactPageProvider, useContactPage };
