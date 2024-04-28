import { GoogleLoginForm } from "@/components/GoogleLoginForm/GoogleLoginForm";
import LoginForm from "@/components/LoginForm/LoginForm";

export default async function Login() {
  return (
    <div className="flex flex-col gap-4 w-[280px] ">
      <h1 className=" text-3xl">Login here</h1>
      <LoginForm />
      <GoogleLoginForm />
    </div>
  );
}
