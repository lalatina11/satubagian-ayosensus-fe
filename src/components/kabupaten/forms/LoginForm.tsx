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
  FormDescription,
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
import { loginAdminKabupatenSchema as formSchema } from "@/lib/schemas";
import { handleLoginAdminKabupaten } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    isLoading: false,
    isShowPassword: false,
    error: "",
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormState((prev) => ({ ...prev, isLoading: true }));
      await handleLoginAdminKabupaten(values);
      router.replace("/dashboard");
      toast.success("Login berhasil", {
        description: "anda akan diarahkan ke admin dashboard kabupaten",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.log(error);
      setFormState((prev) => ({
        ...prev,
        error: (error as Error).message || "Something went wrong!",
      }));
      toast.error("Ada yang salah", {
        description: (error as Error).message || "",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  const handleShowPass = () => {
    setFormState((prev) => ({ ...prev, isShowPassword: !prev.isShowPassword }));
  };

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle>Login boss</CardTitle>
        <CardDescription>Login Sebagai Admin Kabupaten</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formState.error && (
              <span className="text-destructive flex justify-center items-center text-sm">
                {"Error: " + formState.error}
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
                  <FormDescription>Nama admin kabupaten</FormDescription>
                  <FormMessage />
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
                        type={formState.isShowPassword ? "text" : "password"}
                      />
                      <InputGroupAddon align="inline-end">
                        <Button
                          onClick={handleShowPass}
                          type="button"
                          variant="ghost"
                        >
                          {formState.isShowPassword ? <EyeClosed /> : <Eye />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormDescription>Password admin kabupaten</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={formState.isLoading}
              className="w-full"
              type="submit"
            >
              {formState.isLoading ? <Spinner /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
