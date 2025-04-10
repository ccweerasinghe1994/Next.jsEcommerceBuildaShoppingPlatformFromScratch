"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  shippingAddressSchema,
  signInUserSchema,
  signUpUserSchema,
} from "../validations/validators";
import { formatErrors } from "../utils";
import { TShippingAddress } from "@/types";

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

// sign up user

export async function signUpUser(
  prevState: unknown,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const user = signUpUserSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });
    return { message: "User registered successfully", success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      message: formatErrors(error),
      success: false,
    };
  }
}

// get user by id
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error getting user by id", error);
    throw new Error("Error getting user by id");
  }
}

//  update the user address
export async function updateUserAddress(data: TShippingAddress) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const currentUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const schemaCheck = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        address: schemaCheck,
      },
    });

    return {
      message: "User address updated successfully",
      success: true,
    };
  } catch (error) {
    return {
      message: formatErrors(error),
      success: false,
    };
  }
}
