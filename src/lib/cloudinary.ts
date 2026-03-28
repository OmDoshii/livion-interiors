const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY!;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;

export interface CloudinaryUploadResult {
  public_id:  string;
  secure_url: string;
  width:      number;
  height:     number;
  format:     string;
}

// ─── Upload a file buffer to Cloudinary ───────────────────────────
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: {
    folder:        string;       // e.g. "livion/reviews"
    mimeType?:     string;       // e.g. "image/png"
    publicId?:     string;       // optional custom filename
    transformation?: string;     // e.g. "w_800,h_800,c_fill"
  }
): Promise<CloudinaryUploadResult> {
  const base64 = fileBuffer.toString("base64");
  const mime   = options.mimeType ?? "image/jpeg";
  const dataURI = `data:${mime};base64,${base64}`;

  const formData = new FormData();
  formData.append("file",   dataURI);
  formData.append("folder", options.folder);
  formData.append("api_key", CLOUDINARY_API_KEY);
  if (options.publicId) formData.append("public_id", options.publicId);
  if (options.transformation) formData.append("transformation", options.transformation);

  // Generate signature
  const timestamp  = Math.round(Date.now() / 1000).toString();
  const sigString  = `folder=${options.folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature  = await sha1(sigString);

  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Cloudinary upload failed: ${JSON.stringify(err)}`);
  }

  return res.json();
}

// ─── Delete from Cloudinary ───────────────────────────────────────
export async function deleteFromCloudinary(publicId: string) {
  const timestamp = Math.round(Date.now() / 1000).toString();
  const sigString = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = await sha1(sigString);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key",   CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
    { method: "POST", body: formData }
  );
}

// ─── SHA-1 helper ─────────────────────────────────────────────────
async function sha1(message: string): Promise<string> {
  const msgBuffer  = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
