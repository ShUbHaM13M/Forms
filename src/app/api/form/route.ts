import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form";
import connectDB from "@/lib/connect-db";

// TEST: Get all forms
export async function GET() {
  try {
    await connectDB();
    const forms = await Form.find({});
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const form = await Form.create({
    ...data,
  });

  return NextResponse.json({
    message: "Form created successfully",
    form,
  });
}
