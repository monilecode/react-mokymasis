import styles from "./ServiceDescription.module.scss";
import { Service } from "../../types/ServiceType";

interface ServiceDescriptionProps {
  service: Service;
}

export const ServiceDescription = ({ service }: ServiceDescriptionProps) => {
  if (!service) {
    return <></>;
  }

  return (
    <div className={styles.serviceDescription}>
      <h2 className={styles.descriptionTitle}>Description</h2>
      <p className={styles.description}>{service.description}</p>
    </div>
  );
};
