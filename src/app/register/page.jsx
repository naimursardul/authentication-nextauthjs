"use client";

import { GoogleLoginForm } from "@/components/GoogleLoginForm/GoogleLoginForm";
import { userRegister } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function Register() {
  const [state, formAction] = useFormState(userRegister, null);

  return (
    <div className="flex flex-col gap-4 w-[280px] ">
      <h1 className=" text-3xl">Register here</h1>
      <form action={formAction} className="flex flex-col gap-4 mt-5 ">
        <input
          className="px-3 py-3 rounded bg-[--bgSoft] "
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="px-3 py-3 rounded bg-[--bgSoft] "
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          className="px-3 py-3 rounded bg-[--bgSoft] "
          type="password"
          name="password"
          placeholder="password"
        />
        <input
          className="px-3 py-3 rounded bg-[--bgSoft] "
          type="password"
          name="confirmPassword"
          placeholder="password again"
        />
        <span className="text-red-700">{state?.error}</span>
        <button className="bg-[--btn] hover:text-[--textSoft] px-4 py-2 rounded">
          Submit
        </button>
      </form>
      <GoogleLoginForm />
    </div>
  );
}
