"use client";

// styles
import styles from "./input.module.css";

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  onChange?: (e: any) => void;
  value?: any;
  className?: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number;
  isTextarea?: boolean;
}

const Input: React.FC<InputProps> = ({
  label = "",
  type = "text",
  name = "",
  onChange = (e: any) => console.log(e.target.value),
  value = "",
  className = "",
  required = false,
  placeholder = "",
  maxlength = 100,
  isTextarea = false,
}) => {
  return (
    <label>
      <p className={`goto-paragraph ${styles.label}`}>{label}</p>
      {isTextarea ? (
        <textarea
          name={name}
          onChange={onChange}
          value={value}
          className={`goto-paragraph ${styles.textarea} ${className}`}
          required={required}
          placeholder={placeholder}
          maxLength={maxlength}
        />
      ) : (
        <>
          <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            className={`goto-paragraph ${styles.input} ${className}`}
            required={required}
            placeholder={placeholder}
            maxLength={maxlength}
          />
        </>
      )}
    </label>
  );
};

export default Input;
