export type ApiService = {
  _id: string;
  heading: string;
  img: string;
  name: string;
  address: string;
  categoryTag: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {
  id: string;
  heading: string;
  img: string;
  name: string;
  address: string;
  categoryTag: string;
  createdAt: Date;
  updatedAt: Date;
};
export const mapService = (apiService: ApiService): Service => {
  return {
    id: apiService._id,
    heading: apiService.heading,
    img: apiService.img,
    name: apiService.name,
    address: apiService.address,
    categoryTag: apiService.categoryTag,
    createdAt: new Date(apiService.createdAt),
    updatedAt: new Date(apiService.updatedAt),
  };
};
