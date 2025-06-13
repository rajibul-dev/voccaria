"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../_hooks/useOutsideClick";

// styles
import styles from "./modal.module.css";

// icons
import CrossIcon from "/public/close.svg";

// components
import Overlay from "./overlay";

interface ModalContextProps {
  openName: string;
  openModalOverlay: boolean;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps>({
  openName: "",
  openModalOverlay: false,
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
  children: React.ReactElement<any>;
  name: string;
  heading: any;
}

const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const [openModalOverlay, setOpenModalOverlay] = useState(false);

  const open = (name: string) => {
    setOpenName(name);
    setOpenModalOverlay(true);
  };
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, close, open, openModalOverlay }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FC<OpenProps> = ({ children, opens: windowOpenName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children as React.ReactElement<any>, {
    onClick: () => open(windowOpenName),
  });
};

const Window: React.FC<WindowProps> = ({ children, name, heading }) => {
  const { openName, openModalOverlay, close } = useContext(ModalContext);
  const ref: any = useOutsideClick(close);
  const [showCloseIcon, setShowCloseIcon] = useState(true);

  // escape to cancel
  useEffect(
    function () {
      function escapeKeyPress(e: any) {
        if (e.key === "Escape") {
          close();
        }
      }
      document?.addEventListener("keydown", escapeKeyPress);
      return () => {
        document?.removeEventListener("keydown", escapeKeyPress, true);
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
    <Overlay isOpen={openModalOverlay}>
      <div className={styles.popup} ref={ref}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          {showCloseIcon && (
            <CrossIcon onClick={close} className={styles.crossIcon} />
          )}
        </header>
        <main className={styles.main}>
          {cloneElement(children, { onCloseModal: close, setShowCloseIcon })}
        </main>
      </div>
    </Overlay>,
    document?.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
