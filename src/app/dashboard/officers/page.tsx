import { AddOfficersForm } from "@/components/forms/AddOfficersForm";
import OfficersTable from "@/components/OfficersTable";
import { columns } from "@/components/OfficersTable/column";
import {
  getUserSessionServer,
  getOfficersData,
  getVilages,
} from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Officers | Dashboard",
  icons: "/ayosensus.svg",
};

interface Props {
  searchParams: Promise<{ name: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { error: authError, data: authSession } = await getUserSessionServer();
  const { error: officersError, data: officers } = await getOfficersData();
  const { name } = await searchParams;
  const {
    error: getVillagesError,
    data: villages,
    message,
  } = await getVilages(name ?? "");

  if (getVillagesError || officersError || authError)
    throw new Error(message || "");

  return (
    <main className="flex flex-col gap-3 w-full">
      <h1>Welcome {authSession?.session.name}</h1>
      {villages && villages.length > 0 && (
        <section className="flex flex-col gap-3 p-5">
          <AddOfficersForm villages={villages} />
        </section>
      )}
      <section className="flex flex-col gap-3 p-5 rounded-md bg-card">
        <h1 className="text-2xl font-semibold">Daftar Petugas</h1>
        {officers?.length && (
          <div className="">
            <OfficersTable columns={columns} data={officers} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Page;
