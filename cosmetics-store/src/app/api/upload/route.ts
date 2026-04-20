import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/middleware/auth.middleware";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  return withAdminAuth(req, async (req) => {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json(
          { success: false, message: "No file uploaded" },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary using a promise to handle the stream
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "stars-collections/products",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Stream Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(buffer);
      });

      const result = uploadResult as any;

      return NextResponse.json({
        success: true,
        message: "Image uploaded successfully",
        url: result.secure_url,
      });
    } catch (error: any) {
      console.error("Upload Route Error:", error);
      return NextResponse.json(
        { 
          success: false, 
          message: error.message || "Failed to upload image to Cloudinary",
          details: error
        },
        { status: 500 }
      );
    }
  });
}
