import connectDB from "@/lib/connect-db";
import { type NextRequest, NextResponse } from "next/server";
import { UserRepo } from "@/app/_helpers/server";
import { cookies } from "next/headers";
import apiHandler from "@/app/_helpers/server/api/api-handler";

async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    await connectDB();
    const data = await UserRepo.authenticate(body);

    if (!data) {
      const user = await UserRepo.create(body);
      return NextResponse.json({
        error: false,
        // FIXME: Add email validation
        message: `Account created sucessfully, please validate your email!`,
      });
    }

    cookies().set("authorization", data.token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return data.user;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      error: true,
      message: error?.message,
    });
  }
}

module.exports = apiHandler({
  POST,
});
