import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const BUCKET_NAME = "uploads";

// ponytail: single admin client, no pooling/rotation — add when RPS matters.
const storageAdmin = createClient(supabaseUrl!, serviceRoleKey!, {
  auth: { persistSession: false },
});

async function ensureBucket() {
  const { error } = await storageAdmin.storage.createBucket(BUCKET_NAME, {
    public: true,
    fileSizeLimit: "5MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  });
  // Bucket sudah ada = OK. Error lain = lempar.
  if (error && !error.message.includes("already exists")) throw error;
}

export async function uploadImage(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  await ensureBucket();

  const { error } = await storageAdmin.storage
    .from(BUCKET_NAME)
    .upload(fileName, buffer, { contentType, upsert: false });

  if (error) throw error;

  const { data } = storageAdmin.storage.from(BUCKET_NAME).getPublicUrl(fileName);
  return data.publicUrl;
}
