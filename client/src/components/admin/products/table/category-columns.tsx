"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/types/api.type";
import { ChevronDown, ChevronUp } from "lucide-react"; // ✅ use lucide icons

export const getCategoryColumns = (
  expandedRows: string[],
  toggleRow: (id: string) => void
): ColumnDef<CategoryType>[] => {
  return [
    {
      id: "expand",
      header: () => null,
      cell: ({ row }) => {
        const hasSubcategories = (row.original.subCategories ?? []).length > 0;
        if (!hasSubcategories) return null;
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleRow(row.original._id)}
            className="p-0 w-6 h-6 flex items-center justify-center" 
          >
            {expandedRows.includes(row.original._id) ? (
              <ChevronUp className="h-2 w-2" />
            ) : (
              <ChevronDown className="h-2 w-2" />
            )}
          </Button>
        );
      },
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category Name" />
      ),
      cell: ({ row }) => (
        <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <span className="block lg:max-w-[300px] max-w-[200px] text-muted-foreground truncate">
          {row.original.description || "No description"}
        </span>
      ),
    },
    {
      accessorKey: "parentCategory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent Category" />
      ),
      cell: ({ row }) => {
        const parentCategory = row.original.parentCategory;
        return parentCategory ? (
          <Badge variant="secondary">{parentCategory}</Badge>
        ) : (
          <Badge variant="outline">Root Category</Badge>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.original.isActive ?? true;
        return (
          <Badge
            variant={isActive ? "default" : "destructive"}
            className="capitalize"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "banner",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Banner" />
      ),
      cell: ({ row }) => {
        const banner = row.original.banner;
        return banner ? (
          <img
            src={banner}
            alt="Category banner"
            className="w-8 h-8 rounded object-cover"
          />
        ) : (
          <span className="text-muted-foreground text-sm">No image</span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
};
