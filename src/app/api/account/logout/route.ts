import apiHandler from "@/app/_helpers/server/api/api-handler";
import { cookies } from "next/headers";

module.exports = apiHandler({
  POST,
});

async function POST() {
  cookies().delete("authorization");
}
