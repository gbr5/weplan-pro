import React, { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import InlineFormField from '../../../GeneralComponents/InlineFormField';

import { Container, FieldContainer } from './styles';

const CompanyEmployeeContactFamilyName: React.FC = () => {
  const [editField, setEditField] = useState(false);
  const {
    updateCompanyContactFamilyName,
    selectedContact,
  } = useCompanyContact();
  const handleEditField = useCallback((e: boolean) => {
    setEditField(e);
  }, []);
  const [contact, setContact] = useState(selectedContact);

  const handleSubmit = useCallback(
    async (e: string) => {
      const response = await updateCompanyContactFamilyName(e);
      setContact(response);
    },
    [updateCompanyContactFamilyName],
  );

  return (
    <Container>
      {contact &&
        contact.id &&
        (editField ? (
          <InlineFormField
            closeComponent={() => handleEditField(false)}
            defaultValue={contact.family_name}
            handleOnSubmit={(e: string) => handleSubmit(e)}
            placeholder={contact.family_name}
          />
        ) : (
          <FieldContainer>
            <button type="button" onClick={() => handleEditField(true)}>
              <MdEdit size={20} />
            </button>
            <p>{contact.family_name}</p>
          </FieldContainer>
        ))}
    </Container>
  );
};

export default CompanyEmployeeContactFamilyName;
