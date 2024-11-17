import React, { useEffect, useState } from "react";
import styles from "./CategorySection.module.scss";
import { CategoryCard } from "./CategoryCard";
import { categoryData } from "@data/Data";
import { useParams } from "react-router-dom";

type CategorySectionProps = {
  isVertical: boolean;
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  isVertical,
}) => {
  const { category } = useParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || null
  );

  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section
      className={`${styles.categorySection} ${
        isVertical ? styles.vertical : ""
      }`}
    >
      {categoryData.map((item) => (
        <CategoryCard
          key={item.id}
          category={item.category}
          icon={item.icon}
          alt={item.alt}
          isActive={activeCategory === item.category}
          onClick={() => handleCategoryClick(item.category)}
        />
      ))}
    </section>
  );
};
