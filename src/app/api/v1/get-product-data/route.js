import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import eBook from "@/utils/models/eBooks_model";

export async function POST(req){
    try {

        const { serial } = await req.json();
        console.log("Serial:", serial);
        await dbConnect();
        const data = await eBook.findOne({ serial: serial });
        console.log("Data:", data);
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}