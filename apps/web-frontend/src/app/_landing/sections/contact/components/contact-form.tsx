"use client";

import { useState } from "react";

// styles
import Input from "@/app/_old-components/input";
import styles from "./contact-form.module.css";
import OldButton from "@/app/_old-components/button";
import { sendEmail } from "@/lib/sendEmailAPICall";
import toast from "react-hot-toast";

const initValues = { name: "", email: "", subject: "", message: "" };

const initialState = { isLoading: false, error: "", values: initValues };

export default function ContactForm() {
  const [state, setState] = useState(initialState);
  const { values, isLoading, error } = state;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;

    setState((prev) => ({
      ...prev,
      error: "",
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      ...(values.subject.trim() && { subject: values.subject.trim() }),
      message: values.message.trim(),
    };

    if (!trimmedValues.name || !trimmedValues.email || !trimmedValues.message) {
      return setState((prev) => {
        return {
          ...prev,
          isLoading: false,
          error: `Please fill the required fields`,
        };
      });
    }

    try {
      sendEmail(trimmedValues);
      setState(initialState);
      toast.success("Successfully sent message!");
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      // action="https://formspree.io/f/xkneonrz"
      // method="POST"
    >
      {error && (
        <span className="!mb-5 inline-block font-semibold text-red-600">
          {error}
        </span>
      )}

      <Input
        label="Name"
        name="name"
        placeholder="John Titor"
        onChange={handleChange}
        value={values.name}
        required={true}
        className={styles.input}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
        onChange={handleChange}
        value={values.email}
        required={true}
        className={styles.input}
        maxlength={100}
      />

      <Input
        label="Subject (optional)"
        name="subject"
        placeholder="Subject of the message"
        onChange={handleChange}
        value={values.subject}
        className={styles.input}
        maxlength={150}
      />

      <Input
        label="Message"
        name="message"
        placeholder="Type your message here..."
        onChange={handleChange}
        value={values.message}
        required={true}
        className={styles.input}
        maxlength={5000}
        isTextarea={true}
      />

      <OldButton
        size="small"
        className={`${styles.btn} ${isLoading ? "cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </OldButton>
    </form>
  );
}
