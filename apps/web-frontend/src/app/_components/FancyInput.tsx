"use client";

import { useState } from "react";
import clsx from "clsx";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function FancyInput({
  children,
  value = "",
  onChange = () => {},
  labelClassName = "",
  inputClassName = "",
  name = "",
  isPassword = false,
  ...props
}: {
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  labelClassName?: string;
  inputClassName?: string;
  name?: string;
  isPassword?: boolean;
  [key: string]: any;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

  return (
    <div className="relative">
      <input
        type={inputType}
        id={name}
        className={clsx(
          "peer focus:border-my-pink-600 dark:focus:border-my-pink-400 attractive-drop-shadow-sm block w-full appearance-none rounded-full border border-gray-100 bg-gray-100 px-6 pt-4 pb-2.5 text-base text-gray-900 focus:ring-0 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white",
          inputClassName,
        )}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />

      {/* Label */}
      <label
        htmlFor={name}
        className={clsx(
          "peer-focus:text-my-pink-600 dark:peer-focus:text-my-pink-400 pointer-events-none absolute start-5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-gray-100 px-2 text-base text-gray-700 duration-300 select-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:mt-[0.5px] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-700 dark:text-gray-300",
          labelClassName,
        )}
      >
        {children}
      </label>

      {/* Password visibility toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-6 h-full -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      )}
    </div>
  );
}
