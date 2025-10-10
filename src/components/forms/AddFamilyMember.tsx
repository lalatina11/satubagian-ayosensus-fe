"use client"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { familyMemberSchema as formSchema } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ChevronDownIcon } from "lucide-react"


import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { useState } from "react";
import { handleAddFamilyMembersData } from "@/lib/actions";
import { toast } from "sonner";


const FamilyDataForm = () => {
    const [ datePickerOpen, setDatePickerOpen ] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            nik: "",
            address: "",
            stay: 1,
            gender: "male", // 'male', 'female'
            birth_place: "",
            birth_date: new Date(),
            tribes: "",
            religion: "",
            used_language: "",
            family_status: "",
            marital_status: "", // 'married', 'single'
            works: {
                activity: "",
                job: "",
                job_status: ""
            },
            educations: {
                education: ""
            },
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            await handleAddFamilyMembersData(values)
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
            toast.error(message || "Terjadi Kesalahan", {
                action: {
                    label: "OK",
                    onClick: () => {
                    }
                }
            })
        }
    }

    const handleReset = () => {
        form.reset()
    }

    return <section className="p-6">
        <Card className="">
            <CardHeader>
                <CardTitle>
                    Data Anggota Keluarga
                </CardTitle>
                <CardDescription>
                    Silahkan Masukkan Data Anggota Keluarga anda
                </CardDescription>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {form.formState.errors.root && <span
                                className="flex justify-center items-center text-destructive text-xs">{form.formState.errors.root.message} </span>}
                            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="full_name"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Rafi Budiansyah"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nik"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>No NIK</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: 330001***"/>
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
                                            <FormLabel>Alamat Lengkap</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Jalan DI Panjaitan**"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stay"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Waktu Tinggal di saat ini (tahun)</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Jalan DI Panjaitan**"
                                                       type="number"
                                                       onChange={e => field.onChange(Number(e.target.value))}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stay"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Jenis Kelamin</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value: "male" | "female") => field.onChange(value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Jenis Kelamin"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Jenis Kelamin</SelectLabel>
                                                            <SelectItem value="male">Laki-laki</SelectItem>
                                                            <SelectItem value="female">Perempuan</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birth_place"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Tempat Lahir</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Banyumas"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="birth_date"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="flex flex-col gap-3">
                                                    <Label htmlFor="date" className="px-1">
                                                        Tanggal Lahir
                                                    </Label>
                                                    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                id="date"
                                                                className="w-full justify-between font-normal"
                                                            >
                                                                {field.value ? new Date(field.value).toLocaleDateString('id-ID', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                }) : "Select date"}
                                                                <ChevronDownIcon/>
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto overflow-hidden p-0"
                                                                        align="start">
                                                            <Calendar
                                                                mode="single"
                                                                disabled={(date) => date > new Date()}
                                                                captionLayout="dropdown"
                                                                onSelect={(date) => {
                                                                    const dateString = date ? date.toISOString().split('T')[ 0 ] : new Date().toISOString().split('T')[ 0 ]
                                                                    field.onChange(dateString)
                                                                    setDatePickerOpen(false)
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nationality"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Kewarganegaraan</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value: "wni" | "wna") => field.onChange(value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih kewarganegaraan"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Kewarganegaraan</SelectLabel>
                                                            <SelectItem value="wni">WNI</SelectItem>
                                                            <SelectItem value="wna">WNA</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tribes"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Suku</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Jawa"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="religion"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Agama</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Agama"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Agama</SelectLabel>
                                                            <SelectItem value="islam">Islam</SelectItem>
                                                            <SelectItem value="kristen">Kristen</SelectItem>
                                                            <SelectItem value="katholik">Katholik</SelectItem>
                                                            <SelectItem value="hindu">Hindu</SelectItem>
                                                            <SelectItem value="buddha">Buddha</SelectItem>
                                                            <SelectItem value="konghucu">Konghucu</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="marital_status"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Status Pernikahan</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Kawin, Belum Kawin"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="works.activity"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Jenis Pekerjaan</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: PNS"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="works.job"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Deskripsi Pekerjaan</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: menjalankan tugas negara"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="works.job_status"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Status Pekerjaan</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: Aktif, Tidak Aktif"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="educations.education"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Pendidikan</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="contoh: S1, S2, S3"/>
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
