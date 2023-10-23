import { NextRequest } from "next/server";
import { auth } from "..";

const PUBLIC_PATHS = [
  "POST:/api/account/login",
  "POST:/api/account/logout",
  "POST:/api/form",
];

function isPublicPath(req: NextRequest): boolean {
  return PUBLIC_PATHS.includes(`${req.method}:${req.nextUrl.pathname}`);
}

async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) return;

  const id = auth.verifyToken();
  req.headers.set("userId", id);
}

export default jwtMiddleware;
