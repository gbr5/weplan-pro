import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';

import 'react-day-picker/lib/style.css';
import DayPicker from 'react-day-picker';

import {
  FiChevronRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCheckSquare,
  FiUserPlus,
  FiEdit,
  FiUser,
  FiSquare,
} from 'react-icons/fi';
import { MdClose, MdPersonAdd, MdAdd } from 'react-icons/md';
import { differenceInCalendarDays } from 'date-fns/esm';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  EventPageContent,
  SubHeader,
  FirstRow,
  LatestNews,
  Payments,
  MyEvents,
  MyEventsDrawer,
  MyEventsDrawerButton,
  SupplierSection,
  SelectedSuppliers,
  HiredSuppliers,
  Supplier,
  AddSupplierDrawer,
  GuestSection,
  AddGuestDrawer,
  Financial,
  SideBar,
  Main,
  CheckList,
  Appointments,
  NextAppointment,
  MyAppointments,
  Appointment,
  BudgetDrawer,
  EventInfoDrawer,
  BudgetCloseButton,
  AddAppointmentDrawer,
  EditEventNameDrawer,
  EditEventNameCloseButton,
  MessagesSection,
  UsersChat,
  UserChat,
  ChatMessages,
  Messages,
  AddCheckListDrawer,
  WeplanGuestDrawer,
  GuestConfirmedDrawer,
  WeplanSupplierAppointmentDrawer,
  AppointmentTypeDrawer,
  Calendar,
  CheckedListItemDrawer,
  IsHiredDrawer,
  AddPlannerDrawer,
  AddOwnerDrawer,
  AddMemberDrawer,
  MembersWindow,
  Guest,
  GuestNavigationButton,
} from './styles';

import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';
import UserProfile from '../../components/UserProfile';

import chart from '../../assets/charts.png';
import avatar_placeholder from '../../assets/avatar_placeholder_cat2.jpeg';

import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';

interface IMonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface IEvent {
  id: string;
  name: string;
  date: string;
  daysTillDate: number;
}

interface IEventCheckList {
  id: string;
  checked: boolean;
}

interface IEventGuest {
  id: string;
  confirmed: boolean;
  host: string;
  first_name: string;
  last_name: string;
  weplanUser: boolean;
}

interface ICreateGuest {
  first_name: string;
  last_name: string;
  description: string;
  confirmed: boolean;
  weplanUser: boolean;
}

interface ICreateCheckListItem {
  name: string;
  priority_level: number;
  checked: boolean;
}

interface ICreateAppointment {
  subject: string;
  duration_minutes: number;
  address: string;
  start_hour: number;
  start_minute: number;
}

interface ICreateSupplier {
  supplier_id: string;
  supplier_sub_category: number;
}

interface IEditEventInfo {
  date: Date;
  number_of_guests: number;
  duration: number;
  budget: number;
  description: boolean;
  country: string;
  local_state: string;
  city: string;
  address: string;
}

interface ICreateEventPlanner {
  planner_id: string;
}

interface ICreateEventOwner {
  owner_id: string;
  description: string;
}

interface ICreateEventMember {
  member_id: string;
}

interface IEventParams {
  params: {
    id: string;
    name: string;
    date: string;
    daysTillDate: number;
  };
}

interface EventDTO {
  id: string;
  name: string;
  date: Date;
  event_type: string;
}

interface IEventPlanners {
  id: string;
  name: string;
  avatar: string;
  trimmed_name: string;
}

interface IEventOwners {
  id: string;
  name: string;
  avatar: string;
  trimmed_name: string;
  description: string;
}

interface IEventMembers {
  id: string;
  name: string;
  avatar: string;
  trimmed_name: string;
}

