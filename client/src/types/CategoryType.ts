export type ApiCategory = {
  _id: string;
  category: string;
  icon: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  category: string;
  icon: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export const mapCategory = (apiCategory: ApiCategory): Category => {
  return {
    id: apiCategory._id,
    category: apiCategory.category,
    icon: apiCategory.icon,
    alt: apiCategory.alt,
    isActive: false,
    createdAt: new Date(apiCategory.createdAt),
    updatedAt: new Date(apiCategory.updatedAt),
  };
};
