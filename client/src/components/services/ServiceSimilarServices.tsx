import styles from "./ServiceSimilarServices.module.scss";
import { Service } from "../../types/ServiceType";

interface ServiceSimilarServicesProps {
  service: Service;
}

export const ServiceSimilarServices = ({
  service,
}: ServiceSimilarServicesProps) => {
  if (!service) {
    return <></>;
  }

  return (
    <div className={styles.serviceSimilarServices}>
      <h2 className={styles.title}>Similar Services</h2>
      <div className={styles.similarServiceContainer}>
        {service.images && service.images.length > 0 ? ( // Highlighted check for images array
          <>
            <div className={styles.serviceSimilarBlock}>
              <img
                src={service.images[0].url}
                alt="Service"
                className={styles.similarImage}
              />
              <div className={styles.serviceSimilarInfo}>
                <h3 className={styles.name}>{service.heading}</h3>
                <p className={styles.contactPerson}>{service.name}</p>
                <p className={styles.address}>{service.address}</p>
              </div>
            </div>
            <div className={styles.serviceSimilarBlock}>
              <img
                src={service.images[0].url}
                alt="Service"
                className={styles.similarImage}
              />
              <div className={styles.serviceSimilarInfo}>
                <h3 className={styles.name}>{service.heading}</h3>
                <p className={styles.contactPerson}>{service.name}</p>
                <p className={styles.address}>{service.address}</p>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}
      </div>
    </div>
  );
};
