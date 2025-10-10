"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { loginCitizenSchema as formSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { handleLoginCitizens } from "@/lib/actions";

const LoginCitizensForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await handleLoginCitizens(values);
            toast.success("Login berhasil", {
                description: "anda akan diarahkan ke admin dashboard",
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
                            {form.formState.isLoading ? <Spinner/> : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex text-sm gap-2 items-center">Belum Aktivasi nik?
                <Link className="text-blue-500"
                      href="/login/citizens/check-nik">Aktivasi
                    Disini!</Link></CardFooter>
        </Card>
    );
};

export default LoginCitizensForm;
