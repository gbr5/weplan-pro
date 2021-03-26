import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IEmailInputSubmitDTO from '../../../dtos/IEmailInputSubmitDTO';
import IFormEmailNotificationDTO from '../../../dtos/IFormEmailNotificationDTO';
import { useForm } from '../../../hooks/form';
import EmailInput from '../../GeneralComponents/EmailInput';
import WindowContainer from '../../WindowContainer';
import EmailInputButton from './EmailInputButton';
import LandingPageContainer from './LandingPageContainer';
import ResponseEmailContainer from './ResponseEmailContainer';

import { Container, AddField, ButtonContainer, BooleanButton } from './styles';
import SuccessMessageContainer from './SuccessMessageContainer';

interface IProps {
  closeWindow: Function;
}

const FormSettings: React.FC<IProps> = ({ closeWindow }) => {
  const {
    currentForm,
    updateForm,
    createEmailNotificationRecipient,
  } = useForm();
  const [addEmail, setAddEmail] = useState(false);

  const [landingPage, setLandingPage] = useState(false);
  const [internalEmailNotification, setInternalEmailNotification] = useState(
    {} as IFormEmailNotificationDTO,
  );

  const handleIsFormActive = useCallback(() => {
    updateForm({
      ...currentForm,
      isActive: !currentForm.isActive,
    });
  }, [updateForm, currentForm]);

  useEffect(() => {
    if (
      currentForm &&
      currentForm.emailNotifications &&
      currentForm.emailNotifications.length > 0
    ) {
      const internal = currentForm.emailNotifications.find(
        email => email.notification_type === 'internal_message',
      );
      internal && setInternalEmailNotification(internal);
    }
  }, [currentForm]);

  useEffect(() => {
    if (
      currentForm &&
      currentForm.landingPage &&
      currentForm.landingPage.isActive
    ) {
      setLandingPage(true);
    }
  }, [currentForm]);

  const handleAddEmail = useCallback(
    (e: IEmailInputSubmitDTO) => {
      if (internalEmailNotification && internalEmailNotification.id) {
        createEmailNotificationRecipient({
          email_notification_id: internalEmailNotification.id,
          sending_type: e.sending_type,
          email: e.email,
        });
      }
    },
    [internalEmailNotification, createEmailNotificationRecipient],
  );

  const handleAddEmailField = useCallback((e: boolean) => {
    setAddEmail(e);
  }, []);

  const handleIsLandingPageActive = useCallback((e: boolean) => {
    setLandingPage(e);
  }, []);

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 21,
        top: '0%',
        left: '0%',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <aside>
          <h3>Configurações</h3>
          <h2>{currentForm && currentForm.name}</h2>
        </aside>

        <section>
          <BooleanButton
            onClick={handleIsFormActive}
            isActive={currentForm.isActive}
          >
            {currentForm.isActive ? 'Formulário Ativo' : 'Ativar Formulário'}
          </BooleanButton>
          <h2>E-mail de notificação interna</h2>
          {internalEmailNotification &&
            internalEmailNotification.recipients &&
            internalEmailNotification.recipients.length > 0 &&
            internalEmailNotification.recipients.map(recipient => {
              return (
                <EmailInputButton key={recipient.id} recipient={recipient} />
              );
            })}
          {addEmail && (
            <EmailInput
              closeComponent={() => handleAddEmailField(false)}
              handleSubmit={(e: IEmailInputSubmitDTO) => handleAddEmail(e)}
            />
          )}
          <AddField type="button" onClick={() => handleAddEmailField(true)}>
            <MdAdd size={32} />
          </AddField>
        </section>

        <section>
          <h2>Após Preenchimento</h2>
          <strong>Quando o formulário for enviado</strong>
          <strong>o usuário será encaminhado para:</strong>
          <ButtonContainer>
            <BooleanButton
              onClick={() => handleIsLandingPageActive(true)}
              type="button"
              isActive={landingPage}
            >
              Landing Page
            </BooleanButton>
            <BooleanButton
              onClick={() => handleIsLandingPageActive(false)}
              type="button"
              isActive={!landingPage}
            >
              Mensagem de Sucesso
            </BooleanButton>
          </ButtonContainer>
          {landingPage ? <LandingPageContainer /> : <SuccessMessageContainer />}
        </section>
        <section>
          <ResponseEmailContainer />
        </section>
      </Container>
    </WindowContainer>
  );
};

export default FormSettings;
