import { ServiceHeader } from "../components/services/ServiceHeader";
import { useService } from "@/hooks/useService";
import { useParams } from "react-router-dom";
import styles from "./ServicePage.module.scss";
import { ServiceDescription } from "../components/services/ServiceDescription";
import { ServiceGallery } from "../components/services/ServiceGallery";
import { ServiceSimilarServices } from "../components/services/ServiceSimilarServices";
import { Button } from "@/components/abstracts/Button";
import { PiNotePencil } from "react-icons/pi";
import { useState } from "react";
import { BookingDateTime } from "@components/bookings/BookingDateTime";
import { Sidebar } from "@components/sidebar/Sidebar";

export const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, error } = useService(id || "");

  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading service</div>;
  }

  if (!service) {
    return <div>No service found</div>;
  }

  return (
    <section
      className={`container flex-row container-border-top ${styles.servicesContainer}`}
    >
      <div className={styles.serviceContainer}>
        <ServiceHeader service={service} />
        <div className={styles.serviceBody}>
          <div className={styles.serviceBodyLeftCol}>
            <ServiceDescription service={service} />
            <ServiceGallery service={service} />
          </div>
          <div className={styles.serviceBodyRightCol}>
            <Button
              className={styles.bookingBtn}
              type="button"
              text="Book Appointment"
              btnIcon={<PiNotePencil className={styles.bookingIcon} />}
              onClick={openSidebar}
            />
            <ServiceSimilarServices service={service} />
          </div>
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={closeSidebar}>
        <BookingDateTime />
      </Sidebar>
    </section>
  );
};
