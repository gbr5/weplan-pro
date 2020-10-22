interface IUserEmployee {
  id: string;
  name: string;
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
  modules: IModulesDTO[];
  confirmation: IEmployeeConfirmationDTO;
}
