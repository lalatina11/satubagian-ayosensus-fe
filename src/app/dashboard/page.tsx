import { getUserSessionServer } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
};

const Page = async () => {
  const { error, data: userSession, message } = await getUserSessionServer();

  if (error || !userSession) throw new Error(message);

  return <div>Welcome {userSession?.session.name}</div>;
};

export default Page;
