interface GraphQLContext {
  discounts: {
    available: Offer[];
    selected: Offer[];
  };
  coverages: {
    available: Offer[];
    selected: Offer[];
  };
  cities: City[];
  selectCity: (id: string) => void;
  toggleOffer: (id: string) => void;
  resetReceipt: () => void;
  updateReceipt: () => void;
  postUserData: () => void;
  updateUserData: () => void;
}

interface UserContext {
  data: User;
  prevData: User;
  receipt: Receipt;
  setUserField: (id: string, value: string | boolean | number | Date) => void;
  setUserData: (_user: User) => void;
  setReceipt: (_receipt: Receipt) => void;
}

interface FormField {
  type?: string;
  label?: string;
  usedFor: string;
  placeholder?: string;
  checked?: boolean;
  value?: string | number | Date;
  width?: string;
  required?: boolean;
  dataOptions?: {
    _id: string;
    option: string;
    value: float;
    selected: boolean;
  }[];
  handleChange?: () => void;
}

type User = {
  _id?: string;
  username: string;
  birthdate: Date;
  city?: City;
  vehiclepower: number;
  voucher: number;
};

type Receipt = {
  base_price: Float;
  coverages: { id: string; value: Float; description: string }[];
  discounts: { id: string; value: Float; description: string }[];
  surcharge: Float;
  voucher: Float;
  total_price: Float;
};

interface InteliCheck {
  available: Offer[];
  selected: Offer[];
}

type Offer = {
  _id: string;
  name?: string;
  type?: string;
  value?: number;
  value_alt?: number;
  fixed_price?: float;
  condition?: string;
  selected?: boolean;
  available?: boolean;
};

type OfferInput = {
  type?: string;
  value?: float;
  name?: string;
  value?: number;
  value_alt?: number;
  selected?: boolean;
  available?: boolean;
  condition?: string;
  fixed_price?: float;
};

type City = {
  _id: string;
  option: string;
  value: float;
  selected: boolean;
};
