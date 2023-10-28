import { NextRequest, NextResponse } from "next/server";
import jwtMiddleware from "./jwt-middleware";
import errorHandler from "./error-handler";

export default function apiHandler(handler: any) {
  const wrappedHandler: any = {};
  const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        const json = await req.json();
        req.json = () => json;
      } catch {}

      try {
        await jwtMiddleware(req);

        const responseBody = await handler[method](req, ...args);
        return NextResponse.json(responseBody || {});
      } catch (err: any) {
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}
