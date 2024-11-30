import React from "react";
import styles from "./ServiceSection.module.scss";
import { ServiceCard } from "./ServiceCard";
import { getServices } from "../../api/ServicesApi";
import { Service } from "../../types/ServiceType";
import { useQuery } from "react-query";

type ServiceSectionProps = {
  selectedCategory: string;
  filterServices: boolean;
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  selectedCategory,
  filterServices,
}) => {
  const {
    data: services = [],
    error,
    isLoading,
  } = useQuery<Service[]>("services", getServices);

  const filteredServices = filterServices
    ? services.filter(
        (service) =>
          service.categoryTag.toLowerCase() === selectedCategory.toLowerCase()
      )
    : services;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading services</div>;
  }

  return (
    <section className={styles.serviceSection}>
      <div className={styles.serviceContent}>
        {filteredServices.length > 0 ? (
          filteredServices.map((item: Service) => (
            <ServiceCard
              className={styles.card}
              key={item.id}
              id={item.id}
              images={item.images}
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
