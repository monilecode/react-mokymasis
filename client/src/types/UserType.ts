export type ApiUser = {
  _id: string;
  name: string;
  age: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  age: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const mapUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser._id,
    name: apiUser.name,
    age: apiUser.age,
    email: apiUser.email,
    createdAt: new Date(apiUser.createdAt),
    updatedAt: new Date(apiUser.updatedAt),
  };
};
