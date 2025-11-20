import { NextResponse } from "next/server";

import { persistWebFileToBucket } from "@/lib/storage";

const MAX_UPLOADS = 3;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll("photos");

    if (photos.length === 0) {
      return NextResponse.json({ error: "Please attach at least one photo." }, { status: 400 });
    }

    if (photos.length > MAX_UPLOADS) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_UPLOADS} photos at a time.` },
        { status: 400 }
      );
    }

    const uploads: string[] = [];

    for (const photo of photos) {
      if (!(photo instanceof File)) {
        return NextResponse.json({ error: "One of the uploads is not a valid file." }, { status: 400 });
      }

      const saved = await persistWebFileToBucket("uploads", photo, { filenamePrefix: "kid-photo" });
      uploads.push(saved.publicUrl);
    }

    return NextResponse.json({ data: { uploads } });
  } catch (error) {
    console.error("[upload-photo]", error);
    return NextResponse.json({ error: "Failed to upload photos." }, { status: 500 });
  }
}
