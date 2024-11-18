import React, { useEffect, useState } from "react";
import styles from "./ServiceSection.module.scss";
import { ServiceCard } from "./ServiceCard";
import { getServices } from "../../api/ServicesApi";
import { Service } from "../../types/ServiceType";

type ServiceSectionProps = {
  selectedCategory: string;
  filterServices: boolean;
};

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  selectedCategory,
  filterServices,
}) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  const filteredServices = filterServices
    ? services.filter(
        (service) =>
          service.categoryTag.toLowerCase() === selectedCategory.toLowerCase()
      )
    : services;

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
