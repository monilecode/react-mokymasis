import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Topbar.module.scss";
import { Login } from "./Login";
import { Routes } from "../../routing/Routes";

const topbarLinksData = [
  { to: Routes.HomePage, text: "Home" },
  { to: Routes.ServicesPage, text: "Services" },
  { to: Routes.AboutPage, text: "About Us" },
];

export const Topbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.navBlock}>
        <Link to="/">
          <img
            className={styles.logo}
            src="/images/common/logo.svg"
            alt="logo"
          />
        </Link>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          {topbarLinksData.map(({ to, text }) => (
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={closeMenu}
            >
              {text}
            </NavLink>
          ))}
        </nav>
      </div>
      <Login />
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      {isMenuOpen && (
        <div className={styles.fullscreenMenu}>
          <button className={styles.closeButton} onClick={closeMenu}>
            &times;
          </button>
          <nav className={styles.fullscreenNav}>
            <NavLink
              to="/"
              className={styles.fullscreenLink}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={styles.fullscreenLink}
              onClick={closeMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/about"
              className={styles.fullscreenLink}
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};
