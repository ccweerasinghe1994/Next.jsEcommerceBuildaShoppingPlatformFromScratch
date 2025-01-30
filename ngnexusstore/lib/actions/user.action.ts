"use server";

import { signIn, signOut } from "@/auth";
import { signInUserSchema } from "../validations/validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// sign in the user with credentials

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const user = signInUserSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "invalid username or password" };
  }
}

// signout user

export async function signOutUser(): Promise<void> {
  await signOut();
}
