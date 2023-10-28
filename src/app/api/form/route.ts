import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form";
import connectDB from "@/lib/connect-db";
import apiHandler from "@/app/_helpers/server/api/api-handler";

// TEST: Get all forms
async function GET() {
  try {
    await connectDB();
    const forms = await Form.find({});
    return forms;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const form = await Form.create({
    ...data,
  });

  return NextResponse.json({
    message: "Form created successfully",
    form,
  });
}

module.exports = apiHandler({
  GET,
  POST,
});
