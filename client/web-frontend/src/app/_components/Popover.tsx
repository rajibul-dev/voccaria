"use client";

import React, { ReactNode, MutableRefObject } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  Placement,
} from "@floating-ui/react";
import useOutsideClick from "../_hooks/useOutsideClick";
import { createContext, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";

// --- Portal implementation for Next.js (client-side only) ---
const Portal: React.FC<{
  children: ReactNode;
  container?: HTMLElement | null;
}> = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return typeof window !== "undefined"
    ? (ReactDOM.createPortal(
        children,
        container || document.body,
      ) as React.ReactPortal)
    : null;
};

// --- Contexts ---
type PopoverManagerContextType = {
  openId: string | null;
  close: () => void;
  open: (id: string) => void;
};
const PopoverManagerContext = createContext<
  PopoverManagerContextType | undefined
>(undefined);

export const PopoverManagerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <PopoverManagerContext.Provider value={{ openId, close, open }}>
      {children}
    </PopoverManagerContext.Provider>
  );
};

export const usePopoverManager = () => {
  const ctx = useContext(PopoverManagerContext);
  if (!ctx)
    throw new Error(
      "usePopoverManager must be used within PopoverManagerProvider",
    );
  return ctx;
};

type PopoverContextType = {
  openId: string | null;
  close: () => void;
  open: (id: string) => void;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  arrowRef: (node: HTMLElement | null) => void;
  selected: boolean;
  setSelected: (v: boolean) => void;
  triggerType?: "boolean" | "hover" | "click" | "both";
  noBox?: boolean;
  placement?: Placement;
  fixed?: boolean;
  container?: HTMLElement | null;
};
const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

// --- Popover Root ---
type PopoverProps = {
  children: ReactNode;
  placementX?: "center" | "start" | "end";
  placementY?: "top" | "bottom" | "left" | "right";
  triggerType?: "boolean" | "hover" | "click" | "both";
  noBox?: boolean;
  fixed?: boolean;
  disablePortal?: boolean;
};

const getPlacement = (
  placementY: PopoverProps["placementY"],
  placementX: PopoverProps["placementX"],
): Placement => {
  let y = placementY ?? "bottom";
  let x = placementX ?? "center";
  let placement: Placement = y;
  if (x === "start") placement = `${y}-start` as Placement;
  else if (x === "end") placement = `${y}-end` as Placement;
  return placement;
};

const Popover: React.FC<PopoverProps> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
} = ({ children, placementX, placementY, triggerType, noBox, fixed }) => {
  const { openId, close, open } = usePopoverManager();
  const [selected, setSelected] = useState(false);

  const [arrowEl, setArrowEl] = useState<HTMLElement | null>(null);

  const { refs, floatingStyles, placement } = useFloating({
    placement: getPlacement(placementY, placementX),
    strategy: fixed ? "fixed" : "absolute",
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 15 }),
      arrowEl ? arrow({ element: arrowEl, padding: 5 }) : undefined,
    ].filter(Boolean),
  });

  return (
    <PopoverContext.Provider
      value={{
        openId,
        close,
        open,
        setReference: refs.setReference,
        setFloating: refs.setFloating,
        floatingStyles,
        arrowRef: setArrowEl,
        selected,
        setSelected,
        triggerType,
        noBox,
        placement,
        fixed,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

// --- Trigger ---
type TriggerProps = {
  children: React.ReactElement;
  id: string;
  state?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function Trigger({ children, id, state, ...props }: TriggerProps) {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover.Trigger must be used within Popover");

  const {
    openId,
    close,
    open,
    setReference,
    selected,
    setSelected,
    triggerType,
  } = ctx;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (triggerType === "both" && !selected) {
      setSelected(true);
      open(id);
      return;
    }

    if (openId === id) {
      setSelected(false);
      close();
    } else {
      open(id);
    }
  }

  const handleMouseEnter = () => {
    open(id);
  };

  const handleMouseLeave = () => {
    if (selected) return;
    close();
  };

  useEffect(() => {
    if (triggerType === "boolean" && state !== undefined) {
      state ? open(id) : close();
    }
  }, [state, triggerType, id, open, close]);

  const clonedChild = React.cloneElement(children as React.ReactElement<any>, {
    onClick:
      triggerType === "click" || triggerType === "both"
        ? handleClick
        : undefined,
    onMouseEnter:
      triggerType === "hover" || triggerType === "both"
        ? handleMouseEnter
        : undefined,
    onMouseLeave:
      triggerType === "hover" || triggerType === "both"
        ? handleMouseLeave
        : undefined,
  });

  return (
    <div
      ref={setReference}
      style={{ position: "relative", height: "100%" }}
      {...props}
    >
      {clonedChild}
    </div>
  );
}

// --- Content ---
type ContentProps = {
  children: ReactNode;
  id: string;
  isTopOfHeader?: boolean;
  container?: HTMLElement | null;
};

function Content({
  children,
  id,
  isTopOfHeader,
  disablePortal,
  container,
}: ContentProps & { disablePortal?: boolean }) {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover.Content must be used within Popover");

  const {
    openId,
    setFloating,
    floatingStyles,
    arrowRef,
    close,
    selected,
    setSelected,
    triggerType,
    noBox,
    fixed,
  } = ctx;

  function outsideClickHandler() {
    close();
    setSelected(false);
  }

  const outsideClickRef = useOutsideClick(outsideClickHandler, false);

  if (openId !== id) return null;

  const popoverContent = (
    <div
      ref={(node) => {
        if (triggerType === "hover") return;
        if (triggerType === "both" && !selected) return;
        (outsideClickRef as MutableRefObject<HTMLElement | null>).current =
          node;
      }}
    >
      <div
        ref={setFloating}
        style={{
          ...floatingStyles,
          position: fixed ? "fixed" : "absolute",
          display: "inline-block",
          backgroundColor: noBox ? undefined : "var(--color-grey-100)",
          padding: noBox ? undefined : "2rem",
          border: noBox ? undefined : "var(--usual-layout-border)",
          boxShadow: "var(--box-shadow-lg)",
          zIndex: 1000,
        }}
      >
        {children}
        <div
          ref={arrowRef}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            background: "inherit",
          }}
        />
      </div>
    </div>
  );

  return disablePortal ? (
    popoverContent
  ) : (
    <Portal container={container}>{popoverContent}</Portal>
  );
}

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;

/*
Usage:

<Popover placementX="center" placementY="top" triggerType="hover">
  <Popover.Trigger id="example">
    <Button>Open</Button>
  </Popover.Trigger>
  <Popover.Content id="example">
    This is right in the middle
  </Popover.Content>
</Popover>

// triggerType can be 'boolean', 'hover', 'click', 'both'
// placementX can be 'center', 'start', 'end'
// placementY can be 'top', 'bottom', 'left', 'right'
// fixed can be passed to use 'position: fixed' instead of 'absolute'
*/
