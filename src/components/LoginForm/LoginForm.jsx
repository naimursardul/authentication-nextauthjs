"use client";

import { loginUser } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginUser, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 mt-5 ">
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
      <span className="text-red-700">{state?.error}</span>
      <button className="bg-[--btn] hover:text-[--textSoft] px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
