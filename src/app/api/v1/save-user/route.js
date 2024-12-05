import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import User from "@/utils/models/users_model";// Ensure this path matches your setup

export async function POST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { name, email, booksPurchased } = body;

    // Connect to MongoDB
    await dbConnect();

    // Validate the request data
    if (!name || !email || !booksPurchased || booksPurchased.length === 0) {
      console.log("Invalid input data:", { name, email, booksPurchased });
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      console.log(`User with email ${email} found. Updating their purchases.`);
      // Append new books to the existing user's purchases
      user.booksPurchased.push(...booksPurchased);
    } else {
      console.log(`Creating a new user with email ${email}.`);
      // Create a new user
      user = new User({ name, email, booksPurchased });
    }

    // Save the user to the database
    await user.save();

    console.log("User data saved successfully:", user);
    return NextResponse.json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { message: "An error occurred while saving user data", error: error.message },
      { status: 500 }
    );
  }
}
