export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  rolesIds: string[];
  roles: Role[];
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};
