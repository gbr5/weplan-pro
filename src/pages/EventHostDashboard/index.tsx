import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import {
  FiChevronRight,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiCheckSquare,
  FiUser,
  FiSquare,
  FiEdit3,
  FiChevronLeft,
  FiHome,
  FiMusic,
  FiHelpCircle,
} from 'react-icons/fi';
import {
  MdPersonAdd,
  MdAdd,
  MdFolderSpecial,
  MdLocalFlorist,
  MdLocalDining,
  MdLinkedCamera,
  MdLocalBar,
  MdBuild,
} from 'react-icons/md';
import { differenceInCalendarDays } from 'date-fns/esm';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  EventPageContent,
  FirstRow,
  LatestNews,
  Payments,
  MyEvents,
  MyEventsDrawer,
  MyEventsDrawerButton,
  AddSupplierDrawer,
  BooleanSection,
  AddGuestDrawer,
  Financial,
  SideBar,
  Main,
  CheckList,
  BudgetDrawer,
  EventInfoDrawer,
  EditEventNameDrawer,
  MessagesSection,
  UsersChat,
  UserChat,
  ChatMessages,
  Messages,
  AddCheckListDrawer,
  WeplanUserDrawer,
  GuestConfirmedDrawer,
  CheckedListItemDrawer,
  IsHiredDrawer,
  AddPlannerDrawer,
  AddOwnerDrawer,
  AddMemberDrawer,
  MembersWindow,
  Guest,
  BooleanNavigationButton,
  NotHostGuest,
  NumberOfGuestWindow,
  MembersContainer,
  EditEventInfoDrawer,
  EventInfo,
} from './styles';
import PageHeader from '../../components/PageHeader';
import MenuButton from '../../components/MenuButton';
import chart from '../../assets/charts.png';
import avatar_placeholder from '../../assets/avatar_placeholder_cat2.jpeg';
import api from '../../services/api';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErros';
import { useAuth } from '../../hooks/auth';
import FriendsListDrawer from '../../components/FriendsListDrawer';
import MemberProfileDrawer from '../../components/MemberProfileDrawer';
import OwnerProfileDrawer from '../../components/OwnerProfileDrawer';
import WindowContainer from '../../components/WindowContainer';
import ISelectedSupplierDTO from '../../dtos/ISelectedSupplierDTO';
import EventSupplierWindow from '../../components/EventSupplierWindow';
import SelectedSupplierWindow from '../../components/SelectedSupplierWindow';
import TransactionAgreementForm from '../../components/TransactionAgreementForm';

interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
  date: string;
  event_type: string;
  daysTillDate: number;
}
interface IEventCheckList {
  id: string;
  name: string;
  priority_level: number;
  checked: boolean;
}
interface IEventGuest {
  id: string;
  confirmed: boolean;
  host: string;
  first_name: string;
  last_name: string;
  weplanUser: boolean;
  description: string;
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
interface ICreateSupplier {
  name: string;
  supplier_sub_category: string;
}
interface IEventParams {
  params: {
    id: string;
    name: string;
    date: string;
    daysTillDate: number;
  };
}
interface IUserInfoDTO {
  id: string;
  name: string;
  avatar: string;
}
interface IEventOwnerDTO {
  id: string;
  name: string;
  avatar: string;
  description: string;
  number_of_guests: number;
}
interface IEventMemberDTO {
  id: string;
  name: string;
  avatar: string;
  number_of_guests: number;
}
interface IEventInfo {
  number_of_guests: number;
  duration: number;
  budget: number;
  description: string;
  country: string;
  local_state: string;
  city: string;
  address: string;
}
interface ISupplierSubCategoryDTO {
  id: string;
  sub_category: string;
}
const EventHostDashboard: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const location = useLocation<IEventParams>();
  const { user } = useAuth();

  const pageEvent = location.state.params;

  const [eventId, setEventId] = useState(pageEvent.id);

  const notHostMessage = 'Você não é o anfitrião deste convidado!';

  const [myEvents, setMyEvents] = useState<IEvent[]>([]);
  const [myEventsDrawer, setMyEventsDrawer] = useState(false);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [friends, setFriends] = useState<IUserInfoDTO[]>([]);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [checkListItems, setCheckListItems] = useState<IEventCheckList[]>([]);
  const [resolvedCheckListItems, setResolvedCheckListItems] = useState(0);
  const [checkListItem, setCheckListItem] = useState<IEventCheckList>(
    {} as IEventCheckList,
  );
  const [editCheckListItemWindow, setEditCheckListItemWindow] = useState(false);

  const [eventGuests, setEventGuests] = useState<IEventGuest[]>([]);
  const [confirmedGuests, setConfirmedGuests] = useState(0);
  const [myGuests, setMyGuests] = useState<IEventGuest[]>([]);
  const [updated_guest, setUpdated_guest] = useState<IEventGuest>(
    {} as IEventGuest,
  );
  const [wpUserId, setWpUserId] = useState(''); // wpUser é para usuários dos sistema que não seja o próprio usuário
  const [wpUserName, setWpUserName] = useState('');
  const [planners, setPlanners] = useState<IUserInfoDTO[]>([]);
  const [owners, setOwners] = useState<IEventOwnerDTO[]>([]);
  const [owner, setOwner] = useState<IEventOwnerDTO>({} as IEventOwnerDTO);
  const [members, setMembers] = useState<IEventMemberDTO[]>([]);
  const [member, setMember] = useState<IEventMemberDTO>({} as IEventMemberDTO);
  const [membersWindow, setMembersWindow] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<
    ISelectedSupplierDTO[]
  >([]);
  const [hiredSupplier, setHiredSupplier] = useState<ISelectedSupplierDTO>(
    {} as ISelectedSupplierDTO,
  );
  const [selectedSupplier, setSelectedSupplier] = useState<
    ISelectedSupplierDTO
  >({} as ISelectedSupplierDTO);
  const [hiredSuppliers, setHiredSuppliers] = useState<ISelectedSupplierDTO[]>(
    [],
  );
  const [eventInfo, setEventInfo] = useState<IEventInfo>({} as IEventInfo);
  const [guestWindow, setGuestWindow] = useState(true);
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [editEventInfoDrawer, setEditEventInfoDrawer] = useState(false);
  const [budgetDrawer, setBudgetDrawer] = useState(false);
  const [addGuestDrawer, setAddGuestDrawer] = useState(false);
  const [addSupplierDrawer, setAddSupplierDrawer] = useState(false);
  const [editEventNameDrawer, setEditEventNameDrawer] = useState(false);
  const [addCheckListDrawer, setAddCheckListDrawer] = useState(false);
  const [latestActionsSection, setLatestActionsSection] = useState(true);
  const [guestsSection, setGuestsSection] = useState(false);
  const [financeSection, setFinanceSection] = useState(false);
  const [checkListSection, setCheckListSection] = useState(false);
  const [supplierSection, setSupplierSection] = useState(false);
  const [messagesSection, setMessagesSection] = useState(false);
  const [wpUserQuestionDrawer, setWpUserQuestionDrawer] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [guestConfirmedDrawer, setGuestConfirmedDrawer] = useState(false);
  const [guestConfirmedMessage, setGuestConfirmedMessage] = useState('');
  const [guestConfirmed, setGuestConfirmed] = useState(false);

