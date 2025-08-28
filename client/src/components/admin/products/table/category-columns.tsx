import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { CategoryType } from "@/types/api.type";

export const getCategoryColumns = (): ColumnDef<CategoryType>[] => {
  return [
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
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">
              {row.original.title}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="block lg:max-w-[300px] max-w-[200px] text-muted-foreground truncate">
              {row.original.description || "No description"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "parentCategory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent Category" />
      ),
      cell: ({ row }) => {
        const parentCategory = row.original.parentCategory;
        return (
          <div className="flex space-x-2">
            {parentCategory ? (
              <Badge variant="secondary">{parentCategory}</Badge>
            ) : (
              <Badge variant="outline">Root Category</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "categoryProducts",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Products" />
      ),
      cell: ({ row }) => {
        const products = row.original.categoryProducts;
        const count = products?.length || 0;
        return (
          <div className="flex space-x-2">
            <Badge variant="secondary" className="rounded-full">
              {count}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const isActive = row.original.isActive ?? true; // Default to true if not provided
        return (
          <div className="flex space-x-2">
            <Badge 
              variant={isActive ? "default" : "destructive"}
              className="capitalize"
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
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
        const hasImages = banner ;
        return (
          <div className="flex space-x-2">
            {hasImages ? (
              <div className="flex items-center space-x-2">
                <img
                  src={banner}
                  alt="Category banner"
                  className="w-8 h-8 rounded object-cover"
                />
                
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">No image</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <DataTableRowActions row={row} />;
      },
    },
  ];
};