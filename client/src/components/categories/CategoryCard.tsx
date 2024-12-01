import React from "react";
import styles from "./CategoryCard.module.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { Routes } from "../../routing/Routes";

export type CategoryCardProps = {
  category: string;
  icon: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
};

export const CategoryCard: React.FC<CategoryCardProps> = (categoryProps) => {
  const { category } = categoryProps;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/${category}`);
    navigate(generatePath(Routes.SearchCategoryPage, { category }));
    categoryProps.onClick();
  };

  return (
    <div
      className={`${styles.card} ${
        categoryProps.isActive ? styles.active : ""
      }`}
      onClick={handleClick}
    >
      <img
        className={styles.img}
        src={categoryProps.icon}
        alt={categoryProps.alt}
      />
      <h2 className={styles.h2}>{categoryProps.category}</h2>
    </div>
  );
};
