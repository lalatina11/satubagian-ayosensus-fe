"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form"
import { z } from "zod"
import { verifyOtpSchema as formSchema } from "@/lib/schemas";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { handleVerifyOtp } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Spinner } from "@/components/ui/spinner";

type Field = ControllerRenderProps<FieldValues, string>

const CustomInputOTP = ({ field }: { field: Field }) => {
    return <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                     onChange={(val) => field.onChange(val)}>
        <InputOTPGroup>
            <InputOTPSlot index={0}/>
            <InputOTPSlot index={1}/>
            <InputOTPSlot index={2}/>
            <InputOTPSlot index={3}/>
            <InputOTPSlot index={4}/>
            <InputOTPSlot index={5}/>
        </InputOTPGroup>
    </InputOTP>
}

const VerifyOtp = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await handleVerifyOtp(values)
            toast.error("Berhasil", {
                description: "Anda akan diarahkan ke halaman Dashboard!",
                action: {
                    label: "OK",
                    onClick: () => {
                    }
                }
            })
            router.push("/dashboard")
        } catch (e) {
            const { message } = e as Error
            toast.error(message || "Terjadi Kesalahan", {
                action: {
                    label: "OK",
                    onClick: () => {
                    }
                }
            })
            form.setError("root", { message: message || "Terjadi kesalahan" })
        }
    }

    return <Card className="w-sm mx-auto">
        <CardHeader>
            <CardTitle>
                Masukkan OTP
            </CardTitle>
            <CardDescription>Masukkan OTP yang dikirimkan ke nomor telepon anda</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>OTP</FormLabel>
                                <FormControl className="flex justify-center items-center">
                                    <CustomInputOTP field={field}/>
                                </FormControl>
                                <FormDescription>
                                    Input 6 digit OTP
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" disabled={form.formState.isLoading || form.formState.isSubmitting}
                            type="submit">
                        {form.formState.isLoading || form.formState.isSubmitting ? <Spinner/> : "Verifikasi"}
                    </Button>
                </form>
            </Form>
        </CardContent>
    </Card>
}

export default VerifyOtp