"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { supabase } from "./supabase-client";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) {
    throw new Error(
      "Not authenticated. You must be signed in to update profile.",
    );
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]+$/.test(nationalID)) {
    throw new Error("National ID number contains invalid characters.");

    const updateData = { nationality, countryFlag, nationalID };
  }

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
