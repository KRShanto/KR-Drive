import React, { useState } from "react";
import Form, { SendType } from "../utils/form/Form";
import Input from "../utils/form/Input";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function submitHandler(send: SendType) {
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);

      // redirect back
      router.back();
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div id="Login">
      <Form
        submitHandler={submitHandler}
        error={error}
        title="Login Account"
        className="form-full"
      >
        <Input
          type="email"
          label="Your Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          label="Your Password"
          value={password}
          setValue={setPassword}
        />

        <p className="msg">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>

        <button type="submit" className="btn main">
          Login
        </button>
      </Form>
    </div>
  );
}
