import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { headers } from "next/headers";

async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  } else {
    user.comparePassword(password, function (err: string, isMatch: boolean) {
      if (err) throw err;
      if (!isMatch) {
        throw `The entered password is incorrect`;
      }
    });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "4d",
  });

  return {
    user: user.toJSON(),
    token,
  };
}

async function create(params: { [key: string]: any }) {
  if (await User.findOne({ email: params.email })) {
    throw `Email: ${params.email} already exists.`;
  }

  const user = new User(params);
  await user.save();
  return user;
}

async function _delete(id: string) {
  await User.findByIdAndDelete(id);
}

async function getCurrent() {
  try {
    const currentUserId = headers().get("userId");
    return await User.findById(currentUserId);
  } catch {
    throw "User not found";
  }
}

const user = {
  authenticate,
  create,
  getCurrent,
  delete: _delete,
};

export default user;
