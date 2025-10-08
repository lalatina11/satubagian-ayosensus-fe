import OfficersTable from "@/components/OfficersTable";
import { columns } from "@/components/OfficersTable/column";
import {
  getAdminRegencyAuthInfo,
  getOfficersData,
  getVilages,
} from "@/lib/actions";
import { Officer } from "@/types";
import { Metadata } from "next";
import { AddOfficersForm } from "@/components/forms/AddOfficersForm";

export const metadata: Metadata = {
  title: "Admin Officers | Dashboard",
  icons: "/ayosensus.svg",
};

interface Props {
  searchParams: { name: Promise<string> };
}

const Page = async ({ searchParams }: Props) => {
  const authSession = await getAdminRegencyAuthInfo();
  const officersRes = await getOfficersData();
  const officers = officersRes.data as Array<Officer>;
  const villages = await getVilages((await searchParams.name) || "");

  return (
    <main className="flex flex-col gap-3 w-full">
      <h1>Welcome {authSession?.session.name}</h1>
      <section className="flex flex-col gap-3 p-5">
        <AddOfficersForm villages={villages} />
      </section>
      <section className="flex flex-col gap-3 p-5 rounded-md bg-card">
        <h1 className="text-2xl font-semibold">Daftar Petugas</h1>
        <div className="">
          <OfficersTable columns={columns} data={officers} />
        </div>
      </section>
    </main>
  );
};

export default Page;
