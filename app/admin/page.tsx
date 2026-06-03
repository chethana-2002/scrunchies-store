"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.log(error);
      setMessage("Login failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Owner Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-[#8b6b61] text-white p-3 rounded-xl"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          {message}
        </p>
      </div>
    </main>
  );
}