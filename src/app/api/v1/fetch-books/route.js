import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import eBook from "@/utils/models/eBooks_model";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();
    
    // Fetch data from eBook model
    const data = await eBook.find();
    
    console.log("Fetched eBooks:", data);  // This will log the fetched data in the server logs
    
    // Check if data is empty
    if (!data || data.length === 0) {
      console.log("No eBooks found in the database.");
      return NextResponse.json({ message: "No eBooks found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching eBooks:", error);
    console.log(process.env.MONGO_URI);
    return NextResponse.json({ message: "An error occurred", error: error.message}, { status: 500 });
  }
}
