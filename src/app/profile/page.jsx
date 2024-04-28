import { auth } from "@/auth";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();

  console.log(session);

  return (
    <div className="flex flex-col gap-10 items-center">
      <h2 className="text-white text-4xl font-[300] ">
        Welcome back,{" "}
        <b className="text-[--btn] font-bold ">{session?.user.username}</b>
      </h2>
      {session?.user.img && (
        <Image
          src={session?.user.img}
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
    </div>
  );
}
