// AccountMenu.tsx
"use client";

import { useEffect, useState } from "react";
import SimpleAccountMenu from "./SimpleAccountMenu";

// Dynamic import with fallback
let Popover: any = null;
let usePopoverManager: any = null;
let importError = false;

try {
  const PopoverModule = require("./Popover");
  Popover = PopoverModule.default;
  usePopoverManager = PopoverModule.usePopoverManager;
} catch (error) {
  console.warn("Popover import failed, using fallback:", error);
  importError = true;
}

export default function AccountMenu() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always use fallback for now to avoid hook conditional calls
  // This can be improved later with a proper implementation that doesn't conditionally call hooks
  if (!mounted || importError) {
    return <SimpleAccountMenu />;
  }

  return <SimpleAccountMenu />;
}
