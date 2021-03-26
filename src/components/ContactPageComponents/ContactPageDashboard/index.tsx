import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IContactPageDTO from '../../../dtos/IContactPageDTO';
import { useContactPage } from '../../../hooks/contactPages';
import AddContactPage from '../AddContactPage';
import ContactPage from '../ContactPage';
import UpdatePageImage from '../UpdatePageImage';

import { Container, ListContainer, PageSection } from './styles';

const ContactPageDashboard: React.FC = () => {
  const { handleSetCurrentContactPage, currentContactPages } = useContactPage();
  const [addContactPageWindow, setAddContactPageWindow] = useState(false);
  const [uploadontactPageMainImage, setUploadContactPageMainImage] = useState(
    false,
  );
  const [contactPageWindow, setContactPageWindow] = useState(false);

  const handleContactPageWindow = useCallback(
    (e: IContactPageDTO) => {
      handleSetCurrentContactPage(e);
      setContactPageWindow(true);
    },
    [handleSetCurrentContactPage],
  );

  const closeContactPageWindow = useCallback(() => {
    setContactPageWindow(false);
  }, []);
  const handleAddContactPageWindow = useCallback((e: boolean) => {
    setAddContactPageWindow(e);
  }, []);

  const handleUploadContactPageMainImage = useCallback(
    (e: IContactPageDTO) => {
      handleSetCurrentContactPage(e);
      setUploadContactPageMainImage(true);
    },
    [handleSetCurrentContactPage],
  );

  const closeUploadContactPageMainImage = useCallback(() => {
    setUploadContactPageMainImage(false);
  }, []);

  return (
    <Container>
      {uploadontactPageMainImage && (
        <UpdatePageImage closeWindow={closeUploadContactPageMainImage} />
      )}
      {contactPageWindow && (
        <ContactPage closeWindow={closeContactPageWindow} />
      )}
      {addContactPageWindow && (
        <AddContactPage
          handleUploadContactPageMainImage={(e: IContactPageDTO) =>
            handleUploadContactPageMainImage(e)
          }
          closeWindow={() => handleAddContactPageWindow(false)}
        />
      )}
      <span>
        <h1>Páginas de Contato</h1>
        <button type="button" onClick={() => handleAddContactPageWindow(true)}>
          <MdAdd size={28} />
        </button>
      </span>

      <ListContainer>
        {currentContactPages.map(page => {
          return (
            <PageSection
              onClick={() => handleContactPageWindow(page)}
              type="button"
              key={page.id}
            >
              <img src={page.main_image_url} alt={page.title} />
              <strong>{page.title}</strong>
            </PageSection>
          );
        })}
      </ListContainer>
    </Container>
  );
};

export default ContactPageDashboard;