  const [checkedListItemDrawer, setCheckedListItemDrawer] = useState(false);
  const [CheckedListItemMessage, setCheckedListItemMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [isHiredDrawer, setIsHiredDrawer] = useState(false);
  const [isHiredMessage, setIsHiredMessage] = useState('');
  const [isHired, setIsHired] = useState(false);
  const [addPlannerDrawer, setAddPlannerDrawer] = useState(false);
  const [addOwnerDrawer, setAddOwnerDrawer] = useState(false);
  const [addMemberDrawer, setAddMemberDrawer] = useState(false);
  const [editGuestDrawer, setEditGuestDrawer] = useState(false);
  const [myGuestsConfirmed, setMyGuestsConfirmed] = useState(0);
  const [memberProfileWindow, setMemberProfileWindow] = useState(false);
  const [ownerProfileWindow, setOwnerProfileWindow] = useState(false);
  const [numberOfGuestDrawer, setNumberOfGuestDrawer] = useState(false);
  const [editOwnerDrawer, setEditOwnerDrawer] = useState(false);
  const [deleteMemberDrawer, setDeleteMemberDrawer] = useState(false);
  const [deleteOwnerDrawer, setDeleteOwnerDrawer] = useState(false);
  const [deleteHiredSupplierDrawer, setDeleteHiredSupplierDrawer] = useState(
    false,
  );
  const [
    deleteSelectedSupplierDrawer,
    setDeleteSelectedSupplierDrawer,
  ] = useState(false);
  const [numberOfOwners, setNumberOfOwners] = useState(0);
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [eventDate, setEventDate] = useState(new Date());
  const [hiredSuppliersSection, setHiredSuppliersSection] = useState(
    hiredSuppliers.length === 0,
  );
  const [firstRow, setFirstRow] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [supplierCategory, setSupplierCategory] = useState('');
  const [supplierSubCategory, setSupplierSubCategory] = useState('');
  const [supplierSubCategories, setSupplierSubCategories] = useState<
    ISupplierSubCategoryDTO[]
  >([]);
  const [supplierCategoryWindow, setSupplierCategoryWindow] = useState(false);
  const [transactionAgreementWindow, setTransactionAgreementWindow] = useState(
    false,
  );
  const [supplierInfo, setSupplierInfo] = useState<ISelectedSupplierDTO>(
    {} as ISelectedSupplierDTO,
  );
  const [hiredSupplierWindow, setHiredSupplierWindow] = useState(false);
  const [selectedSupplierWindow, setSelectedSupplierWindow] = useState(false);

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
    setEditEventNameDrawer(false);
    setWpUserQuestionDrawer(false);
    setGuestConfirmedDrawer(false);
    setCheckedListItemDrawer(false);
    setAddPlannerDrawer(false);
    setFriendsWindow(false);
    setMemberProfileWindow(false);
    setDeleteMemberDrawer(false);
    setNumberOfGuestDrawer(false);
  }, []);

  const handleFirstRow = useCallback(() => {
    setFirstRow(!firstRow);
    setSidebar(false);
    closeAllWindows();
  }, [firstRow, closeAllWindows]);
  const handleSideBar = useCallback(() => {
    setSidebar(!sidebar);
    setFirstRow(false);
  }, [sidebar]);
  const closeAllSections = useCallback(() => {
    setLatestActionsSection(false);
    setGuestsSection(false);
    setFinanceSection(false);
    setCheckListSection(false);
    setSupplierSection(false);
    setMessagesSection(false);
    setFirstRow(false);
    setSidebar(false);
  }, []);
  const handleMyEventsDrawer = useCallback(() => {
    closeAllWindows();
    setMyEventsDrawer(!myEventsDrawer);
  }, [myEventsDrawer, closeAllWindows]);
  const handleEventInfoDrawer = useCallback(() => {
    closeAllWindows();
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer, closeAllWindows]);
  const handleEditGuestDrawer = useCallback(
    (props: IEventGuest) => {
      closeAllWindows();
      setUpdated_guest(props);
      if (props.weplanUser === true) {
        setWeplanUser(true);
      } else {
        setWeplanUser(false);
      }

      return setEditGuestDrawer(!editGuestDrawer);
    },
    [editGuestDrawer, closeAllWindows],
  );
  const handleOwnerProfileWindow = useCallback(
    (props: IEventOwnerDTO) => {
      closeAllWindows();
      setOwner(props);
      setOwnerProfileWindow(true);
    },
    [closeAllWindows],
  );
  const handleMemberProfileWindow = useCallback(
    (props: IEventMemberDTO) => {
      closeAllWindows();
      setMember(props);
      setMemberProfileWindow(true);
    },
    [closeAllWindows],
  );
  const handleSupplierCategory = useCallback(() => {
    if (supplierCategoryWindow) {
      setSupplierCategoryWindow(false);
      setSupplierCategory('');
      setSupplierSubCategory('');
    } else {
      setSupplierCategoryWindow(true);
    }
  }, [supplierCategoryWindow]);
  const handleHiredSupplierWindow = useCallback(
    (props: ISelectedSupplierDTO) => {
      closeAllWindows();
      setHiredSupplier(props);
      setHiredSupplierWindow(true);
    },
    [closeAllWindows],
  );
  const handleSelectedSupplierWindow = useCallback(
    (props: ISelectedSupplierDTO) => {
      closeAllWindows();
      setSelectedSupplier(props);
      setSelectedSupplierWindow(true);
    },
    [closeAllWindows],
  );

  const handleMembersWindow = useCallback(() => {
    closeAllWindows();
    setMembersWindow(!membersWindow);
  }, [membersWindow, closeAllWindows]);
  const handleEditCheckListItemWindow = useCallback(props => {
    setCheckListItem(props);
    setEditCheckListItemWindow(true);
  }, []);
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
  const handleWeplanGuestDrawer = useCallback(props => {
    setWpUserQuestionDrawer(props);
  }, []);
  const handleGuestConfirmedDrawer = useCallback(() => {
    setGuestConfirmedDrawer(!guestConfirmedDrawer);
  }, [guestConfirmedDrawer]);
  const handleAddSupplierDrawer = useCallback(
    props => {
      if (props === '') {
        console.log(
          "handleAddSupplierDrawer Function => supplierSubCategory(props) === '':",
          props,
        );
        handleSupplierCategory();
        closeAllWindows();
      } else {
        console.log(
          "handleAddSupplierDrawer Function => supplierSubCategory(props) !== '':",
          props,
        );
        setSupplierCategory('');
        handleSupplierCategory();
        setSupplierSubCategory(props);
        closeAllWindows();
        setAddSupplierDrawer(true);
      }
    },
    [closeAllWindows, handleSupplierCategory],
  );
  const handleIsHiredDrawer = useCallback(() => {
    setIsHiredDrawer(!isHiredDrawer);
  }, [isHiredDrawer]);

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
    setFriendsWindow(!wpUserId);
  }, [addMemberDrawer, closeAllWindows, wpUserId]);
  const handleAddOwnerDrawer = useCallback(() => {
    closeAllWindows();
    setAddOwnerDrawer(!addOwnerDrawer);
    setFriendsWindow(!wpUserId);
  }, [addOwnerDrawer, closeAllWindows, wpUserId]);
  const handleAddPlannerDrawer = useCallback(() => {
    closeAllWindows();
    setAddPlannerDrawer(!addPlannerDrawer);
  }, [addPlannerDrawer, closeAllWindows]);

  const handleLatestActionsSection = useCallback(() => {
    closeAllSections();
    setLatestActionsSection(true);
  }, [closeAllSections]);
  const handleGuestsSection = useCallback(() => {
    closeAllSections();
    setGuestsSection(true);
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
  const handleHiredSuppliersSection = useCallback(props => {
    setHiredSuppliersSection(props);
  }, []);

  const handleSelectedWeplanUser = useCallback((WPUser: IUserInfoDTO) => {
    setWpUserName(WPUser.name);
    setWpUserId(WPUser.id);
    setFriendsWindow(false);
  }, []);
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
  const handleWeplanUserQuestion = useCallback(
    (weplan_user: boolean) => {
      if (weplan_user === true) {
        setWeplanUser(true);
        setWpUserQuestionDrawer(false);
        setFriendsWindow(true);
      } else {
        setWeplanUser(false);
        setWpUserQuestionDrawer(false);
        setWpUserName('');
        setWpUserId('');
      }
      return handleWeplanGuestDrawer(false);
    },
    [handleWeplanGuestDrawer],
  );
  const handleIsHiredQuestion = useCallback(
    (is_hired: boolean) => {
      if (is_hired === true) {
        setIsHiredMessage('Contratado S2!');
        setIsHired(true);
        setIsHiredDrawer(false);
      } else {
        setIsHiredMessage('Avaliando ...');
        setIsHired(false);
        setIsHiredDrawer(false);
      }
      return handleWeplanGuestDrawer(false);
    },
    [handleWeplanGuestDrawer],
  );

  const handleGetSupplierSubCategory = useCallback(() => {
    try {
      console.log('Get SubCategory:', supplierCategory);
      api
        .get<ISupplierSubCategoryDTO[]>(
          `/suppliers/categories/sub-categories/${supplierCategory}`,
        )
        .then(response => {
          console.log(response.data);
          setSupplierSubCategories(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [supplierCategory]);
  const handleGetSuppliers = useCallback(() => {
    try {
      setTransactionAgreementWindow(false);
      api
        .get<ISelectedSupplierDTO[]>(`events/event-suppliers/${eventId}`)
        .then(response => {
          setSelectedSuppliers(
            response.data.filter(selected => selected.isHired === false),
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetPlanners = useCallback(() => {
    try {
      api
        .get<IUserInfoDTO[]>(`events/${eventId}/event-planner`)
        .then(response => {
          setPlanners(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetOwners = useCallback(() => {
    try {
      api
        .get<IEventOwnerDTO[]>(`events/${eventId}/event-owners`)
        .then(response => {
          setOwners(response.data);
          setNumberOfOwners(response.data.length);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetMembers = useCallback(() => {
    try {
      api
        .get<IEventMemberDTO[]>(`events/${eventId}/event-members`)
        .then(response => {
          setMembers(response.data);
          setNumberOfMembers(response.data.length);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetCheckListItems = useCallback(() => {
    try {
      api
        .get<IEventCheckList[]>(`/events/${eventId}/check-list`)
        .then(response => {
          setCheckListItems(response.data);
          setResolvedCheckListItems(
            response.data.filter(item => item.checked === true).length,
          );
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetEventInfo = useCallback(() => {
    try {
      api.get<IEventInfo>(`/events/${eventId}/event-info`).then(response => {
        setEventInfo(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetFriends = useCallback(() => {
    try {
      eventId &&
        api.get<IUserInfoDTO[]>(`/users/friends/list`).then(response => {
          setFriends(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleGetEvents = useCallback(() => {
    try {
      eventId &&
        api.get<IEvent[]>('/events').then(response => {
          setMyEvents(response.data);
        });
    } catch (err) {
      throw Error(err);
    }
  }, [eventId]);
  const handleGetGuests = useCallback(() => {
    try {
      api.get<IEventGuest[]>(`/events/${eventId}/guests`).then(response => {
        setEventGuests(response.data);
        setConfirmedGuests(
          response.data.filter(guest => guest.confirmed === true).length,
        );
        setMyGuests(response.data.filter(guest => guest.host === user.name));
        setMyGuestsConfirmed(
          response.data.filter(
            guest => guest.host === user.name && guest.confirmed === true,
          ).length,
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId, user]);
  const handleGetEvent = useCallback(() => {
    try {
      api.get<IEvent>(`/events/${pageEvent.id}`).then(response => {
        const date = new Date(response.data.date);
        const year = date.getFullYear();
        const month =
          date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const hour =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        setEvent({
          id: response.data.id,
          name: response.data.name,
          trimmed_name: response.data.trimmed_name,
          date: `${hour}:${minute} - ${day}/${month}/${year}`,
          event_type: response.data.event_type,
          daysTillDate: differenceInCalendarDays(date, new Date()),
        });
        setEventDate(date);
      });
    } catch (err) {
      throw Error(err);
    }
  }, [pageEvent]);
  const handleGetHiredSuppliers = useCallback(() => {
    try {
      setTransactionAgreementWindow(false);
      setHiredSupplierWindow(false);
      api
        .get<ISelectedSupplierDTO[]>(`events/hired-suppliers/${eventId}`)
        .then(response => {
          setHiredSuppliers(response.data);
        });
    } catch (err) {
      throw new Error(err);
    }
  }, [eventId]);
  const handleCreateTransactionWindow = useCallback(props => {
    console.log('setando supplier que vai para agreement form:', props);
    setSupplierInfo(props);
    setTransactionAgreementWindow(true);
  }, []);
  const handleAddSupplier = useCallback(
    async (data: ICreateSupplier) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        console.log('handleAddSupplier function:', {
          name: data.name,
          supplier_sub_category: supplierSubCategory,
          isHired,
          weplanUser: false,
        });

        const newSupplier = await api.post(
          `events/event-suppliers/${eventId}`,
          {
            name: data.name,
            supplier_sub_category: supplierSubCategory,
            isHired,
            weplanUser: false,
          },
        );

        setAddSupplierDrawer(false);
        setSupplierCategory('');
        setSupplierSubCategory('');

        handleGetSuppliers();
        handleGetHiredSuppliers();
        addToast({
          type: 'success',
          title: `${data.name} adicionado com Sucesso`,
          description:
            'Você já pode visualizar as alterações na página do seu evento.',
        });
        console.log('isHired de fora:', isHired);
        if (isHired) {
          console.log('isHired de dentro:', isHired);
          handleCreateTransactionWindow(newSupplier.data);
        }
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
    [
      isHired,
      eventId,
      addToast,
      handleGetSuppliers,
      supplierSubCategory,
      handleGetHiredSuppliers,
      handleCreateTransactionWindow,
    ],
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
        await api.post(`events/${eventId}/check-list`, {
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
        handleGetCheckListItems();
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
    [
      addToast,
      eventId,
      handleAddCheckListDrawer,
      handleGetCheckListItems,
      checked,
    ],
  );
  const handleAddPlanner = useCallback(async () => {
    try {
      await api.post(`events/${eventId}/event-planner`, {
        planner_id: wpUserId,
      });

      addToast({
        type: 'success',
        title: 'Cerimonialista adicionado com sucesso com Sucesso',
        description: 'O item foi adicionado à sua check-list.',
      });

      setWpUserId('');
      setWeplanUser(false);
      setWpUserName('');
      setAddPlannerDrawer(false);

      handleAddPlannerDrawer();
      handleGetPlanners();
    } catch (err) {
      setWpUserId('');
      setWeplanUser(false);
      setWpUserName('');
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
  }, [addToast, eventId, handleAddPlannerDrawer, handleGetPlanners, wpUserId]);
  const handleAddOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string().required('Título é obrigatório.'),
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${eventId}/event-owners`, {
          owner_id: wpUserId,
          description: data.description,
          number_of_guests: data.number_of_guests,
        });

        addToast({
          type: 'success',
          title: 'Dono da festa adicionado com sucesso',
          description: 'Ele já pode contribuir com o evento.',
        });

        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
        setAddOwnerDrawer(false);
        handleGetOwners();
      } catch (err) {
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
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
    [addToast, eventId, handleGetOwners, wpUserId],
  );
  const handleAddMember = useCallback(
    async (data: IEventMemberDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`events/${eventId}/event-members`, {
          number_of_guests: Number(data.number_of_guests),
          member_id: wpUserId,
        });

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');

        setAddMemberDrawer(false);
        handleGetMembers();
      } catch (err) {
        setWpUserId('');
        setWeplanUser(false);
        setWpUserName('');
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
    [addToast, eventId, wpUserId, handleGetMembers],
  );
  const handleAddGuest = useCallback(
    async (data: ICreateGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: '0',
            last_name: '0',
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: wpUserId,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post(`events/${eventId}/guests`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            weplanUser,
            confirmed: guestConfirmed,
            user_id: '0',
          });
        }

        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');

        handleAddGuestDrawer();
        handleGetGuests();

        return addToast({
          type: 'success',
          title: 'Convidado criado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        setWpUserId('');
        setGuestConfirmedMessage('');
        setWeplanUser(false);
        setGuestConfirmed(false);
        setWpUserName('');
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
        }
        return addToast({
          type: 'error',
          title: 'Erro ao criar convidado',
          description: 'Erro ao criar o convidado, tente novamente.',
        });
      }
    },
    [
      addToast,
      eventId,
      handleAddGuestDrawer,
      weplanUser,
      guestConfirmed,
      wpUserId,
      handleGetGuests,
    ],
  );

  const handleEditEventInfo = useCallback(
    async (data: IEventInfo) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          duration: Yup.number(),
          number_of_guests: Yup.number(),
          budget: Yup.number(),
          description: Yup.string(),
          country: Yup.string(),
          local_state: Yup.string(),
          city: Yup.string(),
          address: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-info`, data);
        setEventInfo(data);
        setEditEventInfoDrawer(false);

        addToast({
          type: 'success',
          title: 'Informações editadas com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar informações do evento',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, eventId],
  );
  const handleEditBudget = useCallback(
    async (data: IEventInfo) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          budget: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-info`, {
          duration: eventInfo.duration,
          number_of_guests: eventInfo.number_of_guests,
          budget: Number(data.budget),
          description: eventInfo.description,
          country: eventInfo.country,
          local_state: eventInfo.local_state,
          city: eventInfo.city,
          address: eventInfo.address,
        });

        setBudgetDrawer(false);
        handleGetEventInfo();
        addToast({
          type: 'success',
          title: 'Informações editadas com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao editar informações do evento',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, eventId, eventInfo, handleGetEventInfo],
  );
  const handleEditEventName = useCallback(
    async (data: IEvent) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}`, {
          name: data.name,
          date: eventDate,
        });

        setEditEventNameDrawer(false);
        handleGetEvent();
        addToast({
          type: 'success',
          title: 'Informações editadas com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }
        addToast({
          type: 'error',
          title: 'Erro ao editar informações do evento',
          description: 'Tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetEvent, eventDate],
  );

  const handleEditGuest = useCallback(
    async (data: IEventGuest) => {
      try {
        formRef.current?.setErrors([]);

        if (weplanUser) {
          const schema = Yup.object().shape({
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${updated_guest.id}`, {
            first_name: updated_guest.first_name,
            last_name: updated_guest.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        } else {
          const schema = Yup.object().shape({
            first_name: Yup.string().required('Primeiro nome é obrigatório'),
            last_name: Yup.string().required('Sobrenome é obrigatório'),
            description: Yup.string(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await api.put(`events/${eventId}/guests/${updated_guest.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            description: data.description,
            confirmed: updated_guest.confirmed,
          });
        }

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditGuestDrawer(false);
        setWeplanUser(false);
        handleGetGuests();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, weplanUser, updated_guest, handleGetGuests],
  );
  const handleEditConfirmedGuest = useCallback(
    async (props: IEventGuest) => {
      try {
        await api.put(`events/${eventId}/guests/${props.id}`, {
          first_name: props.first_name,
          last_name: props.last_name,
          description: props.description,
          confirmed: !props.confirmed,
        });

        addToast({
          type: 'success',
          title: 'Convidado editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });
        handleGetGuests();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar convidado',
          description: 'Erro ao editar o convidado, tente novamente.',
        });
      }
    },
    [addToast, eventId, handleGetGuests],
  );
  const handleEditMember = useCallback(
    async (data: IEventMemberDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-members/${member.id}`, {
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Membro editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setNumberOfGuestDrawer(false);
        setMemberProfileWindow(false);
        setMember({} as IEventMemberDTO);
        handleGetMembers();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar membro',
          description: 'Erro ao editar o membro, tente novamente.',
        });
      }
    },
    [addToast, eventId, member, handleGetMembers],
  );
  const handleEditOwner = useCallback(
    async (data: IEventOwnerDTO) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          description: Yup.string(),
          number_of_guests: Yup.number(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/event-owners/${owner.id}`, {
          description: data.description,
          number_of_guests: Number(data.number_of_guests),
        });

        addToast({
          type: 'success',
          title: 'Anfitrião editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setOwnerProfileWindow(false);
        setEditOwnerDrawer(false);
        setOwner({} as IEventOwnerDTO);
        handleGetOwners();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar anfitrião',
          description: 'Erro ao editar o anfitrião, tente novamente.',
        });
      }
    },
    [addToast, eventId, owner, handleGetOwners],
  );
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
  const handleEditCheckListItem = useCallback(
    async (data: IEventCheckList) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          priority_level: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`events/${eventId}/check-list/${checkListItem.id}`, {
          name: data.name,
          priority_level: Number(data.priority_level),
          checked: checkListItem.checked,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListItemWindow(false);
        setCheckListItem({} as IEventCheckList);
        handleGetCheckListItems();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);

          formRef.current?.setErrors(error);
        }

        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
      }
    },
    [addToast, eventId, checkListItem, handleGetCheckListItems],
  );
  const handleEditCheckedCheckListItem = useCallback(
    async (data: IEventCheckList) => {
      try {
        await api.put(`events/${eventId}/check-list/${data.id}`, {
          name: data.name,
          priority_level: Number(data.priority_level),
          checked: !data.checked,
        });

        addToast({
          type: 'success',
          title: 'Item editado com sucesso',
          description: 'As mudanças já foram atualizadas no seu evento.',
        });

        setEditCheckListItemWindow(false);
        setCheckListItem({} as IEventCheckList);
        handleGetCheckListItems();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar item',
          description: 'Erro ao editar o item do check-list, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [addToast, eventId, handleGetCheckListItems],
  );

  const handleDeleteGuest = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/guests/${updated_guest.id}`);

      addToast({
        type: 'success',
        title: 'Convidado excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditGuestDrawer(false);
      handleGetGuests();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, updated_guest, addToast, handleGetGuests]);
  const handleDeleteMember = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/event-members/${member.id}`);

      addToast({
        type: 'success',
        title: 'Membro excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setMemberProfileWindow(false);
      setDeleteMemberDrawer(false);
      handleGetMembers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir convidado',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, member, addToast, handleGetMembers]);
  const handleDeleteOwner = useCallback(async () => {
    try {
      await api.delete(`/events/${eventId}/event-owners/${owner.id}`);

      addToast({
        type: 'success',
        title: 'Anfitrião excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setOwnerProfileWindow(false);
      setDeleteOwnerDrawer(false);
      handleGetOwners();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir anfitrião',
        description: 'Erro ao excluir o convidado, tente novamente.',
      });
    }
  }, [eventId, owner, addToast, handleGetOwners]);
  const handleDeleteHiredSupplier = useCallback(async () => {
    console.log('deletar fornecedor');
    try {
      await api.delete(
        `/events/${eventId}/event-suppliers/${hiredSupplier.id}`,
      );

      addToast({
        type: 'success',
        title: 'Fornecedor excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setHiredSupplierWindow(false);
      setDeleteHiredSupplierDrawer(false);
      handleGetHiredSuppliers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir fornecedor',
        description: 'Erro ao excluir o fornecedor, tente novamente.',
      });
    }
  }, [eventId, hiredSupplier, addToast, handleGetHiredSuppliers]);
  const handleDeleteSelectedSupplier = useCallback(async () => {
    console.log('deletar fornecedor');
    try {
      await api.delete(
        `/events/${eventId}/event-suppliers/${selectedSupplier.id}`,
      );

      addToast({
        type: 'success',
        title: 'Fornecedor excluído com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setSelectedSupplierWindow(false);
      setDeleteSelectedSupplierDrawer(false);
      handleGetSuppliers();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
      }

      addToast({
        type: 'error',
        title: 'Erro ao excluir fornecedor',
        description: 'Erro ao excluir o fornecedor, tente novamente.',
      });
    }
  }, [eventId, selectedSupplier, addToast, handleGetSuppliers]);
  const handleDeleteCheckListItem = useCallback(async () => {
    try {
      await api.delete(`events/${eventId}/check-list/${checkListItem.id}`);

      addToast({
        type: 'success',
        title: 'Item deletado com sucesso',
        description: 'As mudanças já foram atualizadas no seu evento.',
      });

      setEditCheckListItemWindow(false);
      setCheckListItem({} as IEventCheckList);
      handleGetCheckListItems();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar item',
        description: 'Erro ao deletar o item do check-list, tente novamente.',
      });

      throw new Error(err);
    }
  }, [addToast, eventId, checkListItem, handleGetCheckListItems]);

  const handleMyEventDashboard = useCallback(
    (my_event: IEvent) => {
      closeAllWindows();
      setEventId(my_event.id);
      return history.push(`/dashboard/my-event/${my_event.trimmed_name}`, {
        params: my_event,
      });
    },
    [closeAllWindows, history],
  );

  useEffect(() => {
    handleGetSuppliers();
  }, [handleGetSuppliers]);
  useEffect(() => {
    handleGetCheckListItems();
  }, [handleGetCheckListItems]);
  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);
  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);
  useEffect(() => {
    handleGetFriends();
  }, [handleGetFriends]);
  useEffect(() => {
    handleGetGuests();
  }, [handleGetGuests]);
  useEffect(() => {
    handleGetPlanners();
  }, [handleGetPlanners]);
  useEffect(() => {
    handleGetOwners();
  }, [handleGetOwners]);
  useEffect(() => {
    handleGetMembers();
  }, [handleGetMembers]);
  useEffect(() => {
    handleGetEventInfo();
  }, [handleGetEventInfo]);
  useEffect(() => {
    if (supplierCategory !== '') {
      handleGetSupplierSubCategory();
    }
  }, [supplierCategory, handleGetSupplierSubCategory]);
  useEffect(() => {
    handleGetHiredSuppliers();
  }, [handleGetHiredSuppliers]);

  let guestCount = 0;
  let myGuestCount = 0;
  let supplierCount = 0;
  let hiredSupplierCount = 0;
  // let i_count = 0;

  return (
    <Container>
      <MenuButton />
      <PageHeader>
        <span>
          <button type="button" onClick={handleEditEventNameDrawer}>
            <h5>
              {event.name}
              <FiEdit3 size={16} />
            </h5>
          </button>
        </span>
      </PageHeader>
      {/* {!!wpUserWindow && (
        <UserProfile
          user={profileUser}
          onChildClick={() => setWpUserWindow(false)}
        />
      )} */}
      {!!hiredSupplierWindow && (
        <EventSupplierWindow
          getEventSuppliers={handleGetSuppliers}
          getHiredSuppliers={handleGetHiredSuppliers}
          eventSupplier={hiredSupplier}
          onHandleEventSupplierDrawer={() => setHiredSupplierWindow(false)}
          onHandleEventSupplierUpdate={() => setHiredSupplierWindow(true)}
          onHandleDeleteEventSupplierDrawer={() =>
            setDeleteHiredSupplierDrawer(true)
          }
        />
      )}
      {!!editEventNameDrawer && (
        <WindowContainer
          onHandleCloseWindow={handleEditEventNameDrawer}
          containerStyle={{
            zIndex: 10,
            top: '140px',
            left: '535px',
            height: '250px',
            width: '440px',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditEventName}>
            <EditEventNameDrawer>
              <span>
                <h2>Nome do Evento</h2>
                <Input
                  name="name"
                  placeholder="Nome do evento"
                  defaultValue={event.name}
                  type="text"
                />
                <button type="submit">
                  <h3>Salvar</h3>
                </button>
              </span>
            </EditEventNameDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!ownerProfileWindow && (
        <OwnerProfileDrawer
          owner={owner}
          onHandleOwnerDrawer={() => setOwnerProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setEditOwnerDrawer(true)}
          onHandleDeleteOwnerDrawer={() => setDeleteOwnerDrawer(true)}
        />
      )}
      {!!memberProfileWindow && (
        <MemberProfileDrawer
          member={member}
          onHandleMemberDrawer={() => setMemberProfileWindow(false)}
          onHandleNumberOfGuestDrawer={() => setNumberOfGuestDrawer(true)}
          onHandleDeleteMemberDrawer={() => setDeleteMemberDrawer(true)}
        />
      )}
      {!!selectedSupplierWindow && (
        <SelectedSupplierWindow
          selectedSupplier={selectedSupplier}
          onHandleSelectedSupplierDrawer={() =>
            setSelectedSupplierWindow(false)
          }
          onUpdateSelectedSupplierDrawer={() => setSelectedSupplierWindow(true)}
          onDeleteSelectedSupplierDrawer={() =>
            setDeleteSelectedSupplierDrawer(true)
          }
        />
      )}
      {!!numberOfGuestDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setNumberOfGuestDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '25%',
            left: '30%',
            height: '50%',
            width: '40%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditMember}>
            <NumberOfGuestWindow>
              <h1>Número de convidados</h1>

              <Input
                name="number_of_guests"
                type="number"
                defaultValue={member.number_of_guests}
              />

              <button type="submit">Salvar</button>
            </NumberOfGuestWindow>
          </Form>
        </WindowContainer>
      )}
      {!!editOwnerDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEditOwnerDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '22,5%',
            left: '30%',
            height: '55%',
            width: '40%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditOwner}>
            <NumberOfGuestWindow>
              <h1>Número de convidados</h1>

              <Input
                name="description"
                type="text"
                defaultValue={owner.description}
              />
              <Input
                name="number_of_guests"
                type="number"
                defaultValue={owner.number_of_guests}
              />
              <button type="submit">Salvar</button>
            </NumberOfGuestWindow>
          </Form>
        </WindowContainer>
      )}
      {!!deleteMemberDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setDeleteMemberDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '25%',
            left: '30%',
            height: '50%',
            width: '40%',
          }}
        >
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o membro?</h1>
            <div>
              <button type="button" onClick={handleDeleteMember}>
                Sim
              </button>
              <button
                type="button"
                onClick={() => setDeleteMemberDrawer(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </WindowContainer>
      )}
      {!!deleteOwnerDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setDeleteOwnerDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '20%',
            left: '30%',
            height: '60%',
            width: '40%',
          }}
        >
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o anfitrião?</h1>
            <div>
              <button type="button" onClick={handleDeleteOwner}>
                Sim
              </button>
              <button type="button" onClick={() => setDeleteOwnerDrawer(false)}>
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </WindowContainer>
      )}
      {!!deleteHiredSupplierDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setDeleteHiredSupplierDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '15%',
            left: '25%',
            height: '70%',
            width: '50%',
          }}
        >
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o fornecedor?</h1>
            <h2>
              Você também deletará todas as informação relacionadas a este
              fornecedor.
            </h2>
            <div>
              <button
                style={{ background: 'red' }}
                type="button"
                onClick={handleDeleteHiredSupplier}
              >
                Sim
              </button>
              <button
                style={{ background: 'green' }}
                type="button"
                onClick={() => setDeleteHiredSupplierDrawer(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </WindowContainer>
      )}
      {!!deleteSelectedSupplierDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setDeleteSelectedSupplierDrawer(false)}
          containerStyle={{
            zIndex: 1000,
            top: '15%',
            left: '25%',
            height: '70%',
            width: '50%',
          }}
        >
          <WeplanUserDrawer>
            <h1>Deseja mesmo deletar o fornecedor?</h1>
            <h2>
              Você também deletará todas as informação relacionadas a este
              fornecedor.
            </h2>
            <div>
              <button
                style={{ background: 'red' }}
                type="button"
                onClick={handleDeleteSelectedSupplier}
              >
                Sim
              </button>
              <button
                style={{ background: 'green' }}
                type="button"
                onClick={() => setDeleteSelectedSupplierDrawer(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </WindowContainer>
      )}
      {!!friendsWindow && (
        <FriendsListDrawer
          friends={friends}
          onHandleFriendsListDrawer={() => setFriendsWindow(false)}
          handleSelectedFriend={(friend: IUserInfoDTO) =>
            handleSelectedWeplanUser(friend)
          }
        />
      )}
      {!!eventInfoDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEventInfoDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <EventInfoDrawer>
            <h1>Informações do evento</h1>
            <h2>{event.name}</h2>
            <EventInfo>
              <span>
                <div>
                  <div>
                    <p>Duração: </p>
                    <h3>{eventInfo.duration}</h3>
                  </div>
                  <div>
                    <p>N° de convidados: </p>
                    <h3>{eventInfo.number_of_guests}</h3>
                  </div>
                  <div>
                    <p>Orçamento: </p>
                    <h3>{eventInfo.budget}</h3>
                  </div>
                </div>
                <div>
                  <div>
                    <p>País: </p>
                    <h3>{eventInfo.country}</h3>
                  </div>
                  <div>
                    <p>Estado: </p>
                    <h3>{eventInfo.local_state}</h3>
                  </div>
                  <div>
                    <p>Cidade: </p>
                    <h3>{eventInfo.city}</h3>
                  </div>
                </div>
              </span>
              <div>
                <p>Endereço: </p>
                <h3>{eventInfo.address}</h3>
              </div>
            </EventInfo>
            <button type="button" onClick={() => setEditEventInfoDrawer(true)}>
              <h3>
                Editar <FiEdit3 size={24} />
              </h3>
            </button>
          </EventInfoDrawer>
        </WindowContainer>
      )}
      {!!editEventInfoDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEditEventInfoDrawer(false)}
          containerStyle={{
            zIndex: 100,
            top: '15%',
            left: '20%',
            height: '70%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditEventInfo}>
            <EditEventInfoDrawer>
              <h1>Editar informações do evento</h1>
              <div>
                <div>
                  <Input
                    defaultValue={eventInfo.duration}
                    name="duration"
                    type="number"
                    placeholder="Duração (em horas)"
                  />
                  <Input
                    defaultValue={eventInfo.number_of_guests}
                    name="number_of_guests"
                    type="number"
                    placeholder="Número de convidados"
                  />
                  <Input
                    defaultValue={eventInfo.budget}
                    name="budget"
                    type="number"
                    placeholder="Orçamento"
                  />
                </div>
                <div>
                  <Input
                    defaultValue={eventInfo.country}
                    name="country"
                    type="text"
                    placeholder="País"
                  />
                  <Input
                    defaultValue={eventInfo.local_state}
                    name="local_state"
                    type="text"
                    placeholder="Estado"
                  />
                  <Input
                    defaultValue={eventInfo.city}
                    name="city"
                    type="text"
                    placeholder="Cidade"
                  />
                </div>
                <Input
                  defaultValue={eventInfo.address}
                  name="address"
                  type="text"
                  placeholder="Endereço"
                />
              </div>
              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </EditEventInfoDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!addCheckListDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddCheckListDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddCheckListItem}>
            <AddCheckListDrawer>
              <h1>Adicionar</h1>

              {CheckedListItemMessage === '' ? (
                <button type="button" onClick={handleCheckedListItemDrawer}>
                  Tarefa realizada ?
                </button>
              ) : (
                <h1>
                  <button type="button" onClick={handleCheckedListItemDrawer}>
                    {CheckedListItemMessage}
                  </button>
                </h1>
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
        </WindowContainer>
      )}
      {!!editCheckListItemWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setEditCheckListItemWindow(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditCheckListItem}>
            <AddCheckListDrawer>
              <h1>Número de convidados</h1>

              <Input
                name="name"
                type="text"
                defaultValue={checkListItem.name}
              />
              <Input
                name="priority_level"
                type="number"
                defaultValue={checkListItem.priority_level}
              />
              <button type="submit">Salvar</button>
              <button type="button" onClick={handleDeleteCheckListItem}>
                Deletar
              </button>
            </AddCheckListDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!checkedListItemDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setCheckedListItemDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
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
        </WindowContainer>
      )}

      {!!addSupplierDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddSupplierDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddSupplier}>
            <AddSupplierDrawer>
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
              <Input
                name="name"
                type="text"
                placeholder="Nome do fornecedor"
                containerStyle={{ height: '40px' }}
              />
              <Input
                name="supplier_sub_category"
                type="text"
                placeholder="Qual o serviço contratado?"
                containerStyle={{ height: '40px' }}
              />
              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddSupplierDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!addGuestDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddGuestDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddGuest}>
            <AddGuestDrawer>
              <h1>Adicionar Convidado</h1>

              {!weplanUser && (
                <>
                  <Input name="first_name" type="text" placeholder="Nome" />
                  <Input name="last_name" type="text" placeholder="Sobrenome" />
                </>
              )}

              <Input name="description" type="text" defaultValue="Descrição" />

              <div>
                {guestConfirmedMessage === '' ? (
                  <button type="button" onClick={handleGuestConfirmedDrawer}>
                    Confirmado?
                  </button>
                ) : (
                  <h1>
                    <button type="button" onClick={handleGuestConfirmedDrawer}>
                      {guestConfirmedMessage}
                    </button>
                  </h1>
                )}
                {wpUserName === '' ? (
                  <button
                    type="button"
                    onClick={() => setWpUserQuestionDrawer(true)}
                  >
                    Convidado Weplan ?
                  </button>
                ) : (
                  <h1>
                    <button
                      type="button"
                      onClick={() => setWpUserQuestionDrawer(true)}
                    >
                      {wpUserName}
                    </button>
                  </h1>
                )}
              </div>

              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddGuestDrawer>
          </Form>
        </WindowContainer>
      )}
      {editGuestDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setEditGuestDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleEditGuest}>
            <AddGuestDrawer>
              <h1>Editar Convidado</h1>

              {!updated_guest.weplanUser && (
                <>
                  <Input
                    defaultValue={updated_guest.first_name}
                    name="first_name"
                    type="text"
                    placeholder="Nome"
                  />
                  <Input
                    defaultValue={updated_guest.last_name}
                    name="last_name"
                    type="text"
                    placeholder="Sobrenome"
                  />
                </>
              )}
              <Input
                defaultValue={updated_guest.description}
                name="description"
                type="text"
                placeholder="Alguma descrição necessária?"
              />

              <button type="submit">
                <h3>Salvar</h3>
              </button>

              <button type="button" onClick={handleDeleteGuest}>
                <h3>Deletar</h3>
              </button>
            </AddGuestDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!guestConfirmedDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setGuestConfirmedDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
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
        </WindowContainer>
      )}
      {!!wpUserQuestionDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setWpUserQuestionDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '20%',
            height: '90%',
            width: '60%',
          }}
        >
          <WeplanUserDrawer>
            <h1>É usuário WePlan?</h1>
            <div>
              <button
                type="button"
                onClick={() => handleWeplanUserQuestion(true)}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => handleWeplanUserQuestion(false)}
              >
                Não
              </button>
            </div>
          </WeplanUserDrawer>
        </WindowContainer>
      )}
      {!!isHiredDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setIsHiredDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <IsHiredDrawer>
            <h1>Fornecedor contratado?</h1>
            <div>
              <button type="button" onClick={() => handleIsHiredQuestion(true)}>
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
        </WindowContainer>
      )}
      {!!addPlannerDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddPlannerDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddPlanner}>
            <AddPlannerDrawer>
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
        </WindowContainer>
      )}
      {!!addOwnerDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddOwnerDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddOwner}>
            <AddOwnerDrawer>
              <h1>Adicionar Anfitrião</h1>
              {wpUserId === '' && (
                <button type="button" onClick={() => setFriendsWindow(true)}>
                  Escolher usuário
                </button>
              )}

              <Input
                name="description"
                type="text"
                placeholder="Título do Anfitrião (Noiva, Mãe da noiva, ...)"
              />
              <p>Número de convidados é opcional</p>
              <Input name="number_of_guests" type="number" defaultValue={0} />
              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddOwnerDrawer>
          </Form>
        </WindowContainer>
      )}
      {!!addMemberDrawer && (
        <WindowContainer
          onHandleCloseWindow={() => setAddMemberDrawer(false)}
          containerStyle={{
            zIndex: 10,
            top: '20%',
            left: '20%',
            height: '60%',
            width: '60%',
          }}
        >
          <Form ref={formRef} onSubmit={handleAddMember}>
            <AddMemberDrawer>
              <h1>Adicionar Membro</h1>

              {wpUserId === '' && (
                <button type="button" onClick={() => setFriendsWindow(true)}>
                  Escolher usuário
                </button>
              )}

              <p>Número de convidados é opcional</p>
              <Input name="number_of_guests" type="number" defaultValue={0} />

              <button type="submit">
                <h3>Salvar</h3>
              </button>
            </AddMemberDrawer>
          </Form>
        </WindowContainer>
      )}

      {!!membersWindow && (
        <WindowContainer
          onHandleCloseWindow={() => setMembersWindow(false)}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <MembersWindow>
            <MembersContainer>
              {members.map(eventMember => (
                <button
                  key={eventMember.id}
                  type="button"
                  onClick={() => handleMemberProfileWindow(eventMember)}
                >
                  <img
                    src={
                      eventMember.avatar === ''
                        ? avatar_placeholder
                        : eventMember.avatar
                    }
                    alt={eventMember.name}
                  />

                  <h1>{eventMember.name}</h1>
                </button>
              ))}
            </MembersContainer>
          </MembersWindow>
        </WindowContainer>
      )}
      {!!supplierCategoryWindow && (
        <WindowContainer
          onHandleCloseWindow={handleSupplierCategory}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <h1>Categoria de Fornecedores</h1>
          <MembersWindow>
            {/* 1 */}
            <MembersContainer>
              <button
                type="button"
                onClick={() => setSupplierCategory('Planning')}
              >
                <MdFolderSpecial size={50} />
                <h1>Planejamento</h1>
              </button>
              {/* 2 */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Event_Desing')}
              >
                <MdLocalFlorist size={50} />
                <h1>Decoração</h1>
              </button>
              {/* 3 */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Venue')}
              >
                <FiHome size={50} />
                <h1>Espaços e Igrejas</h1>
              </button>
              {/* </MembersContainer> */}
              {/* 4 */}
              {/* <MembersContainer> */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Catering')}
              >
                <MdLocalDining size={50} />
                <h1>Buffet, lanches e Doces</h1>
              </button>
              {/* 5 */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Film_And_Photography')}
              >
                <MdLinkedCamera size={50} />
                <h1>Fotos e Filmes</h1>
              </button>
              {/* 6 */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Entertainment_Artists')}
              >
                <FiMusic size={50} />
                <h1>Artistas e Entretenimento</h1>
              </button>
              {/* </MembersContainer> */}
              {/* 7 */}
              {/* <MembersContainer> */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Bartenders_And_Drinks')}
              >
                <MdLocalBar size={50} />
                <h1>Bar e Bebidas</h1>
              </button>
              {/* 8 */}
              <button
                type="button"
                onClick={() =>
                  setSupplierCategory('Dance_Floors_Structures_And_Lighting')
                }
              >
                <MdBuild size={50} />
                <h1>Estruturas, Cênica e Boate</h1>
              </button>
              {/* 9 */}
              <button
                type="button"
                onClick={() => setSupplierCategory('Others')}
              >
                <FiHelpCircle size={50} />
                <h1>Outros</h1>
              </button>
            </MembersContainer>
          </MembersWindow>
        </WindowContainer>
      )}
      {supplierCategoryWindow && supplierCategory !== '' && (
        <WindowContainer
          onHandleCloseWindow={handleSupplierCategory}
          containerStyle={{
            zIndex: 10,
            top: '5%',
            left: '5%',
            height: '90%',
            width: '90%',
          }}
        >
          <h1>Sub-Categoria de Fornecedores</h1>
          <MembersWindow>
            <MembersContainer>
              {supplierSubCategories.map(subCategory => (
                <button
                  key={subCategory.id}
                  type="button"
                  onClick={() =>
                    handleAddSupplierDrawer(subCategory.sub_category)
                  }
                >
                  {/* <MdFolderSpecial size={50} /> */}
                  <h1>{subCategory.sub_category}</h1>
                </button>
              ))}
            </MembersContainer>
          </MembersWindow>
        </WindowContainer>
      )}
      {!!transactionAgreementWindow && (
        <TransactionAgreementForm
          hiredSupplier={supplierInfo}
          onHandleCloseWindow={() => setTransactionAgreementWindow(false)}
          getEventSuppliers={handleGetSuppliers}
          getHiredSuppliers={handleGetHiredSuppliers}
        />
      )}
      <EventPageContent>
        {sidebar ? (
          <span>
            <button type="button" onClick={handleSideBar}>
              <FiChevronLeft size={60} />
            </button>
          </span>
        ) : (
          <button type="button" onClick={handleSideBar}>
            <FiChevronRight size={60} />
          </button>
        )}

        {sidebar && (
          <SideBar>
            <MyEvents>
              <MyEventsDrawerButton
                type="button"
                onClick={handleMyEventsDrawer}
              >
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
            <button type="button" onClick={handleLatestActionsSection}>
              Últimas Atualizações
            </button>
            <button type="button" onClick={handleMessagesSection}>
              Mensagens
            </button>
            <button type="button" onClick={handleAddPlannerDrawer}>
              <h1>Cerimonialistas</h1>
              <MdPersonAdd size={24} />
            </button>

            {planners.map(planner => (
              <span key={planner.id}>
                <button type="button">
                  <h2>{planner.name}</h2>
                </button>
              </span>
            ))}

            <button type="button" onClick={handleAddOwnerDrawer}>
              <h1>Anfitriões: {numberOfOwners}</h1>
              <MdPersonAdd size={24} />
            </button>

            {owners.map(eventOwner => (
              <span key={eventOwner.id}>
                <button
                  type="button"
                  onClick={() => handleOwnerProfileWindow(eventOwner)}
                >
                  <h2>{eventOwner.name}</h2>
                </button>
              </span>
            ))}

            <button type="button" onClick={handleAddMemberDrawer}>
              <h1>Membros: {numberOfMembers}</h1>
              <MdPersonAdd size={24} />
            </button>

            <span>
              <button type="button" onClick={handleMembersWindow}>
                <h2>Visualizar</h2>
              </button>
            </span>
          </SideBar>
        )}
        <Main>
          {firstRow ? (
            <span>
              <button type="button" onClick={handleFirstRow}>
                <FiChevronUp size={60} />
              </button>
            </span>
          ) : (
            <button type="button" onClick={handleFirstRow}>
              <FiChevronDown size={60} />
            </button>
          )}
          {!!firstRow && (
            <FirstRow>
              <div>
                <button type="button" onClick={handleGuestsSection}>
                  <h2>Convidados</h2>
                  <p>
                    {confirmedGuests}/{eventGuests.length}
                  </p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleBudgetDrawer}>
                  <h2>Orçamento</h2>
                  <p>R$ {eventInfo.budget ? eventInfo.budget : ''}</p>
                </button>
              </div>
              <div>
                <button type="button" onClick={handleSupplierSection}>
                  <h2>Fornecedores</h2>
                  <p>
                    {hiredSuppliers.length}/
                    {selectedSuppliers.length + hiredSuppliers.length}
                  </p>
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
                    {resolvedCheckListItems}/{checkListItems.length}
                  </p>
                </button>
              </div>
            </FirstRow>
          )}
          {!!budgetDrawer && (
            <WindowContainer
              onHandleCloseWindow={() => setBudgetDrawer(false)}
              containerStyle={{
                zIndex: 10,
                top: '30%',
                left: '40%',
                height: '40%',
                width: '30%',
              }}
            >
              <Form ref={formRef} onSubmit={handleEditBudget}>
                <BudgetDrawer>
                  <span>
                    <h2>Novo Orçamento</h2>

                    <Input
                      name="budget"
                      placeholder="Orçamento"
                      defaultValue={eventInfo.budget}
                      type="text"
                    />

                    <button type="submit">
                      <h3>Salvar</h3>
                    </button>
                  </span>
                </BudgetDrawer>
              </Form>
            </WindowContainer>
          )}
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
            <BooleanSection>
              <h1>Fornecedores</h1>
              <span>
                <BooleanNavigationButton
                  booleanActiveButton={hiredSuppliersSection}
                  type="button"
                  onClick={() => handleHiredSuppliersSection(true)}
                >
                  Selecionados
                </BooleanNavigationButton>

                <BooleanNavigationButton
                  type="button"
                  onClick={() => handleHiredSuppliersSection(false)}
                  booleanActiveButton={!hiredSuppliersSection}
                >
                  Contratados
                </BooleanNavigationButton>

                <span>
                  <button type="button" onClick={handleSupplierCategory}>
                    <MdPersonAdd size={30} />
                  </button>
                </span>
              </span>

              {!hiredSuppliersSection && <h3>{hiredSuppliers.length}</h3>}

              {hiredSuppliersSection && <h3>{selectedSuppliers.length}</h3>}

              <div>
                {hiredSuppliersSection &&
                  selectedSuppliers.map(sSupplier => {
                    supplierCount += 1;

                    return (
                      <Guest key={sSupplier.id}>
                        <span>
                          <p>{supplierCount}</p>
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectedSupplierWindow(sSupplier)}
                          >
                            <strong>{sSupplier.name}</strong>{' '}
                            <FiEdit3 size={16} />
                          </button>
                        </span>

                        {/* {sSupplier.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )} */}

                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCreateTransactionWindow(sSupplier)}
                          >
                            {sSupplier.isHired ? (
                              <FiCheckSquare size={24} />
                            ) : (
                              <FiSquare size={24} />
                            )}
                          </button>
                        </div>
                      </Guest>
                    );
                  })}

                {!hiredSuppliersSection &&
                  hiredSuppliers.map(hSupplier => {
                    hiredSupplierCount += 1;
                    return (
                      <Guest key={hSupplier.id}>
                        <span>
                          <p>{hiredSupplierCount}</p>
                          <button
                            type="button"
                            onClick={() => handleHiredSupplierWindow(hSupplier)}
                          >
                            <strong>{hSupplier.name}</strong>{' '}
                            <FiChevronRight size={16} />
                          </button>
                        </span>
                        {/* {hSupplier.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )} */}
                      </Guest>
                    );
                  })}
              </div>
            </BooleanSection>
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
                    <button type="button">
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
            <BooleanSection>
              <span>
                <BooleanNavigationButton
                  booleanActiveButton={guestWindow}
                  type="button"
                  onClick={() => handleGuestWindow(true)}
                >
                  Convidados da Festa
                </BooleanNavigationButton>

                <BooleanNavigationButton
                  type="button"
                  onClick={() => handleGuestWindow(false)}
                  booleanActiveButton={!guestWindow}
                >
                  Meus Convidados
                </BooleanNavigationButton>

                <span>
                  <button type="button" onClick={handleAddGuestDrawer}>
                    <MdPersonAdd size={30} />
                  </button>
                </span>
              </span>

              {!guestWindow && (
                <h3>
                  {myGuestsConfirmed}/{myGuests.length}
                </h3>
              )}

              {guestWindow && (
                <h3>
                  {confirmedGuests}/{eventGuests.length}
                </h3>
              )}

              <div>
                {guestWindow &&
                  eventGuests.map(eGuest => {
                    guestCount += 1;

                    return (
                      <Guest key={eGuest.id}>
                        <span>
                          <p>{guestCount}</p>
                          {eGuest.host === user.name ? (
                            <button
                              type="button"
                              onClick={() => handleEditGuestDrawer(eGuest)}
                            >
                              <strong>{eGuest.first_name}</strong>{' '}
                              {eGuest.last_name}
                              <FiEdit3 size={16} />
                            </button>
                          ) : (
                            <NotHostGuest title={notHostMessage}>
                              <strong>{eGuest.first_name}</strong>{' '}
                              {eGuest.last_name}
                            </NotHostGuest>
                          )}
                        </span>

                        {eGuest.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )}

                        {eGuest.host === user.name ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => handleEditConfirmedGuest(eGuest)}
                            >
                              {eGuest.confirmed ? (
                                <FiCheckSquare size={24} />
                              ) : (
                                <FiSquare size={24} />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div>
                            <NotHostGuest title={notHostMessage}>
                              {eGuest.confirmed ? (
                                <FiCheckSquare size={24} />
                              ) : (
                                <FiSquare size={24} />
                              )}
                            </NotHostGuest>
                          </div>
                        )}
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
                          <button
                            type="button"
                            onClick={() => handleEditGuestDrawer(mGuest)}
                          >
                            <strong>{mGuest.first_name}</strong>{' '}
                            {mGuest.last_name}
                            <FiEdit3 size={16} />
                          </button>
                        </span>
                        {mGuest.weplanUser && (
                          <button type="button">
                            <FiUser size={24} />
                          </button>
                        )}
                        <div>
                          <button
                            key={mGuest.id}
                            type="button"
                            onClick={() => handleEditConfirmedGuest(mGuest)}
                          >
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
            </BooleanSection>
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
            <CheckList>
              <strong>Check List</strong>
              <button type="button" onClick={handleAddCheckListDrawer}>
                <MdAdd size={30} />
              </button>
              <ul>
                {checkListItems.map(item => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleEditCheckListItemWindow(item)}
                    >
                      <span>{item.name}</span>
                    </button>
                    <span>prioridade: {item.priority_level}</span>
                    <button
                      type="button"
                      onClick={() => handleEditCheckedCheckListItem(item)}
                    >
                      {item.checked ? (
                        <FiCheckSquare size={24} />
                      ) : (
                        <FiSquare size={24} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </CheckList>
          )}
        </Main>
      </EventPageContent>
    </Container>
  );
};

export default EventHostDashboard;
