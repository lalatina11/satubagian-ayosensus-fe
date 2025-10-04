import { ModeToggle } from "@/components/ModeToggle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  // icons: "/file.svg",
};

const Page = () => {
  return (
    <main className="container mx-auto min-h-screen flex flex-col bg-card">
      <div>Hei</div>
      <div>
        <ModeToggle />
      </div>
    </main>
  );
};

export default Page;
