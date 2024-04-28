import { auth } from "@/auth";

export default async function Admin() {
  const session = await auth();
  return (
    <div>
      <h2 className="text-3xl font-[300] text-green-800">
        Welcome to Admin Dashboard
      </h2>
    </div>
  );
}
