import React, { useCallback, useEffect, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../../hooks/companyEmployee';
import ContactTypeComponent from '../../ContactTypeComponent';

import { Container, FieldContainer } from './styles';

const CompanyContactTypeField: React.FC = () => {
  const iconSize = 24;
  const {
    updateCompanyContactType,
    contactTypes,
    selectedContact,
    contactEmployee,
  } = useCompanyContact();
  const { master } = useCompanyEmployee();
  const [editContactField, setEditContactField] = useState(false);
  const [defaultType, setDefaultType] = useState(contactTypes[0]);
  const [contact, setContact] = useState(selectedContact);

  useEffect(() => {
    const response = contactTypes.find(
      field => field.value === contact.company_contact_type,
    );
    response && setDefaultType(response);
  }, [contactTypes, contact]);

  const handleSubmit = useCallback(
    async (data: string) => {
      const response = await updateCompanyContactType(data);
      setContact(response);
      setEditContactField(false);
    },
    [updateCompanyContactType],
  );

  const handleEditField = useCallback((e: boolean) => {
    setEditContactField(e);
  }, []);
  return (
    <Container>
      {!contactEmployee ? (
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
      ) : (
        master &&
        master.id && (
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
        )
      )}
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
