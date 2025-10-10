"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { checkNikCitizenSchema as formSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkNIK } from "@/lib/actions";

const CheckNIK = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: "",
            mother_name: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await checkNIK(values)
            toast.success("NIK berhasil diaktifkan", {
                description: "Silahkan verifikasi OTP",
                action: {
                    label: "OK",
                    onClick: () => {
                    },
                },
            });
            router.replace("/login/citizens/verify-otp");
        } catch (error) {
            const { message } = error as Error;
            form.setError("root", { message });
            toast.error("Ada yang salah", {
                description: message || "",
                action: {
                    label: "OK",
                    onClick: () => {
                    },
                },
            });
        }
    }

    return (
        <Card className="w-sm">
            <CardHeader>
                <CardTitle className="text-center">Login Dashboard</CardTitle>
                <CardDescription className="text-center">
                    Masukkan nama pengguna dan kata sandi untuk mengakses halaman
                    dashboard
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {form.formState.errors.root?.message && (
                            <span className="text-destructive flex justify-center items-center text-xs">
                {form.formState.errors.root.message}
              </span>
                        )}
                        <FormField
                            control={form.control}
                            name="nik"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Masukkan NIK</FormLabel>
                                    <FormControl>
                                        <Input placeholder="330212*****" {...field} />
                                    </FormControl>
                                    <FormDescription>16 Digit NIK</FormDescription>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mother_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Ibu Kandung</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Ibu Kita Kartini"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormDescription>Nama Ibu Kandung Sesuai KK</FormDescription>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        /><FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Whatsapp</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="6285*****"
                                        type="tel"
                                    />
                                </FormControl>
                                <FormDescription>Format 628***</FormDescription>
                                <FormMessage className="text-xs"/>
                            </FormItem>
                        )}
                    />
                        <Button
                            disabled={form.formState.isLoading}
                            className="w-full"
                            type="submit"
                        >
                            {form.formState.isLoading ? <Spinner/> : "Check NIK"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CheckNIK;
