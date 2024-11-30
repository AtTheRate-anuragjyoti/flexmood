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
        const { title, price, author, cover_img, purchase_link } = data;
        return NextResponse.json({ title, price, author, cover_img, purchase_link }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
}