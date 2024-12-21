import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import eBook from "@/utils/models/eBooks_model";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch the required fields from the eBook model, including category.tabs
    const data = await eBook.find().select("serial cover_img title price category.tabs");

    console.log("Fetched eBooks with tabs:", data); // Logs the fetched data

    // Check if data is empty
    if (!data || data.length === 0) {
      console.log("No eBooks found in the database.");
      return NextResponse.json({ message: "No eBooks found" }, { status: 404 });
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching eBooks:", error);
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}


export const dynamic = 'force-dynamic';
