import Link from "next/link";
import LogoutBtn from "../LogoutBtn/LogoutBtn";
import { auth } from "@/auth";

export default async function Nav() {
  const session = await auth();

  return (
    <div className="flex gap-6 items-center">
      <Link href={`/`}>Home</Link>
      <Link href={`/profile`}>Profile</Link>
      {session?.user.isAdmin && <Link href={`/admin`}>Admin</Link>}
      {session?.user ? (
        <LogoutBtn />
      ) : (
        <>
          {" "}
          <Link href={`/register`}>Register</Link>
          <Link href={`/login`}>Login</Link>
        </>
      )}
    </div>
  );
}
