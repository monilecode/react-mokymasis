export type Service = {
  id: string;
  heading: string;
  images: { url: string }[];
  name: string;
  email: string;
  address: string;
  categoryTag: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export const mapService = (service: Service): Service => {
  return {
    id: service.id,
    heading: service.heading,
    images: service.images,
    name: service.name,
    email: service.email,
    address: service.address,
    categoryTag: service.categoryTag,
    description: service.description,
    createdAt: new Date(service.createdAt),
    updatedAt: new Date(service.updatedAt),
  };
};
