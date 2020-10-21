interface IUserEmployee {
  id: string;
  name: string;
}

export default interface IEmployeeDTO {
  id: string;
  position: string;
  employee: IUserEmployee;
}
