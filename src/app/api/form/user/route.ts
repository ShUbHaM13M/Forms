import apiHandler from "@/app/_helpers/server/api/api-handler";
import { NextRequest, NextResponse } from "next/server";
import { Form } from "@/models/Form";

async function GET(request: NextRequest) {
  try {
    const user_id = request.headers.get("userId");
    return await Form.find({ user_id });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

module.exports = apiHandler({
  GET,
});
