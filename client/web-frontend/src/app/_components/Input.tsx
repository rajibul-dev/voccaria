interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isTextArea?: boolean;
}

export default function Input({
  label = "",
  type = "text",
  isTextArea = false,
  ...props
}: InputProps) {
  return (
    <label className="block w-full">
      {label && (
        <span className="mb-2 ml-[1px] inline-block text-base text-gray-900 dark:text-gray-100">
          {label}
        </span>
      )}
      {!isTextArea && (
        <input
          type={type}
          className="focus:border-my-pink-600 dark:focus:border-my-pink-400 block w-full appearance-none rounded-md border border-gray-400 bg-gray-100 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:!text-gray-400"
          {...props}
        />
      )}
      {isTextArea && (
        <textarea
          className="focus:border-my-pink-600 dark:focus:border-my-pink-400 block max-h-100 min-h-18 w-full appearance-none rounded-md border border-gray-400 bg-gray-100 px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:!text-gray-400"
          rows={4}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}
    </label>
  );
}
