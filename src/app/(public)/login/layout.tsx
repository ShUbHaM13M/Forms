import { auth } from "@/app/_helpers/server";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  if (auth.isAuthenticated()) {
    redirect("/");
  }
  return children;
}
