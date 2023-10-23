import apiHandler from "@/app/_helpers/server/api/api-handler";
import { UserRepo } from "@/app/_helpers/server";
import { NextRequest, NextResponse } from "next/server";

async function GET(request: NextRequest) {
  try {
    const user = await UserRepo.getCurrent();
    return user;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}

module.exports = apiHandler({
  GET,
});
