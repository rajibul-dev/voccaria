import { createContext, useContext, useState } from "react";

interface HamburgerMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const HamburgerContext = createContext<HamburgerMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function HamburgerMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HamburgerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HamburgerContext.Provider>
  );
}

export function useHamburgerMenu() {
  const context = useContext(HamburgerContext);

  if (context === undefined)
    throw new Error(
      "useHamburgerMenu must be used within a HamburgerMenuProvider",
    );

  return context;
}
