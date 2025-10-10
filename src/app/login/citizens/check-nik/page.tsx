import { Metadata } from "next";
import CheckNIK from "@/components/forms/CheckNIK";

export const metadata: Metadata = {
    title: "Admin Kab | Check NIK",
    description: "Ayo sensus by Satu Bagian team",
    icons: "/ayosensus.svg",
};

const Page = () => {
    return (
        <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
            <CheckNIK/>
        </div>
    );
};

export default Page;
