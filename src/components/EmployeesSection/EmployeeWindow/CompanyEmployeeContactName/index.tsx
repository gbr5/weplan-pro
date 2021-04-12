import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container } from './styles';

const CompanyEmployeeContactName: React.FC = () => {
  const [editField, setEditField] = useState(false);
  const { updateCompanyContactName, selectedContact } = useCompanyContact();
  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);
  const [contact, setContact] = useState(selectedContact);

  const handleSubmit = useCallback(
    async (e: string) => {
      const response = await updateCompanyContactName(e);
      setContact(response);
    },
    [updateCompanyContactName],
  );

  return (
    <Container>
      {contact &&
        contact.id &&
        (editField ? (
          <InlineFormField
            closeComponent={() => handleEditField(false)}
            defaultValue={contact.name}
            handleOnSubmit={(e: string) => handleSubmit(e)}
            placeholder={contact.name}
          />
        ) : (
          <>
            <button type="button" onClick={() => handleEditField(true)}>
              <MdEdit size={24} />
            </button>
            <p>{contact.name}</p>
          </>
        ))}
    </Container>
  );
};

export default CompanyEmployeeContactName;
