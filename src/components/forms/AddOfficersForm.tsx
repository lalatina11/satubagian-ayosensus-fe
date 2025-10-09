"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { handleAddOfficers } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Village } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ✅ Schema
export const officerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .transform((val) => val.toLowerCase())
    .refine((val) => /^[a-z0-9]+$/i.test(val), {
      message:
        "Username tidak boleh menggunakan spasi dan harus berupa huruf kecil",
    }),
  password: z.string().min(6, "Password minimal 6 karakter"),
  kode_desa: z.number().min(1, "Pilih kode desa yang valid"),
});

const officersFormSchema = z.object({
  officers: z.array(officerSchema),
});

export type OfficersFormValues = z.infer<typeof officersFormSchema>;

interface Props {
  villages: Village[];
}

interface VillageSelectProps {
  value: number;
  onChange: (val: number) => void;
  villages: Village[];
}

// ✅ Reusable Autocomplete Command
export const VillageSelect = ({
  value,
  onChange,
  villages,
}: VillageSelectProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selectedVillage = villages.find((v) => v.kode === value);

  // ✅ Use memoized filtered list based on query
  const filteredVillages =
    query.trim() === ""
      ? villages
      : villages.filter((v) =>
          v.name.toLowerCase().includes(query.toLowerCase())
        );

  const showEmptyState = query.length > 0 && filteredVillages.length === 0;

  // --- UI logic ---
  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setQuery(selectedVillage?.name || "");
          setOpen(true);
        }}
        className="w-full justify-between"
      >
        {selectedVillage ? selectedVillage.name : "Pilih Desa"}
        <ChevronDown className="h-4 w-4 opacity-70" />
      </Button>
    );
  }

  return (
    <div className="relative w-full">
      <Command className="rounded-lg border shadow-sm w-full">
        {/* ✅ Correctly binds query input */}
        <Input
          placeholder="Cari nama desa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <CommandList>
          {showEmptyState ? (
            <CommandEmpty>Desa tidak ditemukan.</CommandEmpty>
          ) : (
            <CommandGroup heading="Daftar Desa">
              {filteredVillages.map((village) => (
                <CommandItem
                  key={village.kode}
                  value={village.kode.toString()}
                  onSelect={() => {
                    onChange(village.kode);
                    setQuery(""); // reset input
                    setOpen(false); // close list
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === village.kode ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {village.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export function AddOfficersForm({ villages }: Props) {
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
      if (fields.length < 1) throw new Error("Isi setidaknya 1 data petugas!");

      await handleAddOfficers(values);

      toast.success("Berhasil menambahkan petugas!");
      form.reset(); // ✅ reset form after success
    } catch (error) {
      const message =
        (error as Error).message ||
        "Terjadi kesalahan. Coba lagi beberapa saat!";
      toast.error("Gagal menambahkan petugas!", {
        description: message,
      });
      form.setError("root", { message });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tambah Petugas Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {form.formState.errors.root?.message && (
              <span className="text-sm text-destructive text-center block">
                {form.formState.errors.root?.message}
              </span>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg flex flex-col md:flex-row gap-4 justify-between"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name={`officers.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col gap-2">
                      <FormLabel>Username Petugas</FormLabel>
                      <FormControl>
                        <Input placeholder="contoh: budi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name={`officers.${index}.password`}
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col gap-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Minimal 6 karakter"
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
                    <FormItem className="flex-1">
                      <FormLabel>Desa</FormLabel>
                      <FormControl>
                        <VillageSelect
                          value={field.value}
                          onChange={field.onChange}
                          villages={villages}
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
                  className="self-end"
                >
                  <Trash className="mr-1 h-4 w-4" /> Hapus
                </Button>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  append({ name: "", password: "", kode_desa: 0 });
                }}
              >
                + Tambah Petugas Lain
              </Button>

              <Button
                disabled={form.formState.isLoading}
                type="submit"
                className="w-1/3"
              >
                {form.formState.isLoading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
