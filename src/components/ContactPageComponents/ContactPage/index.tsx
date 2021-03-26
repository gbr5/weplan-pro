import React, { useCallback, useMemo, useState } from 'react';
import {
  MdClose,
  MdContacts,
  MdGridOn,
  MdNotificationsActive,
} from 'react-icons/md';
import { useContactPage } from '../../../hooks/contactPages';
import WindowFormContainer from '../../FormComponents/WindowFormContainer';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import ContactPageSettings from '../ContactPageSettings/index';
import CTASection from '../CTASection';
import ImageGridSection from '../ImageGridSection';
import UpdatePageImage from '../UpdatePageImage';

import {
  Container,
  ContactPageHeader,
  PageMenu,
  ActiveCampaign,
} from './styles';

interface IProps {
  closeWindow: Function;
}

const ContactPage: React.FC<IProps> = ({ closeWindow }) => {
  const [editHeader, setEditHeader] = useState(false);
  const [ctaSection, setCTASection] = useState(true);
  const [editContactPageSettings, setEditContactPageSettings] = useState(false);
  const [editContactPageImage, setEditContactPageImage] = useState(false);
  const [activeCampaignBanner, setActiveCampaignBanner] = useState(false);
  const [imageGridSection, setImageGridSection] = useState(false);
  const iconSize = 24;
  const { currentContactPage } = useContactPage();

  const closeAllSection = useCallback(() => {
    setImageGridSection(false);
    setCTASection(false);
  }, []);

  const handleCTASection = useCallback(() => {
    closeAllSection();
    setCTASection(true);
  }, [closeAllSection]);

  const handleOpenImageGridSection = useCallback(() => {
    closeAllSection();
    setImageGridSection(true);
  }, [closeAllSection]);

  const handleEditHeader = useCallback((e: boolean) => {
    setEditHeader(e);
  }, []);

  const handleEditContactPageSettings = useCallback(
    (e: boolean) => {
      setEditContactPageSettings(e);
      e === false && closeWindow();
    },
    [closeWindow],
  );

  const handleEditContactPageImage = useCallback(
    (e: boolean) => {
      setEditContactPageImage(e);
      e === false && handleEditHeader(false);
    },
    [handleEditHeader],
  );

  const handleActiveCampaign = useCallback((e: boolean) => {
    setActiveCampaignBanner(e);
  }, []);

  const activeCampaign = useMemo(() => {
    const findActive = currentContactPage.campaigns.find(
      campaign => campaign.isActive,
    );
    if (findActive) {
      setActiveCampaignBanner(true);
      return findActive;
    }
    return undefined;
  }, [currentContactPage]);

  return (
    <WindowFormContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
      }}
    >
      {editHeader && (
        <ConfirmationWindow
          closeWindow={() => handleEditHeader(false)}
          message="O que deseja?"
          firstButtonLabel="Ir para Configurações"
          firstButtonFunction={() => handleEditContactPageSettings(true)}
          secondButtonLabel="Editar Imagem"
          secondButtonFunction={() => handleEditContactPageImage(true)}
          zIndex={16}
        />
      )}
      {editContactPageImage && (
        <UpdatePageImage
          closeWindow={() => handleEditContactPageImage(false)}
        />
      )}
      {editContactPageSettings && (
        <ContactPageSettings
          closeWindow={() => handleEditContactPageSettings(false)}
        />
      )}
      <Container>
        {activeCampaign && activeCampaignBanner && (
          <ActiveCampaign
            backgroundColor={activeCampaign.background_color}
            ctaBackgroundColor={activeCampaign.cta_background_color}
            ctaTextColor={activeCampaign.text_color}
            textColor={activeCampaign.cta_text_color}
          >
            <h2>{activeCampaign.message}</h2>
            <a href={activeCampaign.url}>{activeCampaign.cta_label}</a>
            <span>
              <button type="button" onClick={() => handleActiveCampaign(false)}>
                <MdClose size={24} />
              </button>
            </span>
          </ActiveCampaign>
        )}
        <ContactPageHeader onClick={() => handleEditHeader(true)} type="button">
          <span>
            <img
              src={currentContactPage.main_image_url}
              alt={currentContactPage.title}
            />
            <p>{currentContactPage.cta_label}</p>
          </span>
          <h2>{currentContactPage.title}</h2>
        </ContactPageHeader>
        <PageMenu>
          <button onClick={handleOpenImageGridSection} type="button">
            <MdGridOn size={iconSize} />
          </button>
          <button onClick={handleCTASection} type="button">
            <MdNotificationsActive size={iconSize} />
          </button>
          <button type="button">
            <MdContacts size={iconSize} />
          </button>
        </PageMenu>

        {imageGridSection && <ImageGridSection />}
        {ctaSection && <CTASection />}
      </Container>
    </WindowFormContainer>
  );
};

export default ContactPage;
