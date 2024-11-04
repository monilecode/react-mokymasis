import React from "react";
import styles from "./CategoryCard.module.scss";
import { useNavigate } from "react-router-dom";

export const CategoryCard = (categoryProps) => {
  const { category } = categoryProps;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/${category}`);
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
