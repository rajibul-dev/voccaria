"use client";

import type { ReactNode } from "react";
import {
  analytics,
  type ExternalDestination,
  type ExternalLinkSource,
} from "@/_libs/analytics";

interface TrackedExternalLinkProps {
  href: string;
  destination: ExternalDestination;
  sourceSection: ExternalLinkSource;
  children: ReactNode;
  className?: string;
}

export default function TrackedExternalLink({
  href,
  destination,
  sourceSection,
  children,
  className,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => analytics.externalLinkClicked(destination, sourceSection)}
    >
      {children}
    </a>
  );
}
