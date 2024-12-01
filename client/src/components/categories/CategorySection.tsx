import React, { useEffect, useState } from "react";
import styles from "./CategorySection.module.scss";
import { CategoryCard } from "./CategoryCard";
import { useParams } from "react-router-dom";
import { Category } from "../../types/CategoryType";
import { getCategories } from "../../api/CategoriesApi";
import { useQuery } from "react-query";

export type CategorySectionProps = {
  isVertical: boolean;
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  isVertical,
}) => {
  const {
    data: categories = [],
    error,
    isLoading,
  } = useQuery<Category[]>("categories", getCategories);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <section
      className={`${styles.categorySection} ${
        isVertical ? styles.vertical : ""
      }`}
    >
      {categories.map((item) => (
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
