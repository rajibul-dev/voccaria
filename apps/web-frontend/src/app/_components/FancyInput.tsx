"use client";
import clsx from "clsx";

export default function FancyInput({
  children,
  value = "",
  onChange = () => {},
  labelClassName = "",
  inputClassName = "",
  name = "",
  ...props
}: {
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  labelClassName?: string;
  inputClassName?: string;
  name?: string;
  [key: string]: any; // Allow other props to be passed
}) {
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        className={clsx(
          "peer focus:border-my-pink-600 dark:focus:border-my-pink-500 block w-full appearance-none rounded-full border-1 border-gray-100 bg-gray-100 px-6 pt-4 pb-2.5 text-base text-gray-900 [filter:drop-shadow(0px_1px_1px_rgb(0_0_0_/_0.25))] focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white",
          inputClassName,
        )}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      <label
        htmlFor={name}
        className={clsx(
          "peer-focus:text-my-pink-600 peer-focus:dark:text-my-pink-500 absolute start-5 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text bg-gray-100 px-2 text-base text-gray-700 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:mt-[0.5px] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400",
          labelClassName,
        )}
      >
        {children}
      </label>
    </div>
  );
}
