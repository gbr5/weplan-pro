import IUserDTO from './IUserDTO';

interface IProductDTO {
  name: string;
  product_id: string;
  order_product_id: string;
  quantity: number;
  price: string;
}

export default interface IWPContractOrderDTO {
  id: string;
  created_at: Date;
  customer: IUserDTO;
  products: IProductDTO[];
}
