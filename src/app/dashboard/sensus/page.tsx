import FamilyDataForm from "@/components/forms/FamilyDataForm";
import { getFamilyData, getVilages } from "@/lib/actions";

const Page = async () => {
    const { error: getVillagesError, data: villages, message } = await getVilages("");
    const { error: getFamilyDataError, data: familyData } = await getFamilyData();
    if (getVillagesError || getFamilyDataError) throw new Error(message);

    return <div className="flex flex-col gap-3 py-6">
        <span className="text-3xl font-semibold">Ayo Sensus</span>
        <span>Daftarkan data kependudukanmu di ayo sensus!</span>
        {villages && villages.length &&
            <FamilyDataForm villages={villages} familyData={familyData}/>
        }
    </div>
}

export default Page