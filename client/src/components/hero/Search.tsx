import React from "react";
import styles from "./Search.module.scss";

export const Search = () => {
  return (
    <div className={styles.searchBlock}>
      <input className={styles.input}></input>
      <button className={styles.btn}>
        <img
          className={styles.img}
          src="/images/common/search.svg"
          alt="search"
        />
      </button>
    </div>
  );
};
