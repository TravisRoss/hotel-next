"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { supabase } from "./supabase-client";
import { redirect } from "next/navigation";

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

export async function updateReservationAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);

  if (!bookingIds.includes(bookingId)) {
    throw new Error("You don't have permission to update this booking");
  }

  const numGuests = parseInt(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 500); // max 500 chars

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId);
  if (error) {
    throw new Error("failed to update booking");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
