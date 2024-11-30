import styles from "./ServiceHeader.module.scss";
import { Service } from "../../types/ServiceType";
import { TbUpload } from "react-icons/tb";
import { FiClock } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { Button } from "../abstracts/Button";
import { GrLocation } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";

interface ServiceHeaderProps {
  service: Service;
}

export const ServiceHeader = ({ service }: ServiceHeaderProps) => {
  if (!service) {
    return <></>;
  }

  return (
    <div className={styles.serviceHeader}>
      <div className={styles.leftServiceBlock}>
        {service.images && service.images.length > 0 ? (
          <img
            className={styles.serviceImage}
            src={service.images[0].url}
            alt="service"
          />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}
        <div className={styles.serviceInfoBlock}>
          <p className={styles.category}>{service.categoryTag}</p>
          <h1 className={styles.heading}>{service.heading}</h1>
          <div className={styles.serviceAddressEmailBlock}>
            <div className={styles.serviceAddressBlock}>
              <GrLocation className={styles.addressIcon} />
              <p className={styles.address}>{service.address}</p>
            </div>
            <div className={styles.serviceEmailBlock}>
              <HiOutlineMail className={styles.emailIcon} />
              <p className={styles.email}>{service.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightServiceBlock}>
        <Button
          className={styles.uploadingBtn}
          type="button"
          variant="btnPrimary"
          btnIcon={<TbUpload className={styles.uploadIcon} />}
        />
        <div className={styles.serviceNameTimeBlock}>
          <div className={styles.serviceNameBlock}>
            <GoPerson className={styles.nameIcon} />
            <p className={styles.contactPerson}>{service.name}</p>
          </div>
          <div className={styles.serviceTimeBlock}>
            <FiClock className={styles.timeIcon} />
            <p>Available 8:00 AM to 10:PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
