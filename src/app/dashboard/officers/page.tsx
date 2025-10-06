import { getAdminRegencyAuthInfo } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Officers | Dashboard",
};

const Page = async () => {
  const authSession = await getAdminRegencyAuthInfo();

  return (
    <div>
      <h1>Welcome {authSession?.session.name}</h1>
      <h1>Officers List</h1>
    </div>
  );
};

export default Page;
