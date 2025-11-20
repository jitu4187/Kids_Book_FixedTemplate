import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const STORAGE_ROOT = {
  uploads: path.join(process.cwd(), "public", "uploads"),
  generated: path.join(process.cwd(), "public", "generated"),
  pdfs: path.join(process.cwd(), "public", "pdfs"),
};

export type StorageBucket = keyof typeof STORAGE_ROOT;

async function ensureBucketDir(bucket: StorageBucket) {
  const targetDir = STORAGE_ROOT[bucket];
  await fs.mkdir(targetDir, { recursive: true });
  return targetDir;
}

function inferExtensionFromMime(mimeType?: string | null) {
  if (!mimeType) return "";
  const [, ext] = mimeType.split("/");
  if (!ext) return "";
  if (ext === "jpeg") return ".jpg";
  return `.${ext}`;
}

export async function saveBufferToBucket(
  bucket: StorageBucket,
  buffer: Buffer,
  options: { extension?: string; filenamePrefix?: string } = {}
) {
  const targetDir = await ensureBucketDir(bucket);
  const slug = options.filenamePrefix ? `${options.filenamePrefix}-${randomUUID()}` : randomUUID();
  const extension = options.extension ?? "";
  const filename = `${slug}${extension}`;
  const filePath = path.join(targetDir, filename);
  await fs.writeFile(filePath, buffer);
  return { filePath, publicUrl: `/${bucket}/${filename}` };
}

export async function persistWebFileToBucket(
  bucket: StorageBucket,
  file: File,
  options: { filenamePrefix?: string } = {}
) {
  const arrayBuffer = await file.arrayBuffer();
  const extension =
    path.extname(file.name) ||
    inferExtensionFromMime(file.type) ||
    ".bin";

  return saveBufferToBucket(bucket, Buffer.from(arrayBuffer), {
    extension,
    filenamePrefix: options.filenamePrefix,
  });
}

export async function writeJsonToBucket(
  bucket: StorageBucket,
  data: unknown,
  options: { filenamePrefix?: string }
) {
  const buffer = Buffer.from(JSON.stringify(data, null, 2));
  return saveBufferToBucket(bucket, buffer, {
    extension: ".json",
    filenamePrefix: options.filenamePrefix,
  });
}
