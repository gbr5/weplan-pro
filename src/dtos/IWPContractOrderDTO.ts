import IUserDTO from './IUserDTO';

interface IWPProduct {
  id: string;
  name: string;
  target_audience: string;
  price: string;
}

interface IOrderProduct {
  id: string;
  weplanProduct: IWPProduct;
  quantity: number;
  price: string;
}

export default interface IWPContractOrderDTO {
  id: string;
  created_at: Date;
  customer: IUserDTO;
  products: IOrderProduct[];
}
