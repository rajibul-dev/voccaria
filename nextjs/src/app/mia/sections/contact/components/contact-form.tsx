"use client";

import { useState } from "react";

// styles
import Input from "@/app/components/input";
import styles from "./contact-form.module.css";
import Button from "@/app/components/button";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className={styles.form}
      action="https://formspree.io/f/xkneonrz"
      method="POST"
    >
      <Input
        label="Name"
        name="name"
        placeholder="John Titor"
        onChange={(e: any) => setName(e.target.value)}
        value={name}
        required={true}
        className={styles.input}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
        required={true}
        className={styles.input}
        maxlength={100}
      />

      <Input
        label="Subject (optional)"
        name="subject"
        placeholder="Subject of the message"
        onChange={(e: any) => setSubject(e.target.value)}
        value={subject}
        className={styles.input}
        maxlength={150}
      />

      <Input
        label="Message"
        name="message"
        placeholder="Type your message here..."
        onChange={(e: any) => setMessage(e.target.value)}
        value={message}
        required={true}
        className={styles.input}
        maxlength={5000}
        isTextarea={true}
      />

      <Button
        size="small"
        className={styles.btn}
      >
        Submit
      </Button>
    </form>
  );
}
