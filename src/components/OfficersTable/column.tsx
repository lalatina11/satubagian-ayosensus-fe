"use client";

import { Officer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Officer>[] = [
  {
    id: "actions",
    accessorKey: "action",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Name
          <ArrowUpDown
            className={
              column.getIsSorted() === "asc" ? "rotate-180" : undefined
            }
          />
        </Button>
      );
    },
  },
  {
    accessorKey: "kode_desa",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Kode Desa
          <ArrowUpDown
            className={
              column.getIsSorted() === "asc" ? "rotate-180" : undefined
            }
          />
        </Button>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Keaktifan",
  },
  {
    accessorKey: "first_name",
    header: "Nama Depan",
  },
  {
    accessorKey: "middle_name",
    header: "Nama Tengah",
  },
  {
    accessorKey: "last_name",
    header: "Nama Belakang",
  },
];
