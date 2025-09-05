import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { CategoryType } from "@/types/api.type";
import EditCategoryDialog from "../edit-category-dialog";

interface DataTableRowActionsProps {
  row: Row< CategoryType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
 
  
  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    console.log("Delete item:", row.original);
    setIsDeleteDialogOpen(false);
  };

  // Check if the row is a CategoryType to get the ID
  const getCategoryId = () => {
    if ('id' in row.original) {
      return (row.original as CategoryType)._id;
    }
    return undefined;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isEditDialogOpen && (
        <EditCategoryDialog
          category={row?.original}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        isLoading={false}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the item."
      />
    </>
  );
}
