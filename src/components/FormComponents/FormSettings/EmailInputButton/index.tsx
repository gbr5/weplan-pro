import React, { useCallback, useState } from 'react';
import IEmailInputSubmitDTO from '../../../../dtos/IEmailInputSubmitDTO';
import IFormEmailNotificationRecipientDTO from '../../../../dtos/IFormEmailNotificationRecipientDTO';
import { useForm } from '../../../../hooks/form';
import EmailInput from '../../../GeneralComponents/EmailInput';

import { Container } from './styles';

interface IProps {
  recipient: IFormEmailNotificationRecipientDTO;
}

const EmailInputButton: React.FC<IProps> = ({ recipient }) => {
  const { updateFormEmailNotificationRecipient } = useForm();
  const [editRecipient, setEditRecipient] = useState(false);
  const handleEditRecipientField = useCallback((e: boolean) => {
    setEditRecipient(e);
  }, []);
  const handleEditRecipient = useCallback(
    (e: IEmailInputSubmitDTO) => {
      updateFormEmailNotificationRecipient({
        id: recipient.id,
        email_notification_id: recipient.email_notification_id,
        sending_type: e.sending_type,
        email: e.email,
      });
      handleEditRecipientField(false);
    },
    [updateFormEmailNotificationRecipient, handleEditRecipientField, recipient],
  );
  return (
    <Container>
      {editRecipient ? (
        <EmailInput
          closeComponent={() => handleEditRecipientField(false)}
          handleSubmit={(e: IEmailInputSubmitDTO) => handleEditRecipient(e)}
        />
      ) : (
        <button type="button" onClick={() => handleEditRecipientField(true)}>
          {recipient.sending_type} | {recipient.email}
        </button>
      )}
    </Container>
  );
};

export default EmailInputButton;
