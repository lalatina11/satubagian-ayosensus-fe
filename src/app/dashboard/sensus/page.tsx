import FamilyDataForm from "@/components/forms/FamilyDataForm";
import { getFamilyData, getFamilyMembersData, getVilages } from "@/lib/actions";
import AddFamilyMember from "@/components/forms/AddFamilyMember";
import FamilyMembersTable from "@/components/FamilyMembersTable";

const Page = async () => {
    const { error: getVillagesError, data: villages, message } = await getVilages("");
    const { error: getFamilyDataError, data: familyData } = await getFamilyData();
    const { error: familyMembersError, data: familyMembersData } = await getFamilyMembersData()

    if (getVillagesError || getFamilyDataError || familyMembersError) throw new Error(message);

    return <div className="flex flex-col gap-3 py-6">
        <span className="text-3xl font-semibold">Ayo Sensus</span>
        <span>Daftarkan data kependudukanmu di ayo sensus!</span>
        {villages && villages.length &&
            <FamilyDataForm villages={villages} familyData={familyData}/>
        }
        <AddFamilyMember/>
        {familyMembersData && familyMembersData.length &&
            <FamilyMembersTable data={familyMembersData}/>
        }
    </div>
}

export default Page