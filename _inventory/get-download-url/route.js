import supabase from "@/utils/supabaseClient"; // Your Supabase client
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fileName } = body;

    console.log("Received file name:", fileName); // Debugging log

    if (!fileName) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }

    const bucketName = "ebooks"; // Your Supabase bucket name
    const filePath = `${fileName}.pdf`; // Ensure correct file extension

    console.log("Generated file path:", filePath); // Debugging log

    // Generate a signed URL (valid for 2 hours)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 60 * 60 * 2, {
        transform: {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${fileName}.pdf`,
          },
        },
      });

    if (error) {
      console.error("Error generating signed URL:", error.message); // Log details
      return NextResponse.json(
        { error: "Failed to generate download URL", details: error.message },
        { status: 500 }
      );
    }

    console.log("Generated signed URL:", data?.signedUrl); // Debugging log

    return NextResponse.json({ url: data.signedUrl }); // Send signed URL back to client
  } catch (error) {
    console.error("Server error:", error.message); // Log unexpected server error
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
