import connectDB from "@/lib/connect-db";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";

function checkIncludesKey(data: Object, keys: string[]) {
  keys.forEach((key) => {
    if (!Object.keys(data).includes(key)) {
      return [false, key];
    }
  });
  return [true, null];
}

export async function GET() {
  const user = await User.find({});
  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const includeKeys = ["email", "password"];
  const [includes, key] = checkIncludesKey(data, includeKeys);
  if (!includes) {
    return NextResponse.json({
      error: true,
      message: `${key} not found`,
    });
  }

  try {
    await connectDB();

    let user = await User.findOne({ email: data.email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log(hashedPassword);

      const newUser = await User.create({
        email: data.email,
        password: hashedPassword,
      });

      console.log(newUser);
      return NextResponse.json({
        error: false,
        data: newUser,
      });
    }

    const passwordMatched = await bcrypt.compare(data.password, user.password);
    if (!passwordMatched)
      return NextResponse.json({
        error: true,
        message: "Password did not match",
      });
    return NextResponse.json({
      error: false,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: true,
      message: error?.message,
    });
  }
}
