import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IContactPageDTO from '../../dtos/IContactPageDTO';
import api from '../../services/api';

import { Container, ListContainer, PageSection } from './styles';

const ContactPageDashboard: React.FC = () => {
  const [contactPages, setContactPages] = useState<IContactPageDTO[]>([]);

  const handleGetContactPages = useCallback(() => {
    try {
      api.get<IContactPageDTO[]>('/user-contact-page').then(response => {
        setContactPages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    handleGetContactPages();
  }, [handleGetContactPages]);

  return (
    <Container>
      <span>
        <h1>Páginas de Contato</h1>
        <button type="button">
          <MdAdd size={28} />
        </button>
      </span>

      <ListContainer>
        {contactPages.map(page => {
          return (
            <PageSection key={page.id}>
              <button type="button">
                <img src={page.image_url} alt={page.title} />
              </button>
            </PageSection>
          );
        })}
      </ListContainer>
    </Container>
  );
};

export default ContactPageDashboard;
