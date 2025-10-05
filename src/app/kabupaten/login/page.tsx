import LoginForm from "@/components/kabupaten/forms/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Kab | Login",
};

const Page = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  );
};

export default Page;
