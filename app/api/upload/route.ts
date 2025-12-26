import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
type CloudinaryUploadResult = {
  secure_url: string;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<CloudinaryUploadResult>(
  (resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (err, result) => {
        if (err || !result) return reject(err);
        resolve({ secure_url: result.secure_url });
      })
      .end(buffer);
  }
);


  return NextResponse.json({
    url: uploadResult.secure_url,
  });
}
