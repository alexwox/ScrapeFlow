"use server";

import { auth } from "@clerk/nextjs/server";

export async function CreateCredential() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthorized");
  }
}
