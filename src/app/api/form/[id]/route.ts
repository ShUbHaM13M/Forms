import apiHandler from "@/app/_helpers/server/api/api-handler";
import connectDB from "@/lib/connect-db";
import { Form } from "@/models/Form";
import { NextResponse } from "next/server";

async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const form = await Form.findById(params.id);
    return form;
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error.message });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
  } catch (error: any) {}
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
  } catch (error: any) {}
}

module.exports = apiHandler({
  GET,
  PUT,
  DELETE,
});
