import React, { useCallback, useState } from 'react';
import { useContactPage } from '../../../hooks/contactPages';
import Button from '../../Button';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import IsActiveButton from '../../GeneralComponents/IsActiveButton';
import WindowContainer from '../../WindowContainer';
import CampaignSection from './CampaignSection';
import ContactPageInfoField from './ContactPageInfoField';
import SEOSection from './SEOSection';

import { Container } from './styles';

interface IProps {
  closeWindow: Function;
}

const ContactPageSettings: React.FC<IProps> = ({ closeWindow }) => {
  const {
    currentContactPage,
    updateContactPage,
    deleteContactPage,
  } = useContactPage();
  const [deletePageConfirmation, setDeletePageConfirmation] = useState(false);

  const handleIsContactPageActive = useCallback(() => {
    updateContactPage({
      ...currentContactPage,
      isActive: !currentContactPage.isActive,
    });
  }, [updateContactPage, currentContactPage]);

  const handleDeletePageConfirmation = useCallback((e: boolean) => {
    setDeletePageConfirmation(e);
  }, []);

  const handleDeletePage = useCallback(() => {
    deleteContactPage(currentContactPage.id);
    closeWindow();
    setDeletePageConfirmation(false);
  }, [closeWindow, deleteContactPage, currentContactPage]);

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 16,
        top: '2.5%',
        left: '2.5%',
        height: '95%',
        width: '95%',
      }}
    >
      {deletePageConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeletePageConfirmation(false)}
          message="Deseja realmente deletar esta página?"
          firstButtonLabel="Deletar"
          firstButtonFunction={handleDeletePage}
          secondButtonLabel="Não Deletar"
          secondButtonFunction={() => handleDeletePageConfirmation(false)}
          zIndex={17}
        />
      )}
      <Container>
        <aside>
          <h3>Configurações</h3>
          <h2>Página Externa</h2>
        </aside>

        <IsActiveButton
          isActiveLabel="Página Ativa"
          notActiveLabel="Ativar a Página"
          onClickFunction={() => handleIsContactPageActive()}
          isActive={currentContactPage.isActive}
        />
        <ContactPageInfoField
          contactPageInfoField="title"
          defaultContactPageInfoField={currentContactPage.title}
        />
        <ContactPageInfoField
          contactPageInfoField="slug"
          defaultContactPageInfoField={currentContactPage.slug}
        />
        <ContactPageInfoField
          contactPageInfoField="cta_label"
          defaultContactPageInfoField={currentContactPage.cta_label}
        />
        <ContactPageInfoField
          contactPageInfoField="cta_url"
          defaultContactPageInfoField={currentContactPage.cta_url}
        />

        <section>
          <h2>SEO</h2>
          <strong>Otimização da página para o Google</strong>
          <SEOSection />
        </section>
        <section>
          <h2>Campanha</h2>
          <strong>
            A campanha, é uma faixa com fundo vermelho que aparece por cima do
            cabeçalho.
          </strong>
          <CampaignSection />
        </section>
        <Button
          style={{
            background: 'red',
          }}
          type="button"
          onClick={() => handleDeletePageConfirmation(true)}
        >
          Deletar
        </Button>
      </Container>
    </WindowContainer>
  );
};

export default ContactPageSettings;
