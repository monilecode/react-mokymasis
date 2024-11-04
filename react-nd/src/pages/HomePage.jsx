import React from "react";
import { Hero } from "../components/hero/Hero";
import { ServiceSection } from "../components/services/ServiceSection";
import styles from "../components/services/ServiceSection.module.scss";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <div class="container">
        <h3 className={styles.h3}>Popular Businesses</h3>
        <ServiceSection filterServices={false} selectedCategory={undefined} />
      </div>
    </>
  );
};
