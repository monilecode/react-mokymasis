import styles from "./ServiceGallery.module.scss";
import { Service } from "../../types/ServiceType";

interface ServiceGalleryProps {
  service: Service;
}

export const ServiceGallery = ({ service }: ServiceGalleryProps) => {
  if (!service || !service.images || service.images.length === 0) {
    return <div className={styles.noImage}>No Images Available</div>; //
  }

  return (
    <div className={styles.serviceGallery}>
      <h2 className={styles.galleryTitle}>Gallery</h2>
      <div className={styles.galleryImagesBlock}>
        {service.images.map((image, index) => (
          <img
            className={styles.galleryImage}
            key={index}
            src={image.url}
            alt={`${service.name} image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
