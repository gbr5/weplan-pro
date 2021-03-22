import React, { useCallback, useEffect, useState } from 'react';
import IFormEmailNotificationDTO from '../../../../dtos/IFormEmailNotificationDTO';
import ITitleMessageDTO from '../../../../dtos/ITitleMessageDTO';
import { useForm } from '../../../../hooks/form';
import Button from '../../../Button';
import ConfirmationWindow from '../../../GeneralComponents/ConfirmationWindow';
import TitleMessageForm from '../TitleMessageForm';

import { Container } from './styles';

const ResponseEmailContainer: React.FC = () => {
  const [emailResponse, setEmailResponse] = useState(true);
  const {
    currentForm,
    createFormEmailNotification,
    updateFormEmailNotification,
    deleteFormEmailNotification,
  } = useForm();
  const [
    deleteResponseEmailConfirmation,
    setDeleteResponseEmailConfirmation,
  ] = useState(false);
  const [responseEmailNotification, setExternalEmailNotification] = useState(
    {} as IFormEmailNotificationDTO,
  );

  useEffect(() => {
    if (
      currentForm &&
      currentForm.emailNotifications &&
      currentForm.emailNotifications.length > 0
    ) {
      const external = currentForm.emailNotifications.find(
        email => email.notification_type === 'external_message',
      );
      external && setExternalEmailNotification(external);
      external && setEmailResponse(true);
    }
  }, [currentForm]);

  const handleDeleteResponseEmailNotification = useCallback(
    (data: IFormEmailNotificationDTO) => {
      if (responseEmailNotification && responseEmailNotification.id) {
        deleteFormEmailNotification(data);
      }
      setEmailResponse(false);
    },
    [deleteFormEmailNotification, responseEmailNotification],
  );

  const handleResponseEmailNotification = useCallback(
    (e: ITitleMessageDTO) => {
      if (responseEmailNotification && responseEmailNotification.id) {
        updateFormEmailNotification({
          id: responseEmailNotification.id,
          form_id: responseEmailNotification.form_id,
          notification_type: responseEmailNotification.notification_type,
          subject: e.title,
          message: e.message,
        });
      } else {
        createFormEmailNotification({
          form_id: currentForm.id,
          notification_type: 'external_message',
          subject: e.title,
          message: e.message,
        });
      }
    },
    [
      updateFormEmailNotification,
      currentForm,
      createFormEmailNotification,
      responseEmailNotification,
    ],
  );

  const handleAddResponseEmail = useCallback((e: boolean) => {
    setEmailResponse(e);
  }, []);

  const handleDeleteResponseEmailConfirmation = useCallback((e: boolean) => {
    setDeleteResponseEmailConfirmation(e);
  }, []);

  return (
    <Container>
      {deleteResponseEmailConfirmation && (
        <ConfirmationWindow
          closeWindow={() => handleDeleteResponseEmailConfirmation(false)}
          firstButtonFunction={handleDeleteResponseEmailNotification}
          firstButtonLabel="Deletar"
          message="Deseja realmente deletar o e-mail resposta?"
          secondButtonFunction={() =>
            handleDeleteResponseEmailConfirmation(false)
          }
          secondButtonLabel="Não deletar"
          zIndex={22}
        />
      )}

      <h2>E-mail Resposta</h2>
      <p>Confirmação para quem respondeu ao formulário.</p>
      {emailResponse && responseEmailNotification ? (
        <Button
          type="button"
          onClick={() =>
            handleDeleteResponseEmailNotification(responseEmailNotification)
          }
        >
          Desativar e-mail resposta
        </Button>
      ) : (
        <Button type="button" onClick={() => handleAddResponseEmail(true)}>
          Criar e-mail Resposta
        </Button>
      )}
      {emailResponse && responseEmailNotification && (
        <TitleMessageForm
          handleSubmit={(e: ITitleMessageDTO) =>
            handleResponseEmailNotification(e)
          }
          messageLabel="Mensagem"
          titleLabel="Assunto"
          defaultTitleMessage={{
            title:
              (responseEmailNotification &&
                responseEmailNotification.subject) ||
              '',
            message:
              (responseEmailNotification &&
                responseEmailNotification.message) ||
              '',
          }}
        />
      )}
    </Container>
  );
};

export default ResponseEmailContainer;
