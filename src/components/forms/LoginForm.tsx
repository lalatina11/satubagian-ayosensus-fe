"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { loginAdminRegencySchema as formSchema } from "@/lib/schemas";
import { handleLoginAdminRegency } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleLoginAdminRegency(values);
      toast.success("Login berhasil", {
        description: "anda akan diarahkan ke admin dashboard",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
      router.replace("/dashboard");
    } catch (error) {
      const { message } = error as Error;
      form.setError("root", { message });
      toast.error("Ada yang salah", {
        description: message || "",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    }
  }

  const handleShowPass = () => {
    setShowPassword((prev) => !prev);
  };

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="john doe" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputGroup className="pr-0">
                      <InputGroupInput
                        {...field}
                        placeholder="******"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputGroupAddon align="inline-end">
                        <Button
                          onClick={handleShowPass}
                          type="button"
                          variant="ghost"
                        >
                          {showPassword ? <EyeClosed /> : <Eye />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isLoading}
              className="w-full"
              type="submit"
            >
              {form.formState.isLoading ? <Spinner /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
