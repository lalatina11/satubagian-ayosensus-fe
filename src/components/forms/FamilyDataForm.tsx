"use client"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { familyDataSchema as formSchema } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { VillageSelect } from "@/components/forms/AddOfficersForm";
import { FamilyData, Village } from "@/types";
import { Input } from "@/components/ui/input";
import { handleAddFamilyData } from "@/lib/actions";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Props {
    villages: Array<Village>
    familyData?: FamilyData | null
}

const FamilyDataForm = ({ villages, familyData }: Props) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            no_kk: familyData?.no_kk || "",
            address: familyData?.address || "",
            rt: familyData?.rt || "",
            rw: familyData?.rw || "",
            kode_desa: familyData?.kode_desa || 0,
            zipcode: familyData?.zipcode || "",
            housings: {
                electricity: familyData?.housings?.electricity || "",
                floor: familyData?.housings?.floor || "",
                ownership_status: familyData?.housings?.ownership_status || "",
                toilet: familyData?.housings?.toilet || "",
                water: familyData?.housings?.water || "",
            }
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            await handleAddFamilyData(values)
            toast.success("Berhasil menyimpan data keluarga", {
                description: "Data Keluarga anda sudah terimpan",
                action: {
                    label: "OK",
                    onClick: () => {
                    }
                }
            })
        } catch (e) {
            const { message } = e as Error
            form.setError("root", { message })
        }
    }

    const handleReset = () => {
        form.reset()
    }

    return <section className="p-6">
        <Card className="">
            <CardHeader>
                <CardTitle>
                    Data Keluarga
                </CardTitle>
                <CardDescription>
                    Masukkan Data Keluarga anda
                </CardDescription>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {form.formState.errors.root && <span>{form.formState.errors.root.message}</span>}
                            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="no_kk"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Nomor KK</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 330212****"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Alamat</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Jl Jenderal Soedirman no ***"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rt"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>RT</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 001"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rw"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>RW</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 001"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="kode_desa"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Desa</FormLabel>
                                            <FormControl>
                                                <VillageSelect
                                                    value={Number(field.value)}
                                                    onChange={field.onChange}
                                                    villages={villages}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zipcode"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Kode Pos</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 54566"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="housings.ownership_status"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Kepemilikan Rumah</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Pribadi"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="housings.electricity"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Tegangan Listrik rumah</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 450 vA"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="housings.water"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Pengairan di rumah anda</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Sumur,PDAM"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="housings.toilet"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Toilet</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Sendiri, Umum"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="housings.floor"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Alas Rumah</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Tanah, Keramik, Granit"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleReset} className="flex-1" variant="destructive"
                                        type="reset">Reset</Button>
                                <Button className="flex-1"
                                        type="submit">{form.formState.isLoading || form.formState.isSubmitting ?
                                    <Spinner/> : 'Simpan'}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="mt-2 text-muted-foreground text-sm">
                    Informasi ini penting agar anda bisa mendaftarkan anggota keluarga anda
                </CardFooter>
            </CardHeader>
        </Card>
    </section>
}

export default FamilyDataForm
