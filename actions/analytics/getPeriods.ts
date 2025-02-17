"use server";

export async function GetPeriods() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }
}
