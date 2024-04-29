"use server";

import { signIn } from "@/auth";
import { connectDB } from "@/db/db.js";
import { User } from "@/models/userModel.js";
import { hash } from "@/utils/utils.js";
import { redirect } from "next/navigation";

//  REGISTER USER
export const userRegister = async (prev, formData) => {
  const { username, email, password, confirmPassword } =
    Object.fromEntries(formData);

  console.log(username, email, password, confirmPassword);

  let user = null;

  if (password !== confirmPassword) {
    return { error: "Password doesn't match" };
  }
  try {
    await connectDB();

    user = await User.findOne({ email: email });

    if (user) {
      return { error: "User is already existed" };
    }

    user = await new User({
      username,
      email,
      password: hash(password),
      isAdmin: email === "admin@gmail.com" ? true : false,
    });

    await user.save();
    console.log(user);
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
  redirect("/login");
};

// GOOGLE LOGIN
export const googleLogin = async () => {
  await signIn("google");
};

// LOGIN
export const loginUser = async (prev, formData) => {
  const { email, password } = Object.fromEntries(formData);

  console.log(email, password);

  let user = null;

  try {
    await connectDB();

    user = await User.findOne({ email });

    console.log(user?._doc);

    if (!user) {
      return { error: "User not found!" };
    } else {
      const hashedPw = hash(password);
      console.log(hashedPw);
      if (hashedPw !== user?._doc.password) {
        console.log("wrong pw");
        return { error: "Wrong Password!" };
      }

      console.log("passed2");
    }
  } catch (error) {
    console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    return { error: "Something went wrong" };
  }
  await signIn("credentials", { email, password });
  return true;
};
