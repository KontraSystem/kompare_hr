interface Args<T> {
  [key: string]: T;
}
interface City {
  _id: ObjectId;
  option: string;
  value: number;
  selected: boolean;
}

interface CitiesService {
  getCities(): Promise<City[]>;
  updateCity(): Promise<City>;
}

interface Offer {
  _id: ObjectId;
  name: string;
  type: string;
  value?: number;
  value_alt?: number;
  fixed_price?: boolean;
  condition: string;
  selected: boolean;
  available: boolean;
}

interface User {
  _id?: ObjectId;
  username: string;
  birthdate: Date;
  city: City;
  vehiclepower: number;
  voucher: number;
}

interface OfferFilter {
  filter: Offer;
}

type Receipt = {
  base_price: number;
  coverages?: {
    id: string;
    value: number;
    description: string;
  }[];
  discounts?: {
    id: string;
    value: number;
    description: string;
  }[];
  surcharge?: number;
  total_price: number;
  voucher?: number;
};

type ReceiptInput = {
  user: User;
  coverages: Offer[];
  discounts: Offer[];
};
