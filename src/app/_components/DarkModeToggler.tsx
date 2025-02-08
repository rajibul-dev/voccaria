import { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";

type Theme = "dark" | "light" | null;

export default function DarkModeToggler() {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else if (localStorage.getItem("theme") === "light") {
      setTheme("light");
    } else {
      setTheme("light");
    }
  }, []);

  function toggleDarkMode() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <li
      onClick={toggleDarkMode}
      className="*:fill-slate-600 *:dark:fill-slate-200 *:transition-colors cursor-pointer *:w-7 *:h-7 px-2 py-1.5 hover:bg-slate-100 hover:dark:bg-slate-700 transition-colors rounded-sm *:max-sm:w-6 *:-max-sm:h-6"
    >
      {theme === "light" ? <IoMoon /> : <MdLightMode />}
    </li>
  );
}
