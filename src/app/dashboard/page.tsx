import { getAdminRegencyAuthInfo } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
};

const Page = async () => {
  const userSession = await getAdminRegencyAuthInfo();

  return <div>Welcome {userSession?.session.name}</div>;
};

export default Page;
