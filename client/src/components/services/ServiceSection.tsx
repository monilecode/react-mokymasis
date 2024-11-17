import React from "react";
import styles from "./ServiceSection.module.scss";
import { ServiceCard } from "./ServiceCard";
import { serviceData, Service } from "@data/Data";

type ServiceSectionProps = {
  selectedCategory: string;
  filterServices: boolean;
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  selectedCategory,
  filterServices,
}) => {
  const filteredServices = filterServices
    ? serviceData.filter(
        (service) =>
          service.categoryTag.toLowerCase() === selectedCategory.toLowerCase()
      )
    : serviceData;

  return (
    <section className={styles.serviceSection}>
      <div className={styles.serviceContent}>
        {filteredServices.length > 0 ? (
          filteredServices.map((item: Service) => (
            <ServiceCard
              className={styles.card}
              key={item.id}
              id={item.id}
              img={item.img}
              heading={item.heading}
              name={item.name}
              address={item.address}
              categoryTag={item.categoryTag}
            />
          ))
        ) : (
          <p>No services found</p>
        )}
      </div>
    </section>
  );
};
