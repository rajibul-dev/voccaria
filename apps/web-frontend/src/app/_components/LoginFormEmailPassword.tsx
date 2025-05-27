"use client";

import { useState } from "react";
import FancyInput from "./FancyInput";

export default function LoginFormEmailPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col gap-4">
      <FancyInput type="email" name="email" value={email} onChange={setEmail}>
        Email
      </FancyInput>

      <FancyInput
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
      >
        Password
      </FancyInput>
    </form>
  );
}
