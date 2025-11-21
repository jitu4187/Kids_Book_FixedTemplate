export async function generateIllustration(prompt: string, pageNumber: number, storyId: string) {
  const response = await fetch("/api/generate-illustration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, pageNumber, storyId }),
  });

  return response.json() as Promise<{ imageUrl?: string; error?: boolean; message?: string }>;
}
