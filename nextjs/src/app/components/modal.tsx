"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

// styles
import styles from "./modal.module.css";
import crossIcon from "../../../public/close.svg";
import Image from "next/image";

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps>({
  openName: "",
  close: () => {},
  open: () => {},
});

interface ModalProps {
  children: React.ReactNode;
}

interface OpenProps {
  children: React.ReactElement;
  opens: string;
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
  heading: string;
}

const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FC<OpenProps> = ({ children, opens: windowOpenName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowOpenName) });
};

const Window: React.FC<WindowProps> = ({ children, name, heading }) => {
  const { openName, close } = useContext(ModalContext);
  const ref: any = useOutsideClick(close);

  // escape to cancel
  useEffect(
    function () {
      function escapeKeyPress(e: any) {
        if (e.key === "Escape") {
          close();
        }
      }
      document.addEventListener("keydown", escapeKeyPress);
      return () => {
        document.removeEventListener("keydown", escapeKeyPress, true);
      };
    },
    [close],
  );

  // disable body scroll when modal open
  useEffect(() => {
    if (openName === name) {
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [openName, name]);

  const isActive = openName === name;

  if (!isActive) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={styles.popup}
        ref={ref}
      >
        <header className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <Image
            onClick={close}
            className={styles.crossIcon}
            alt="close icon"
            src={crossIcon}
            placeholder="blur"
            blurDataURL="../../../public/close.svg"
          />
        </header>
        <main className={styles.main}>
          {cloneElement(children, { onCloseModal: close })}
        </main>
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
