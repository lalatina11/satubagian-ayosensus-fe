import { FamilyMemberType } from "@/types";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

type Props = {
    data: Array<FamilyMemberType>
}
const FamilyMembersTable = ({ data }: Props) => {
    return (
        <Card>
            <CardHeader>

                <CardTitle>Table Anggota Keluarga</CardTitle>
                <CardDescription>Table Anggota Keluarga anda</CardDescription>
            </CardHeader>
            <Table>
                <TableCaption>A list of your family members.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Birth Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.full_name}</TableCell>
                            <TableCell>{member.gender}</TableCell>
                            <TableCell>{new Date(member.birth_date).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CardFooter>Jumlah anggota keluarga: {data.length}</CardFooter>
        </Card>
    )
}

export default FamilyMembersTable;