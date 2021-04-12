import React, { useCallback, useEffect, useState } from 'react';
import { MdClose, MdDone } from 'react-icons/md';
import ICompanyContactDTO from '../../../../dtos/ICompanyContactDTO';
import IEmployeeDTO from '../../../../dtos/IEmployeeDTO';
import { useCompanyContact } from '../../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../../hooks/companyEmployee';
import EmployeeWindow from '../../EmployeeWindow';

import { Container } from './styles';

interface IProps {
  employee: IEmployeeDTO;
}

const EmployeeButton: React.FC<IProps> = ({ employee }) => {
  const iconsize = 20;
  const {
    selectCompanyEmployee,
    selectedCompanyEmployee,
  } = useCompanyEmployee();
  const { getEmployeeContact, selectContact } = useCompanyContact();
  const [employeeContact, setEmployeeContact] = useState(
    {} as ICompanyContactDTO,
  );
  const [name, setName] = useState(employee.employeeUser.name);
  const [familyName, setFamilyName] = useState('');
  const [employeeWindow, setEmployeeWindow] = useState(false);

  const handleGetEmployeeContact = useCallback(async () => {
    const findContact = await getEmployeeContact(employee.id);

    if (findContact) {
      setEmployeeContact(findContact);
    }
  }, [employee, getEmployeeContact]);

  const handleOpenWindow = useCallback(() => {
    if (employeeContact && employeeContact.id) {
      selectContact(employeeContact);
    }
    selectCompanyEmployee(employee);
    setEmployeeWindow(true);
  }, [selectCompanyEmployee, selectContact, employee, employeeContact]);

  const handleCloseEmployeeWindow = useCallback(() => {
    setEmployeeWindow(false);
    selectContact({} as ICompanyContactDTO);
    selectCompanyEmployee({} as IEmployeeDTO);
  }, [selectCompanyEmployee, selectContact]);

  useEffect(() => {
    handleGetEmployeeContact();
  }, [handleGetEmployeeContact]);

  useEffect(() => {
    if (employeeContact && employeeContact.id) {
      setName(employeeContact.name);
      setFamilyName(employeeContact.family_name);
    }
  }, [employeeContact]);

  return (
    <>
      {employeeWindow && selectedCompanyEmployee && (
        <EmployeeWindow closeWindow={handleCloseEmployeeWindow} />
      )}
      <Container
        isNotActive={!employee.isActive}
        type="button"
        onClick={() => handleOpenWindow()}
      >
        <strong>
          {name} {familyName}
        </strong>
        {employee.isActive ? (
          <MdDone color="green" size={iconsize} />
        ) : (
          <MdClose color="red" size={iconsize} />
        )}
      </Container>
    </>
  );
};

export default EmployeeButton;
