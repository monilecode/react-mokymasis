export type Service = {
  id: number;
  img: string;
  categoryTag: string;
  heading: string;
  name: string;
  address: string;
};

export const categoryData = [
  {
    id: 1,
    category: "cleaning",
    icon: "/categories/cleaning.png",
    alt: "cleaning",
  },
  {
    id: 2,
    category: "repair",
    icon: "/src/components/categories/images/repair.png",
    alt: "repair",
  },
  {
    id: 3,
    category: "painting",
    icon: "/src/components/categories/images/painting.png",
    alt: "painting",
  },
  {
    id: 4,
    category: "shifting",
    icon: "/src/components/categories/images/shifting.png",
    alt: "shifting",
  },
  {
    id: 5,
    category: "plumbing",
    icon: "/src/components/categories/images/plumbing.png",
    alt: "plumbing",
  },
  {
    id: 6,
    category: "electric",
    icon: "/src/components/categories/images/electric.png",
    alt: "electric",
  },
];

export const serviceData: Service[] = [
  {
    id: 1,
    heading: "House Cleaning",
    img: "/src/components/services/images/1.jpg",
    name: "Žmogus Žmoginskas",
    address: "Kauno g. 23, Kaunas",
    categoryTag: "Cleaning",
  },
  {
    id: 2,
    heading: "Bathroom Cleaning",
    img: "/src/components/services/images/2.jpg",
    name: "Žmogus Žmoginskas",
    address: "Žemaiciu g. 1, Kaunas",
    categoryTag: "Cleaning",
  },
  {
    id: 3,
    heading: "Floor Cleaning",
    img: "/src/components/services/images/2.jpg",
    name: "Žmogus Žmoginskas",
    address: "Basanaiciu g. 1-3, Kaunas",
    categoryTag: "Cleaning",
  },
  {
    id: 4,
    heading: "Washing Clothes",
    img: "/src/components/services/images/4.jpg",
    name: "Žmogus Žmoginskas",
    address: "Trakų g. 19-88, Marijampolė",
    categoryTag: "Cleaning",
  },
  {
    id: 5,
    heading: "House Repairing",
    img: "/src/components/services/images/4.jpg",
    name: "Žmogus Žmoginskas",
    address: "Mažeikių g. 38-40, Vilnius",
    categoryTag: "Repair",
  },
  {
    id: 6,
    heading: "House Painting",
    img: "/src/components/services/images/1.jpg",
    name: "Žmogus Žmoginskas",
    address: "Pavilionio g. 14-66, Vilnius",
    categoryTag: "Painting",
  },
  {
    id: 7,
    heading: "Moving Services",
    img: "/src/components/services/images/1.jpg",
    name: "Žmogus Žmoginskas",
    address: "Statybų g. 20, Vilnius",
    categoryTag: "Shifting",
  },
  {
    id: 8,
    heading: "Home Plumber",
    img: "/src/components/services/images/1.jpg",
    name: "Žmogus Žmoginskas",
    address: "Piemenų g. 13, Vilnius",
    categoryTag: "Plumbing",
  },
];
