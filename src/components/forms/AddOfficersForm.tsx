"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { handleAddOfficers } from "@/lib/actions";
import { useState } from "react";
import { Trash } from "lucide-react";
import { log } from "console";

export const officerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  kode_desa: z.number().min(1, "Kode desa must be greater than 0"),
});

const officersFormSchema = z.object({
  officers: z.array(officerSchema),
});

export type OfficersFormValues = z.infer<typeof officersFormSchema>;

export function AddOfficersForm() {
  const [formState, setFormState] = useState({
    showPassword: false,
    loading: false,
    error: "",
  });
  const form = useForm<OfficersFormValues>({
    resolver: zodResolver(officersFormSchema),
    defaultValues: {
      officers: [{ name: "", password: "", kode_desa: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "officers",
  });

  const onSubmit = async (values: OfficersFormValues) => {
    try {
      console.log(fields.length);
      if (fields.length < 1) throw new Error("Isi setidaknya 1 petugas!");

      setFormState((prev) => ({ ...prev, loading: true }));
      await handleAddOfficers(values);
      toast.success("Berhasil Menambahkan petugas", {
        action: { label: "OK", onClick: () => {} },
      });
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        error:
          (error as Error).message ||
          "Terjadi Kesalahan. Coba lagi beberapa saat!",
      }));
      toast.error("Gagal Menambahkan Data petugas!", {
        description:
          (error as Error).message ||
          "Terjadi Kesalahan, Coba lagi beberapa saat",
        action: {
          label: "OK",
          onClick: () => {},
        },
      });
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Officers</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formState.error && (
              <span className="text-xs flex justify-center items-center text-destructive">
                {formState.error}
              </span>
            )}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg flex flex-row items-center justify-between gap-3"
              >
                <FormField
                  control={form.control}
                  name={`officers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username Petugas</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`officers.${index}.password`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`officers.${index}.kode_desa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Desa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter kode desa"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                          value={field.value === 0 ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash /> Hapus
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFormState((prev) => ({ ...prev, error: "" }));
                  append({ name: "", password: "", kode_desa: 0 });
                }}
              >
                + Tambahkan Petugas lain
              </Button>

              <Button
                disabled={formState.loading}
                type="submit"
                className="w-1/3"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
