import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true,
) {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(handler); // Store handler in a ref to avoid re-renders

  useEffect(() => {
    handlerRef.current = handler; // Always use the latest handler without re-running effect
  }, [handler]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handlerRef.current(); // Call the latest handler
    };

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [listenCapturing]); // ✅ No re-renders when `handler` changes!

  return ref;
}
