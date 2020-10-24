interface IUserEmployee {
  id: string;
  name: string;
}
interface ICompany {
  id: string;
  name: string;
  avatar_url: string;
}

interface IModulesDTO {
  management_module_id: string;
  access_level: number;
}

interface IEmployeeConfirmationDTO {
  request_message: string;
  isConfirmed: boolean;
  salary: number;
}

export default interface IEmployeeDTO {
  id: string;
  position: string;
  employee: IUserEmployee;
  company: ICompany;
  modules: IModulesDTO[];
  confirmation: IEmployeeConfirmationDTO;
}
