import NextAuth from "next-auth";
import { authConfig } from "./utils/authConfig";

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
