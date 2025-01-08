import { useEffect, useRef } from "react";

export default function useOutsideClick(handler: any, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e: any) {
        if (ref.current && !(ref.current as Element).contains(e.target))
          handler();
      }

      document?.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document?.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
