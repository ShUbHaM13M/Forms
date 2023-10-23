import apiHandler from "@/app/_helpers/server/api/api-handler";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  try {
    console.log(request.headers.get("userId"));
    return request.headers.get("userId");
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

module.exports = apiHandler({
  GET,
});
