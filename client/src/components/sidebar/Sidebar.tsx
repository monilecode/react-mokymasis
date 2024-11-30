import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import styles from "./Sidebar.module.scss";

type SidebarProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose, children }: SidebarProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Sidebar Modal"
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      appElement={document.getElementById("root") as HTMLElement}
    >
      <div className={styles.sidebarContainer}>
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};
