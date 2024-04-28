import { signOut } from "@/auth";

export default function LogoutBtn() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="bg-[--btn] hover:text-[--textSoft] px-2 py-1 rounded ">
        Logout
      </button>
    </form>
  );
}
