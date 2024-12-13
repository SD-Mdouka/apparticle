"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

const LoginForms = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const formHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "") return toast.warning("Email is required");
    if (password === "") return toast.warning("Password is required");

    try {
      router.push("/");
      toast.success('Successfully logged in')
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <form onSubmit={formHandleSubmit} className="flex flex-col">
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col mb-5 gap-4">
        <button
          type="submit"
          className="text-2xl text-white bg-purple-600 hover:bg-purple-900 p-3 rounded-lg font-bold w-full"
        >
            Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForms;