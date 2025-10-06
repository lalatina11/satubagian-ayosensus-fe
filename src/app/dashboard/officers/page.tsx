import OfficersTable from "@/components/OfficersTable";
import { columns } from "@/components/OfficersTable/column";
import { getAdminRegencyAuthInfo, getOfficersData } from "@/lib/actions";
import { Officer } from "@/types";
import { Metadata } from "next";
import { AddOfficersForm } from "@/components/forms/AddOfficersForm";

export const metadata: Metadata = {
    title: "Admin Officers | Dashboard",
};

const Page = async () => {
    const authSession = await getAdminRegencyAuthInfo();
    const officersRes = await getOfficersData();
    const officers = officersRes.data as Array<Officer>;

    return (
        <main className="flex flex-col gap-3 w-full">
            <h1>Welcome {authSession?.session.name}</h1>
            <section className="flex flex-col gap-3 p-5">
                <AddOfficersForm/>
            </section>
            <section className="flex flex-col gap-3 p-5 rounded-md bg-card">
                <h1 className="text-2xl font-semibold">Daftar Petugas</h1>
                <div className="">
                    <OfficersTable columns={columns} data={officers}/>
                </div>
            </section>
        </main>
    );
};

export default Page;
