import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useManagementModule } from '../../../hooks/managementModules';
import { useSignUp } from '../../../hooks/signUp';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErros';
import Button from '../../Button';
import Input from '../../Input';
import { Container } from './styles';

interface IFormParams {
  password: string;
  password_confirmation: string;
}

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

const CollectEmployeePassword: React.FC<IProps> = ({
  nextStep,
  previousStep,
}) => {
  const { addToast } = useToast();
  const { createEmployeeModule } = useManagementModule();
  const formRef = useRef<FormHandles>(null);
  const { selectedUser, createUser } = useSignUp();
  const {
    createCompanyEmployee,
    employeePosition,
    employeeName,
    employeeAccessLevel,
    employeeFamilyName,
    employeeEmail,
  } = useCompanyEmployee();
  const {
    createCompanyContact,
    createCompanyEmployeeContactConection,
    companyContacts,
  } = useCompanyContact();

  const handleSubmit = useCallback(
    async (data: IFormParams) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'As senhas devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!selectedUser || (selectedUser && !selectedUser.id)) {
          const newUser = await createUser(data.password);
          createEmployeeModule({
            access_level: employeeAccessLevel,
            management_module: 'Comercial',
            user_id: newUser.id,
          });
          const newEmployee = await createCompanyEmployee({
            email: employeeEmail,
            password: data.password,
            position: employeePosition,
            user_id: newUser.id,
          });
          const findContact = companyContacts.find(contact => {
            const findByEmail = contact.contact_infos.find(
              info => info.info_type === 'Email' && info.info === employeeEmail,
            );
            if (findByEmail !== undefined) {
              return findByEmail;
            }
            return undefined;
          });

          if (findContact) {
            createCompanyEmployeeContactConection({
              contact_id: findContact.id,
              employee_id: newEmployee.id,
            });
          } else {
            const response = await createCompanyContact({
              company_contact_type: 'Customer',
              description: 'Colaborador',
              family_name: employeeFamilyName,
              isCompany: false,
              name: employeeName,
              weplanUser: false,
            });
            createCompanyEmployeeContactConection({
              contact_id: response.id,
              employee_id: newEmployee.id,
            });
          }
        }
        if (selectedUser && selectedUser.id) {
          createEmployeeModule({
            access_level: employeeAccessLevel,
            management_module: 'Comercial',
            user_id: selectedUser.id,
          });
          const newEmployee = await createCompanyEmployee({
            email: employeeEmail,
            password: data.password,
            position: employeePosition,
            user_id: selectedUser.id,
          });
          const findContact = companyContacts.find(contact => {
            const findByEmail = contact.contact_infos.find(
              info =>
                info.info_type === 'Email' && info.info === selectedUser.email,
            );
            if (findByEmail !== undefined) {
              return findByEmail;
            }
            return undefined;
          });

          if (findContact) {
            createCompanyEmployeeContactConection({
              contact_id: findContact.id,
              employee_id: newEmployee.id,
            });
          } else {
            const response = await createCompanyContact({
              company_contact_type: 'Customers',
              description: 'Colaborador',
              family_name: employeeFamilyName,
              isCompany: false,
              name: employeeName,
              weplanUser: false,
            });
            createCompanyEmployeeContactConection({
              contact_id: response.id,
              employee_id: newEmployee.id,
            });
          }
        }

        nextStep();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Tente novamente.',
        });
      }
    },
    [
      nextStep,
      createCompanyEmployeeContactConection,
      createUser,
      createCompanyEmployee,
      createEmployeeModule,
      companyContacts,
      employeeEmail,
      employeeName,
      employeeAccessLevel,
      employeeFamilyName,
      employeePosition,
      addToast,
      selectedUser,
      createCompanyContact,
    ],
  );
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <strong>Defina a senha da empresa</strong>
        <Input name="password" type="password" icon={FiLock} />
        <strong>Confirme a senha</strong>
        <Input
          name="password_confirmation"
          icon={FiLock}
          type="password"
          placeholder="Confirme a sua senha"
        />
        <section>
          <Button type="button" onClick={() => previousStep()}>
            Anterior
          </Button>
          <Button type="submit">Próximo</Button>
        </section>
      </Container>
    </Form>
  );
};

export default CollectEmployeePassword;
