import React, { useState } from "react";
import Form, { SendType } from "../utils/form/Form";
import Input from "../utils/form/Input";
import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function submitHandler(send: SendType) {
    if (email === "" || password === "" || name === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      // Create account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile
      await updateProfile(userCredential.user, { displayName: name });

      // redirect back
      router.back();
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div id="Register">
      <Form
        submitHandler={submitHandler}
        error={error}
        title="Register Account"
        className="form-full"
      >
        <Input label="Your Name" value={name} setValue={setName} />
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
          Already have an account? <Link href="/login">Login</Link>
        </p>

        <button type="submit" className="btn main">
          Register
        </button>
      </Form>
    </div>
  );
}
