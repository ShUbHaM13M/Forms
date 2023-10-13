import connectDB from "@/lib/connect-db";
import { Form } from "@/models/Form";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const form = await Form.findById(params.id);
    return NextResponse.json({
      error: false,
      form,
    });
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error.message });
  }
}
