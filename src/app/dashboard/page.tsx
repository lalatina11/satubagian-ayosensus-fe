import LogoutForm from "@/components/forms/LogoutForm";
import { getAdminRegencyAuthInfo } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Kab | Dashboard",
};

const Page = async () => {
  const session = await getAdminRegencyAuthInfo();
  console.log(session);

  return (
    <div className="flex flex-col">
      <h1>Welcome {session?.name} in Admin Kab Dashboard</h1>
      <LogoutForm />
    </div>
  );
};

export default Page;
