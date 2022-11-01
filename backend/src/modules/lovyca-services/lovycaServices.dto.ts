export type servicesDTO = {
  name: String;
  price: Number;
  category: 'ELÉTRICA' | 'HIDRÁULICA' | 'CIVIL';
  warranty: Number;
  description?: String;
  uid: String;
};
