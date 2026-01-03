"use client";

import clsx from "clsx";
import { Toaster } from "react-hot-toast";
import { useIsRootClient } from "../_hooks/useIsRootClient";

export default function ToasterProvider() {
  const isRoot = useIsRootClient();

  return (
    <Toaster
      position="bottom-center"
      gutter={12}
      containerStyle={{
        margin: "8px",
      }}
      toastOptions={{
        className: clsx(
          "!bg-gray-100 !text-gray-800 !font-medium leading-[1.3] !border !border-gray-300 [&>div]:!my-0",
          {
            "dark:!bg-gray-700 dark:!text-gray-200 !text-base dark:!border-gray-600":
              !isRoot,
            "": isRoot,
          },
        ),
        success: {
          duration: 3000,
        },
        error: {
          duration: 10000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "13px 16px",
          zIndex: 3,
        },
      }}
    />
  );
}