const EventHostDashboard: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation<IEventParams>();
  const { user } = useAuth();

  const pageEvent = location.state.params;

  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [myEventsDrawer, setMyEventsDrawer] = useState(false);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [eventDTO, setEventDTO] = useState<EventDTO>({} as EventDTO);

  const [checkListItems, setCheckListItems] = useState<IEventCheckList[]>([]);
  const [resolvedCheckListItems, setResolvedCheckListItems] = useState<
    IEventCheckList[]
  >([]);
  const [eventGuests, setEventGuests] = useState<IEventGuest[]>([]);
  const [confirmedGuests, setConfirmedGuests] = useState<IEventGuest[]>([]);
  const [myGuests, setMyGuests] = useState<IEventGuest[]>([]);

  const [planners, setPlanners] = useState<IEventPlanners[]>([]);
  const [owners, setOwners] = useState<IEventOwners[]>([]);
  const [members, setMembers] = useState<IEventMembers[]>([]);

  const [membersWindow, setMembersWindow] = useState(false);
  const [guestWindow, setGuestWindow] = useState(true);
  // const [myGuestWindow, setMyGuestWindow] = useState(false);

  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [budgetDrawer, setBudgetDrawer] = useState(false);
  const [addGuestDrawer, setAddGuestDrawer] = useState(false);
  const [addSupplierDrawer, setAddSupplierDrawer] = useState(false);
  const [addAppointmentDrawer, setAddAppointmentDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [addCheckListDrawer, setAddCheckListDrawer] = useState(false);

  const [latestActionsSection, setLatestActionsSection] = useState(true);
  const [guestsSection, setGuestsSection] = useState(false);
  const [appointmentsSection, setAppointmentsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [checkListSection, setCheckListSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);
  const [messagesSection, setMessagesSection] = useState(false);

  const [userProfileWindow, setUserProfileWindow] = useState(false);

  const [weplanGuestDrawer, setWeplanGuestDrawer] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [weplanGuestUser, setWeplanGuestUser] = useState('');

  const [guestConfirmedDrawer, setGuestConfirmedDrawer] = useState(false);
  const [guestConfirmedMessage, setGuestConfirmedMessage] = useState('');
  const [guestConfirmed, setGuestConfirmed] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [
    weplanSupplierAppointmentDrawer,
    setWeplanSupplierAppointmentDrawer,
  ] = useState(false);
  const [
    weplanSupplierAppointmentUser,
    setWeplanSupplierAppointmentUser,
  ] = useState(false);
  const [
    weplanSupplierAppointmentMessage,
    setWeplanSupplierAppointmentMessage,
  ] = useState('');
  const [appointmentTypeDrawer, setAppointmentTypeDrawer] = useState(false);
  const [appointmentType, setAppointmentType] = useState('');

  const [checkedListItemDrawer, setCheckedListItemDrawer] = useState(false);
  const [CheckedListItemMessage, setCheckedListItemMessage] = useState('');
  const [checked, setChecked] = useState(false);

  const [isHiredDrawer, setIsHiredDrawer] = useState(false);
  const [isHiredMessage, setIsHiredMessage] = useState('');
  const [isHired, setIsHired] = useState(false);

  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberDrawer, setAddMemberDrawer] = useState(false);

  const closeAllWindows = useCallback(() => {
    setMyEventsDrawer(false);
    setCheckedListItemDrawer(false);
    setAddCheckListDrawer(false);
    setIsHiredDrawer(false);
    setEventInfoDrawer(false);
    setBudgetDrawer(false);
    setAddGuestDrawer(false);
    setAddMemberDrawer(false);
    setAddOwnerDrawer(false);
    setAddSupplierDrawer(false);
    setAddAppointmentDrawer(false);
    setEditEventNameDrawer(false);
    setWeplanSupplierAppointmentDrawer(false);
    setWeplanGuestDrawer(false);
    setGuestConfirmedDrawer(false);
    setAppointmentTypeDrawer(false);
    setCheckedListItemDrawer(false);
    setAddPlannerDrawer(false);
  }, []);

  const closeAllSections = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setAppointmentsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
  }, []);

  const handleMyEventsDrawer = useCallback(() => {
    closeAllWindows();
    setMyEventsDrawer(!myEventsDrawer);
  }, [myEventsDrawer, closeAllWindows]);

  const handleEventInfoDrawer = useCallback(() => {
    closeAllWindows();
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer, closeAllWindows]);

  const handleMembersWindow = useCallback(() => {
    closeAllWindows();
    setMembersWindow(!membersWindow);
  }, [membersWindow, closeAllWindows]);

  const handleGuestWindow = useCallback(props => {
    setGuestWindow(props);
  }, []);

  const handleBudgetDrawer = useCallback(() => {
    closeAllWindows();
    setBudgetDrawer(!budgetDrawer);
  }, [budgetDrawer, closeAllWindows]);

  const handleAddGuestDrawer = useCallback(() => {
    closeAllWindows();
    setAddGuestDrawer(!addGuestDrawer);
  }, [addGuestDrawer, closeAllWindows]);

  const handleWeplanGuestDrawer = useCallback(() => {
    setWeplanGuestDrawer(!weplanGuestDrawer);
  }, [weplanGuestDrawer]);

  const handleGuestConfirmedDrawer = useCallback(() => {
    setGuestConfirmedDrawer(!guestConfirmedDrawer);
  }, [guestConfirmedDrawer]);

  const handleAddSupplierDrawer = useCallback(() => {
    closeAllWindows();
    setAddSupplierDrawer(!addSupplierDrawer);
  }, [addSupplierDrawer, closeAllWindows]);

  const handleIsHiredDrawer = useCallback(() => {
    setIsHiredDrawer(!isHiredDrawer);
  }, [isHiredDrawer]);

  const handleAddAppointmentDrawer = useCallback(() => {
    closeAllWindows();
    setAddAppointmentDrawer(!addAppointmentDrawer);
  }, [addAppointmentDrawer, closeAllWindows]);

  const handleWeplanSupplierAppointmentDrawer = useCallback(() => {
    setWeplanSupplierAppointmentDrawer(!weplanSupplierAppointmentDrawer);
  }, [weplanSupplierAppointmentDrawer]);

  const handleAppointmentTypeDrawer = useCallback(() => {
    setAppointmentTypeDrawer(!appointmentTypeDrawer);
  }, [appointmentTypeDrawer]);

  const handleEditEventNameDrawer = useCallback(() => {
    closeAllWindows();
    setEditEventNameDrawer(!editEventNameDrawer);
  }, [editEventNameDrawer, closeAllWindows]);

  const handleCheckedListItemDrawer = useCallback(() => {
    setCheckedListItemDrawer(!checkedListItemDrawer);
  }, [checkedListItemDrawer]);

  const handleAddCheckListDrawer = useCallback(() => {
    closeAllWindows();
    setAddCheckListDrawer(!addCheckListDrawer);
  }, [addCheckListDrawer, closeAllWindows]);

  const handleAddMemberDrawer = useCallback(() => {
    closeAllWindows();
    setAddMemberDrawer(!addMemberDrawer);
  }, [addMemberDrawer, closeAllWindows]);

  const handleAddOwnerDrawer = useCallback(() => {
    closeAllWindows();
    setAddOwnerDrawer(!addOwnerDrawer);
  }, [addOwnerDrawer, closeAllWindows]);

  const handleAddPlannerDrawer = useCallback(() => {
    closeAllWindows();
    setAddPlannerDrawer(!addPlannerDrawer);
  }, [addPlannerDrawer, closeAllWindows]);

  const handleEditEventInfo = useCallback(
    async (data: IEditEventInfo) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          date: Yup.date().required(),
          number_of_guests: Yup.string().required('Nome é obrigatório'),
          duration: Yup.number().required('Sobrenome é obrigatório'),
          budget: Yup.number(),
          description: Yup.string(),
          country: Yup.string(),
          local_state: Yup.string(),
          city: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${pageEvent.id}/event-infos`, {
          number_of_guests: data.number_of_guests,
          duration: data.duration,
          budget: data.budget,
          description: data.description,
          country: data.country,
          local_state: data.local_state,
          city: data.city,
        });

        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });

        handleEventInfoDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleEventInfoDrawer],
  );

  const handleWeplanGuestQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanGuestUser('É usuário WePlan S2!');
        setWeplanUser(true);
      } else {
        setWeplanGuestUser('AINDA não é usuário WePlan!');
        setWeplanUser(false);
      }
      return handleWeplanGuestDrawer();
    },
    [handleWeplanGuestDrawer],
  );

  const handleGuestConfirmedQuestion = useCallback(
    (guest_confirmed: boolean) => {
      if (guest_confirmed === true) {
        setGuestConfirmedMessage('Convidado confirmado!');
        setGuestConfirmed(true);
      } else {
        setGuestConfirmedMessage('');
        setGuestConfirmed(false);
      }
      return handleGuestConfirmedDrawer();
    },
    [handleGuestConfirmedDrawer],
  );

  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Primeiro nome é obrigatório'),
          last_name: Yup.string().required('Sobrenome é obrigatório'),
          description: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/guests`, {
          first_name: data.first_name,
          last_name: data.last_name,
          description: data.description,
          weplanUser,
          confirmed: guestConfirmed,
        });

        addToast({
          type: 'success',
          title: 'Evento Criado com Sucesso',
          description: 'Você já pode começar a planejar o seu evento.',
        });

        handleAddGuestDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar evento',
          description: 'Erro  ao criar o evento, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddGuestDrawer, weplanUser, guestConfirmed],
  );

  const handleIsHiredQuestion = useCallback(
    (is_hired: boolean) => {
      if (is_hired === true) {
        setIsHiredMessage('Contratado S2!');
        setIsHired(true);
      } else {
        setIsHiredMessage('Avaliando ...');
        setIsHired(false);
      }
      return handleWeplanGuestDrawer();
    },
    [handleWeplanGuestDrawer],
  );

  const handleWeplanSupplierAppointmentQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanSupplierAppointmentMessage('É usuário WePlan S2!');
        setWeplanSupplierAppointmentUser(true);
      } else {
        setWeplanSupplierAppointmentMessage('AINDA não é usuário WePlan!');
        setWeplanSupplierAppointmentUser(false);
      }
      return handleWeplanGuestDrawer();
    },
    [handleWeplanGuestDrawer],
  );

  const handleAppointmentTypeQuestion = useCallback(
    (appointment_type: string) => {
      if (appointment_type === 'Comercial') {
        setAppointmentType('Comercial');
      } else {
        setAppointmentType('Técnico');
      }
      return handleGuestConfirmedDrawer();
    },
    [handleGuestConfirmedDrawer],
  );

  const handleAddAppointment = useCallback(
    async (data: ICreateAppointment) => {
      try {
        formRef.current?.setErrors([]);
        const date = new Date(selectedDate);

        date.setHours(Number(data.start_hour));
        date.setMinutes(Number(data.start_minute));

        const schema = Yup.object().shape({
          subject: Yup.string().required('Assunto é obrigatório'),
          duration_minutes: Yup.number(),
          address: Yup.string(),
          start_hour: Yup.number().required(),
          start_minute: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`/appointments`, {
          subject: data.subject,
          date,
          duration_minutes: Number(data.duration_minutes),
          address: data.address,
          weplanGuest: weplanSupplierAppointmentUser,
          appointment_type: appointmentType,
        });

        addToast({
          type: 'success',
          title: 'Agendamento Criado com Sucesso',
          description:
            'Você já pode visualizar no seu dashboard de agendamentos.',
        });

        handleAddAppointmentDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar agendamento',
          description: 'Erro  ao criar o agendamento, tente novamente.',
        });
      }
    },
    [
      addToast,
      handleAddAppointmentDrawer,
      weplanSupplierAppointmentUser,
      appointmentType,
      selectedDate,
    ],
  );

  const handleUserProfileWindow = useCallback(() => {
    setUserProfileWindow(!userProfileWindow);
  }, [userProfileWindow]);

  const handleCheckListChecked = useCallback(
    (item_checked: boolean) => {
      if (item_checked === true) {
        setCheckedListItemMessage('Feito! =D');
        setChecked(true);
      } else {
        setCheckedListItemMessage('Em progresso! No Worries ;D');
        setChecked(false);
      }
      return handleCheckedListItemDrawer();
    },
    [handleCheckedListItemDrawer],
  );

  const handleLatestActionsSection = useCallback(() => {
    closeAllSections();
    setLatestActionsSection(true);
  }, [closeAllSections]);

  const handleGuestsSection = useCallback(() => {
    closeAllSections();
    setGuestsSection(true);
  }, [closeAllSections]);

  const handleAppointmentsSection = useCallback(() => {
    closeAllSections();
    setAppointmentsSection(true);
  }, [closeAllSections]);

  const handleFinanceSection = useCallback(() => {
    closeAllSections();
    setFinanceSection(true);
  }, [closeAllSections]);

  const handleCheckListSection = useCallback(() => {
    closeAllSections();
    setCheckListSection(true);
  }, [closeAllSections]);

  const handleSupplierSection = useCallback(() => {
    closeAllSections();
    setSupplierSection(true);
  }, [closeAllSections]);

  const handleMessagesSection = useCallback(() => {
    closeAllSections();
    setMessagesSection(true);
  }, [closeAllSections]);

  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          supplier_id: Yup.string(),
          supplier_sub_category: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/suppliers`, {
          supplier_id: data.supplier_id,
          supplier_sub_category: data.supplier_sub_category,
          isHired,
        });

        addToast({
          type: 'success',
          title: 'Fornecedor selecionado com Sucesso',
          description: 'Você já pode visualizar no dashboard do seu evento.',
        });

        handleAddSupplierDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao selecionar fornecedor',
          description: 'Erro selecionar fornecedor, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddSupplierDrawer, isHired],
  );

  const handleAddCheckListItem = useCallback(
    async (data: ICreateCheckListItem) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          priority_level: Yup.string().required('Sobrenome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/check-list`, {
          name: data.name,
          priority_level: data.priority_level,
          checked,
        });

        addToast({
          type: 'success',
          title: 'Item criado com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });

        handleAddCheckListDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar item da check-list',
          description: 'Erro  ao criar o item, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddCheckListDrawer, checked],
  );

  const handleAddPlanner = useCallback(
    async (data: ICreateEventPlanner) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          planner_id: Yup.string().required('Usuário WePlan é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/event-planner`, {
          planner_id: data.planner_id,
        });

        addToast({
          type: 'success',
          title: 'Cerimonialista adicionado com sucesso com Sucesso',
          description: 'O item foi adicionado à sua check-list.',
        });

        handleAddPlannerDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar cerimonialista',
          description: 'Erro  ao adicionar cerimonialista, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddPlannerDrawer],
  );

  const handleAddOwner = useCallback(
    async (data: ICreateEventOwner) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          owner_id: Yup.string().required('Usuário WePlan é obrigatório.'),
          description: Yup.string().required('Descrição é obrigatório.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/event-owners`, {
          owner_id: data.owner_id,
          description: data.description,
        });

        addToast({
          type: 'success',
          title: 'Dono da festa adicionado com sucesso',
          description: 'Ele já pode contribuir com o evento.',
        });

        handleAddOwnerDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar Dono da Festa',
          description: 'Erro ao adicionar Dono da Festa, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddOwnerDrawer],
  );

  const handleAddMember = useCallback(
    async (data: ICreateEventMember) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          member_id: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${pageEvent.id}/event-members`, {
          member_id: data.member_id,
        });

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });

        handleAddMemberDrawer();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
      }
    },
    [addToast, pageEvent.id, handleAddMemberDrawer],
  );

  const handleDateChange = useCallback((day: Date) => {
    setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const getEventPlanners = useCallback(() => {
    try {
      api
        .get<IEventPlanners[]>(`events/${pageEvent.id}/event-planner`)
        .then(response => {
          setPlanners(response.data);
        });
    } catch (err) {
      throw new Error('event dashboard, rota guest para o backend');
      console.log(err);
    }
  }, [pageEvent]);

  const getEventOwners = useCallback(() => {
    try {
      api
        .get<IEventOwners[]>(`events/${pageEvent.id}/event-owners`)
        .then(response => {
          setOwners(response.data);
        });
    } catch (err) {
      console.log(err);
      throw new Error('event dashboard, rota guest para o backend');
    }
  }, [pageEvent]);

  const getEventMembers = useCallback(() => {
    try {
      api
        .get<IEventMembers[]>(`events/${pageEvent.id}/event-members`)
        .then(response => {
          setMembers(response.data);
        });
    } catch (err) {
      throw new Error('event dashboard, rota guest para o backend');
      console.log(err);
    }
  }, [pageEvent]);

  const handleGetGuests = useCallback(() => {
    try {
      api
        .get<IEventGuest[]>(`/events/${pageEvent.id}/guests`)
        .then(response => {
          setEventGuests(response.data);
        });
      setConfirmedGuests(eventGuests.filter(guest => guest.confirmed === true));
      setMyGuests(eventGuests.filter(guest => guest.host === user.name));
    } catch (err) {
      throw new Error('event dashboard, rota guest para o backend');
      console.log(err);
    }
  }, [pageEvent.id, eventGuests, user]);

  const handleGetCheckListItems = useCallback(() => {
    try {
      api
        .get<IEventCheckList[]>(`/events/${pageEvent.id}/check-list`)
        .then(response => {
          setCheckListItems(response.data);
        });
      setResolvedCheckListItems(
        checkListItems.filter(item => item.checked === true),
      );
    } catch (err) {
      throw new Error('event dashboard, rota guest para o backend');
      console.log(err);
    }
  }, [pageEvent.id, checkListItems]);

  const handleGetEvents = useCallback(() => {
    try {
      api.get<IEvent[]>('/events').then(response => {
        setMyEvents(response.data);
      });
    } catch (err) {
      throw Error(err);
    }
  }, []);

  const handleGetEvent = useCallback(() => {
    try {
      api.get<EventDTO>(`/events/${pageEvent.id}`).then(response => {
        setEventDTO(response.data);
      });
    } catch (err) {
      throw Error(err);
    }
  }, [pageEvent]);

  const handleMyEventDashboard = useCallback(
    (my_event: IEvent) => {
      history.push('/dashboard/my-event', { params: my_event });
      closeAllWindows();
      handleGetEvent();
    },
    [history, handleGetEvent, closeAllWindows],
  );

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);

  useEffect(() => {
    const date = new Date(eventDTO.date);
    const year = date.getFullYear();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    setEvent({
      id: eventDTO.id,
      name: eventDTO.name,
      date: `${hour}:${minute} - ${day}/${month}/${year}`,
      daysTillDate: differenceInCalendarDays(date, new Date()),
    });
  }, [eventDTO]);

  useEffect(() => {
    handleGetCheckListItems();
  }, [handleGetCheckListItems]);

  useEffect(() => {
    handleGetGuests();
  }, [handleGetGuests]);

  useEffect(() => {
    getEventPlanners();
  }, [getEventPlanners]);

  useEffect(() => {
    getEventOwners();
  }, [getEventOwners]);

  useEffect(() => {
    getEventMembers();
  }, [getEventMembers]);

  let guestCount = 0;
  let myGuestCount = 0;

  return (
    <Container>
      <MenuButton />
      <PageHeader />
      {!!userProfileWindow && <UserProfile />}

      <EventPageContent>
        <SideBar>
          <MyEvents>
            <MyEventsDrawerButton type="button" onClick={handleMyEventsDrawer}>
              <h1>Meus Eventos</h1>
              {myEventsDrawer ? (
                <span>
                  <FiChevronUp size={30} />
                </span>
              ) : (
                <span>
                  <FiChevronDown size={30} />
                </span>
              )}
            </MyEventsDrawerButton>
            {myEventsDrawer && (
              <MyEventsDrawer>
                {myEvents.map(myEvent => (
                  <button
                    type="button"
                    onClick={() => handleMyEventDashboard(myEvent)}
                    key={myEvent.id}
                  >
                    {myEvent.name}
                    <span>
                      <FiChevronRight size={24} />
                    </span>
                  </button>
                ))}
              </MyEventsDrawer>
            )}
          </MyEvents>
          <button type="button" onClick={handleEventInfoDrawer}>
            Informações do Evento
          </button>
          {!!eventInfoDrawer && (
            <Form ref={formRef} onSubmit={handleEditEventInfo}>
              <EventInfoDrawer>
                <span>
                  <button type="button" onClick={handleEventInfoDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Informações do evento</h1>
                <div>
                  <div>
                    <Input
                      name="duration"
                      type="number"
                      placeholder="Duração (em horas)"
                    />
                    <Input
                      name="number_of_guests"
                      type="number"
                      placeholder="Número de convidados"
                    />
                    <Input
                      name="budget"
                      type="number"
                      placeholder="Orçamento"
                    />
                  </div>
                  <div>
                    <Input name="country" type="text" placeholder="País" />
                    <Input
                      name="local_state"
                      type="text"
                      placeholder="Estado"
                    />
                    <Input name="city" type="text" placeholder="Cidade" />
                  </div>
                  <Input name="address" type="text" placeholder="Endereço" />
                </div>
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </EventInfoDrawer>
            </Form>
          )}
          <button type="button" onClick={handleLatestActionsSection}>
            Últimas Atualizações
          </button>
          <button type="button" onClick={handleSupplierSection}>
            Fornecedores
          </button>
          <button type="button" onClick={handleMessagesSection}>
            Mensagens
          </button>
          <button type="button" onClick={handleAddPlannerDrawer}>
            <h1>Cerimonialistas</h1>
            <MdPersonAdd size={24} />
          </button>
          {!!addPlannerDrawer && (
            <Form ref={formRef} onSubmit={handleAddPlanner}>
              <AddPlannerDrawer>
                <span>
                  <button type="button" onClick={handleAddPlannerDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Adicionar Cerimonialista</h1>

                <Input
                  name="planner_id"
                  type="text"
                  placeholder="Qual o id do cerimonialista?"
                />
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddPlannerDrawer>
            </Form>
          )}
          {planners.map(planner => (
            <span key={planner.id}>
              <button type="button" onClick={handleUserProfileWindow}>
                <h2>{planner.name}</h2>
              </button>
            </span>
          ))}
          <button type="button" onClick={handleAddOwnerDrawer}>
            <h1>Anfitriões</h1>
            <MdPersonAdd size={24} />
          </button>
          {!!addOwnerDrawer && (
            <Form ref={formRef} onSubmit={handleAddOwner}>
              <AddOwnerDrawer>
                <span>
                  <button type="button" onClick={handleAddOwnerDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>
                <h1>Adicionar Anfitrião</h1>

                <Input
                  name="owner_id"
                  type="text"
                  placeholder="Qual o id do usuário?"
                />
                <Input
                  name="description"
                  type="text"
                  placeholder="Título do Anfitrião (Noiva, Mãe da noiva, ...)"
                />
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddOwnerDrawer>
            </Form>
          )}
          {owners.map(owner => (
            <span key={owner.id}>
              <button type="button" onClick={handleUserProfileWindow}>
                <h2>{owner.name}</h2>
              </button>
            </span>
          ))}

          <button type="button" onClick={handleAddMemberDrawer}>
            <h1>Membros</h1>
            <MdPersonAdd size={24} />
          </button>

          {!!addMemberDrawer && (
            <Form ref={formRef} onSubmit={handleAddMember}>
              <AddMemberDrawer>
                <span>
                  <button type="button" onClick={handleAddMemberDrawer}>
                    <MdClose size={30} />
                  </button>
                </span>

                <h1>Adicionar Membros da Festa</h1>

                <Input
                  name="member_id"
                  type="text"
                  placeholder="Qual o id do usuário?"
                />

                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </AddMemberDrawer>
            </Form>
          )}

          <span>
            <button type="button" onClick={handleMembersWindow}>
              <h2>Visualizar</h2>
            </button>
          </span>

          {!!membersWindow && (
            <MembersWindow>
              <span>
                <h1>{event.name}</h1>

                <button type="button" onClick={handleMembersWindow}>
                  <MdClose size={30} />
                </button>

                <div>
                  <h1>Membros</h1>
                  <strong>{members.length}</strong>
                </div>
              </span>

              <div>
                {members.map(member => (
                  <button key={member.id} type="button">
                    <img
                      src={
                        member.avatar === ''
                          ? avatar_placeholder
                          : member.avatar
                      }
                      alt={member.trimmed_name}
                    />

                    <h1>{member.name}</h1>
                  </button>
                ))}
              </div>
            </MembersWindow>
          )}
        </SideBar>
        <Main>
          <SubHeader>
            <span>
              <h1>{event.name}</h1>
              <button type="button" onClick={handleEditEventNameDrawer}>
                <FiEdit size={30} />
              </button>
            </span>

            {!!editEventNameDrawer && (
              <>
                <EditEventNameCloseButton
                  type="button"
                  onClick={handleEditEventNameDrawer}
                >
                  <MdClose size={30} />
                </EditEventNameCloseButton>
                <EditEventNameDrawer>
                  <span>
                    <h2>Nome do Evento</h2>

                    <input type="text" />

                    <button type="button">
                      <h3>Salvar</h3>
                    </button>
                  </span>
                </EditEventNameDrawer>
              </>
            )}

            <FirstRow>
              <div>
                <button type="button" onClick={handleGuestsSection}>
                  <h2>Convidados</h2>
                  <p>
                    {confirmedGuests.length}/{eventGuests.length}
                  </p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleBudgetDrawer}>
                  <h2>Orçamento</h2>

                  <p>R$ 215.000,00</p>
                </button>
              </div>

              <div>
                <button type="button" onClick={handleAppointmentsSection}>
                  <h2>Compromissos</h2>
                  <p>4</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleFinanceSection}>
                  <h2>Financeiro</h2>
                  <p>41%</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleCheckListSection}>
                  <h2>Check-List</h2>

                  <p>
                    {resolvedCheckListItems.length}/{checkListItems.length}
                  </p>
                </button>
              </div>
            </FirstRow>

            {!!budgetDrawer && (
              <BudgetDrawer>
                <BudgetCloseButton type="button" onClick={handleBudgetDrawer}>
                  <MdClose size={30} />
                </BudgetCloseButton>
                <span>
                  <h2>Novo Orçamento</h2>

                  <input type="text" />

                  <button type="button">
                    <h3>Salvar</h3>
                  </button>
                </span>
              </BudgetDrawer>
            )}
          </SubHeader>
          {!!latestActionsSection && (
            <LatestNews>
              <strong>Últimas Atualizações</strong>
              <ul>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Sérgio Cerimonial:</span>
                  <p>Degustação ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Mensagem |</h3>
                  <span>Maria Doces:</span>
                  <p>Bom dia Antônio, ...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Solicitação de agendamento |</h3>
                  <span>Degustação Buffet Rullus:</span>
                  <p>R...</p>
                  <FiChevronRight size={24} />
                </li>
                <li>
                  <h3>Pedrinho Magalhães 6 anos |</h3>
                  <span>Covidados:</span>
                  <p>Eliane confirmou ...</p>
                  <FiCheck size={24} color="#119112" />
                </li>
              </ul>
            </LatestNews>
          )}
          {!!supplierSection && (
            <SupplierSection>
              <SelectedSuppliers>
                <h1>Fornecedores Selecionados</h1>
                <button type="button" onClick={handleAddSupplierDrawer}>
                  <FiUserPlus size={26} />
                </button>
                <div>
                  <Supplier>
                    <h1>Rullus</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Vagalumens</h1>
                    <FiChevronRight />
                  </Supplier>
                </div>
              </SelectedSuppliers>
              <HiredSuppliers>
                <h1>Fornecedores Contratados</h1>
                <button type="button" onClick={handleAddSupplierDrawer}>
                  <FiUserPlus size={26} />
                </button>
                <div>
                  <Supplier>
                    <h1>Far East</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Sergio Mendes</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Luisa Fotógrafa</h1>
                    <FiChevronRight />
                  </Supplier>
                  <Supplier>
                    <h1>Marcela Ferrari</h1>
                    <FiChevronRight />
                  </Supplier>
                </div>
              </HiredSuppliers>
              {!!addSupplierDrawer && (
                <Form ref={formRef} onSubmit={handleAddSupplier}>
                  <AddSupplierDrawer>
                    <span>
                      <button type="button" onClick={handleAddSupplierDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Fornecedor</h1>

                    {isHiredMessage === '' ? (
                      <button type="button" onClick={handleIsHiredDrawer}>
                        Contratado?
                      </button>
                    ) : (
                      <h1>
                        <button type="button" onClick={handleIsHiredDrawer}>
                          {isHiredMessage}
                        </button>
                      </h1>
                    )}
                    {!!isHiredDrawer && (
                      <IsHiredDrawer>
                        <h1>Fornecedor contratado?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleIsHiredQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIsHiredQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </IsHiredDrawer>
                    )}

                    <Input
                      name="supplier_id"
                      type="text"
                      placeholder="ID do fornecedor"
                    />

                    {/* <Input name= type="text" placeholder="Usuário We Plan?" /> */}

                    <Input
                      name="supplier_sub_category"
                      type="text"
                      placeholder="Qual o serviço contratado?"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddSupplierDrawer>
                </Form>
              )}
            </SupplierSection>
          )}
          {!!messagesSection && (
            <MessagesSection>
              <UsersChat>
                <div>
                  <h1>Contatos</h1>

                  <UserChat>
                    <h1>Rullus</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Vagalumens</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>ZCM</h1>
                    <FiChevronRight />
                  </UserChat>
                  <UserChat>
                    <h1>Company</h1>
                    <FiChevronRight />
                  </UserChat>
                </div>
              </UsersChat>
              <ChatMessages>
                <div>
                  <span>
                    <button type="button" onClick={handleUserProfileWindow}>
                      <h1>Rullus</h1>
                    </button>
                  </span>

                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Então, posso ver o que pode ser feito, o Felipe vai te
                      ligar. Mas de toda forma, segue agendado para segunda as
                      8am. ;)
                    </p>
                    <p>14:20</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>
                      Tudo bem. Fico aguardando o seu retorno. Muito obrigado
                      Alice! ;D
                    </p>
                    <p>14:22</p>
                  </Messages>
                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Imagina, é um prazer. Precisando só falar! Um excelente
                      fim de semana.
                    </p>
                    <p>14:27</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>Um beijo, bom fim de semana.</p>
                    <p>14:29</p>
                  </Messages>
                  <Messages>
                    <span>Rullus: </span>
                    <p>
                      Imagina, é um prazer. Precisando só falar! Um excelente
                      fim de semana.
                    </p>
                    <p>14:30</p>
                  </Messages>
                  <Messages>
                    <span>Você: </span>
                    <p>Um beijo, bom fim de semana.</p>
                    <p>14:32</p>
                  </Messages>

                  <input type="text" />
                  <button type="button">Enviar</button>
                </div>
              </ChatMessages>
            </MessagesSection>
          )}
          {!!guestsSection && (
            <GuestSection>
              <span>
                <GuestNavigationButton
                  myGuestActive={guestWindow}
                  type="button"
                  onClick={() => handleGuestWindow(true)}
                >
                  Convidados da Festa
                </GuestNavigationButton>

                <GuestNavigationButton
                  type="button"
                  onClick={() => handleGuestWindow(false)}
                  myGuestActive={!guestWindow}
                >
                  Meus Convidados
                </GuestNavigationButton>
                <button type="button" onClick={handleAddGuestDrawer}>
                  <MdPersonAdd size={30} />
                </button>
              </span>

              <div>
                {guestWindow &&
                  eventGuests.map(eGuest => {
                    guestCount += 1;
                    return (
                      <Guest key={eGuest.id}>
                        <span>
                          <p>{guestCount}</p>
                          <h1>
                            <strong>{eGuest.first_name}</strong>{' '}
                            {eGuest.last_name}
                          </h1>
                        </span>
                        {eGuest.weplanUser && (
                          <button key={eGuest.id} type="button">
                            <FiUser size={24} />
                          </button>
                        )}
                        <div>
                          <button key={eGuest.id} type="button">
                            {eGuest.confirmed ? (
                              <FiCheckSquare size={24} />
                            ) : (
                              <FiSquare size={24} />
                            )}
                          </button>
                        </div>
                      </Guest>
                    );
                  })}
                {!guestWindow &&
                  myGuests.map(mGuest => {
                    myGuestCount += 1;
                    return (
                      <Guest key={mGuest.id}>
                        <span>
                          <p>{myGuestCount}</p>
                          <h1>
                            <strong>{mGuest.first_name}</strong>{' '}
                            {mGuest.last_name}
                          </h1>
                        </span>
                        {mGuest.weplanUser && (
                          <button key={mGuest.id} type="button">
                            <FiUser size={24} />
                          </button>
                        )}
                        <div>
                          <button key={mGuest.id} type="button">
                            {mGuest.confirmed ? (
                              <FiCheckSquare size={24} />
                            ) : (
                              <FiSquare size={24} />
                            )}
                          </button>
                        </div>
                      </Guest>
                    );
                  })}
              </div>
              {!!addGuestDrawer && (
                <Form ref={formRef} onSubmit={handleAddGuest}>
                  <AddGuestDrawer>
                    <span>
                      <button type="button" onClick={handleAddGuestDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar Convidado</h1>

                    <div>
                      {weplanGuestUser === '' ? (
                        <button type="button" onClick={handleWeplanGuestDrawer}>
                          Convidado Weplan ?
                        </button>
                      ) : (
                        <h1>
                          <button
                            type="button"
                            onClick={handleWeplanGuestDrawer}
                          >
                            {weplanGuestUser}
                          </button>
                        </h1>
                      )}
                      {guestConfirmedMessage === '' ? (
                        <button
                          type="button"
                          onClick={handleGuestConfirmedDrawer}
                        >
                          Confirmado?
                        </button>
                      ) : (
                        <h1>
                          <button
                            type="button"
                            onClick={handleGuestConfirmedDrawer}
                          >
                            {guestConfirmedMessage}
                          </button>
                        </h1>
                      )}
                    </div>
                    {!!weplanGuestDrawer && (
                      <WeplanGuestDrawer>
                        <h1>É usuário WePlan?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleWeplanGuestQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWeplanGuestQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </WeplanGuestDrawer>
                    )}
                    {!!guestConfirmedDrawer && (
                      <GuestConfirmedDrawer>
                        <h1>Convidado confirmado?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleGuestConfirmedQuestion(true)}
                          >
                            Sim
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGuestConfirmedQuestion(false)}
                          >
                            Não
                          </button>
                        </div>
                      </GuestConfirmedDrawer>
                    )}

                    <Input name="first_name" type="text" placeholder="Nome" />
                    <Input
                      name="last_name"
                      type="text"
                      placeholder="Sobrenome"
                    />

                    <Input
                      name="description"
                      type="text"
                      placeholder="Alguma descrição necessária?"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddGuestDrawer>
                </Form>
              )}
            </GuestSection>
          )}
          {!!appointmentsSection && (
            <Appointments>
              <NextAppointment>
                <h1>Próximo Compromisso</h1>
                <div>
                  <div>
                    <h1>Rullus Buffet</h1>
                    <span>17/10/2020 - 14:00</span>
                  </div>

                  <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                </div>
              </NextAppointment>
              <MyAppointments>
                <h1>Meus Compromissos</h1>
                <button type="button" onClick={handleAddAppointmentDrawer}>
                  <MdAdd size={30} />
                </button>
                <div>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                  <Appointment>
                    <div>
                      <h1>Rullus Buffet</h1>
                      <span>17/10/2020 - 14:00</span>
                    </div>
                    <p>Rua Engenheiro Almir Almirante, 47, lourdes</p>
                  </Appointment>
                </div>
              </MyAppointments>
              {!!addAppointmentDrawer && (
                <Form ref={formRef} onSubmit={handleAddAppointment}>
                  <AddAppointmentDrawer>
                    <div>
                      <div>
                        <span>
                          <button
                            type="button"
                            onClick={handleAddAppointmentDrawer}
                          >
                            <MdClose size={30} />
                          </button>
                        </span>
                        <h1>Adicionar Compromisso</h1>

                        <Input
                          name="subject"
                          type="text"
                          placeholder="Assunto"
                        />

                        <Input
                          type="text"
                          placeholder="Hora"
                          name="start_hour"
                        />
                        <Input
                          type="text"
                          placeholder="Minuto"
                          name="start_minute"
                        />
                        <Input
                          name="duration_minutes"
                          type="number"
                          placeholder="Duração em minutos"
                        />
                      </div>
                      <span>
                        <div>
                          {weplanSupplierAppointmentMessage === '' ? (
                            <button
                              type="button"
                              onClick={handleWeplanSupplierAppointmentDrawer}
                            >
                              Fornecedor Weplan ?
                            </button>
                          ) : (
                            <h1>
                              <button
                                type="button"
                                onClick={handleWeplanSupplierAppointmentDrawer}
                              >
                                {weplanSupplierAppointmentMessage}
                              </button>
                            </h1>
                          )}
                          {appointmentType === '' ? (
                            <button
                              type="button"
                              onClick={handleAppointmentTypeDrawer}
                            >
                              Qual o tipo de compromisso ?
                            </button>
                          ) : (
                            <h1>
                              <button
                                type="button"
                                onClick={handleAppointmentTypeDrawer}
                              >
                                {appointmentType}
                              </button>
                            </h1>
                          )}
                          {!!weplanSupplierAppointmentDrawer && (
                            <WeplanSupplierAppointmentDrawer>
                              <h1>Fornecedor é usuário WePlan?</h1>
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleWeplanSupplierAppointmentQuestion(
                                      true,
                                    )}
                                >
                                  Sim
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleWeplanSupplierAppointmentQuestion(
                                      false,
                                    )
                                  }
                                >
                                  Não
                                </button>
                              </div>
                            </WeplanSupplierAppointmentDrawer>
                          )}
                          {!!appointmentTypeDrawer && (
                            <AppointmentTypeDrawer>
                              <h1>Qual o tipo de compromisso?</h1>
                              <div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentTypeQuestion('Comercial')
                                  }
                                >
                                  Comercial
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAppointmentTypeQuestion('Técnico')
                                  }
                                >
                                  Técnico
                                </button>
                              </div>
                            </AppointmentTypeDrawer>
                          )}
                        </div>
                        <Calendar>
                          <DayPicker
                            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                            fromMonth={new Date()}
                            onMonthChange={handleMonthChange}
                            selectedDays={selectedDate}
                            onDayClick={handleDateChange}
                            months={[
                              'Janeiro',
                              'Fevereiro',
                              'Março',
                              'Abril',
                              'Maio',
                              'Junho',
                              'Julho',
                              'Agosto',
                              'Setembro',
                              'Outubro',
                              'Novembro',
                              'Dezembro',
                            ]}
                          />
                        </Calendar>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Endereço"
                        />
                      </span>
                    </div>
                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddAppointmentDrawer>
                </Form>
              )}
            </Appointments>
          )}
          {!!financeSection && (
            <Financial>
              <img src={chart} alt="chart" />
              <Payments>
                <strong>Transações</strong>
                <ul>
                  <li>
                    <span>Malu - 7 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Pedrinho - 5 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Malu - 6 anos</span>
                    <FiCheckSquare size={24} />
                  </li>
                </ul>
              </Payments>
            </Financial>
          )}
          {!!checkListSection && (
            <>
              <CheckList>
                <strong>Check List</strong>
                <button type="button" onClick={handleAddCheckListDrawer}>
                  <MdAdd size={30} />
                </button>
                <ul>
                  <li>
                    <span>Cerimonialista</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Espaço</span>
                    <FiCheckSquare size={24} />
                  </li>
                  <li>
                    <span>Decoração</span>
                    <FiCheckSquare size={24} />
                  </li>
                </ul>
              </CheckList>
              {!!addCheckListDrawer && (
                <Form ref={formRef} onSubmit={handleAddCheckListItem}>
                  <AddCheckListDrawer>
                    <span>
                      <button type="button" onClick={handleAddCheckListDrawer}>
                        <MdClose size={30} />
                      </button>
                    </span>
                    <h1>Adicionar</h1>

                    {CheckedListItemMessage === '' ? (
                      <button
                        type="button"
                        onClick={handleCheckedListItemDrawer}
                      >
                        Tarefa realizada ?
                      </button>
                    ) : (
                      <h1>
                        <button
                          type="button"
                          onClick={handleCheckedListItemDrawer}
                        >
                          {CheckedListItemMessage}
                        </button>
                      </h1>
                    )}
                    {!!checkedListItemDrawer && (
                      <CheckedListItemDrawer>
                        <h1>Tarefa Realizada?</h1>
                        <div>
                          <button
                            type="button"
                            onClick={() => handleCheckListChecked(true)}
                          >
                            Sim!
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCheckListChecked(false)}
                          >
                            Ainda não ...
                          </button>
                        </div>
                      </CheckedListItemDrawer>
                    )}
                    <Input name="name" type="text" placeholder="Nome" />

                    <Input
                      name="priority_level"
                      type="text"
                      placeholder="Nível de prioridade (1 a 5)"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </AddCheckListDrawer>
                </Form>
              )}
            </>
          )}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
