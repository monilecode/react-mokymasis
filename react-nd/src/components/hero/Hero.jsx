import React from "react";
import { Search } from "./Search";
import styles from "./Hero.module.scss";
import { CategorySection } from "../categories/CategorySection";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="styles.heroContent">
        <h1 className={styles.h1}>
          Find Home <span>Service/Repair</span> <br /> Near You
        </h1>
        <h3>Explore Best Home Service & Repair near you</h3>
        <Search />
        <CategorySection />
      </div>
    </section>
  );
};
