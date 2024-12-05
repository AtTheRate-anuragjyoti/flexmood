import supabase from "@/utils/supabaseClient";
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

    // Append '.pdf' to the file name to ensure it's correct
    const filePath = `${fileName}.pdf`;
    console.log("Generated file path with extension:", filePath); // Debugging log

    // Generate a signed URL valid for 2 hours
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 60 * 60 , {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=${fileName}.pdf`,
        },
      }); // Expires in 2 hours

    if (error) {
      console.error("Error generating signed URL:", error);
      return NextResponse.json(
        { error: "Failed to generate download URL", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data?.signedUrl }); // Send back the signed URL
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
