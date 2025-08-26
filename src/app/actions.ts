"use server";

import { recommendAssociations } from "@/ai/flows/recommend-associations";

export async function getRecommendations(
  interests: string
): Promise<string[] | null> {
  try {
    const result = await recommendAssociations(interests);
    return result;
  } catch (error) {
    console.error("Error in Genkit flow:", error);
    return null;
  }
}
