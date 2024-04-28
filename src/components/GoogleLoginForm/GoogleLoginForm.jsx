import { googleLogin } from "@/lib/actions";
import React from "react";

export function GoogleLoginForm() {
  return (
    <form action={googleLogin}>
      <button className="w-full px-3 py-2 rounded-lg bg-[--text] text-[--bg] hover:text-[--bgSoft] ">
        Continue with Google
      </button>
    </form>
  );
}
