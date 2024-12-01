import React from "react";
import styles from "./ServiceCard.module.scss";
import { Button } from "@components/abstracts/Button";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export type ServiceCardProps = {
  id: string;
  images: { url: string }[];
  categoryTag: string;
  heading: string;
  name: string;
  address: string;
  className?: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = (
  serviceProps: ServiceCardProps
) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/services/${serviceProps.id}`);
  };

  const [favourites, setFavourites] = useLocalStorage<string[]>(
    "favourites",
    []
  );
  const isFavourite = favourites.includes(serviceProps.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      setFavourites(favourites.filter((favId) => favId !== serviceProps.id));
    } else {
      setFavourites([...favourites, serviceProps.id]);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <span className={styles.favouriteIcon} onClick={toggleFavourite}>
          <svg
            className={
              isFavourite ? styles.favouriteSelected : styles.favouriteEmpty
            }
            version="1.0"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="72px"
            height="72px"
            viewBox="-1.92 -1.92 67.84 67.84"
            enableBackground="new 0 0 64 64"
            xmlSpace="preserve"
            fill={isFavourite ? "#ffe11f" : "#14373e"}
            stroke={isFavourite ? "#ffe11f" : "#14373e"}
            strokeWidth="2.56"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                fill={isFavourite ? "#ffe11f" : "#ffffff"}
                d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"
              />
            </g>
          </svg>
        </span>
        {serviceProps.images && serviceProps.images.length > 0 ? (
          <img
            className={styles.img}
            src={serviceProps.images[0].url}
            alt={serviceProps.name}
          />
        ) : (
          <div className={styles.noImage}>No Image Available</div>
        )}
      </div>
      <div className={styles.textBox}>
        <p className={styles.categoryTag}>{serviceProps.categoryTag}</p>
        <h2 className={styles.h2}>{serviceProps.heading}</h2>
        <p className={styles.name}>{serviceProps.name}</p>
        <p className={styles.address}>{serviceProps.address}</p>
        <Button
          className={styles.btn}
          text="Book now"
          type={"button"}
          onClick={handleBookNow}
        />
      </div>
    </div>
  );
};
