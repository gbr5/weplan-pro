import React, { useCallback, useEffect, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import ContactTypeComponent from '../../ContactTypeComponent';

import { Container, FieldContainer } from './styles';

const CompanyContactTypeField: React.FC = () => {
  const iconSize = 24;
  const {
    updateCompanyContactType,
    contactTypes,
    selectedContact,
  } = useCompanyContact();
  const [editContactField, setEditContactField] = useState(false);
  const [defaultType, setDefaultType] = useState(contactTypes[0]);

  useEffect(() => {
    const response = contactTypes.find(
      field => field.value === selectedContact.company_contact_type,
    );
    response && setDefaultType(response);
  }, [contactTypes, selectedContact]);

  const handleSubmit = useCallback(
    (data: string) => {
      updateCompanyContactType(selectedContact.id, data);
      setEditContactField(false);
    },
    [updateCompanyContactType, selectedContact],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);
  return (
    <Container>
      <span>
        <button
          type="button"
          onClick={() => handleEditField(!editContactField)}
        >
          {editContactField ? (
            <MdClose size={iconSize} />
          ) : (
            <MdEdit size={iconSize} />
          )}
        </button>
      </span>
      {editContactField ? (
        <ContactTypeComponent
          contactDefaultType={defaultType.value}
          handleSubmit={(e: string) => handleSubmit(e)}
        />
      ) : (
        <FieldContainer>
          <strong>Categoria</strong>
          <p>{defaultType.label}</p>
        </FieldContainer>
      )}
    </Container>
  );
};

export default CompanyContactTypeField;
