import LoginForms from "@/component/LoginForm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in",
};

const LoginPage = async () => {
  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center ">
      <div className="m-auto bg-slate-100 rounded-2xl p-7 w-full md:2/3">
        <h1 className="text-6xl font-bold text-blue-800 mb-10">Log In</h1>
        <LoginForms/>
      </div>
    </section>
  );
};

export default LoginPage;