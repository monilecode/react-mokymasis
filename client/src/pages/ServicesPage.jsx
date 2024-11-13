import React from "react";
import { useParams } from "react-router-dom";
import { CategorySection } from "../components/categories/CategorySection";
import { ServiceSection } from "../components/services/ServiceSection";
import styles from "./ServicesPage.module.scss";

export const ServicesPage = () => {
  const { category } = useParams();

  return (
    <section
      className={`container flex-row container-border-top ${styles.servicesContainer}`}
    >
      <CategorySection isVertical={true} />
      <ServiceSection filterServices={false} selectedCategory={category} />
    </section>
  );
};
