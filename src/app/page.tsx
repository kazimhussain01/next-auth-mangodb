import Image from "next/image";
import SignOutButton from "./components/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Portal from "./portal/page";


export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/dashboard")
  }
  return (
    <div>
      <Portal />
    </div>
  );
}
