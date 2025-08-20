import { FC, useState } from "react";
// Create this file
import { DataTable } from "./table/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { CategoryType } from "@/types/api.type";
import useCategoryTableFilter from "@/hooks/use-category-table-filter";
import { getCategoryColumns } from "./table/category-columns";

type Filters = ReturnType<typeof useCategoryTableFilter>[0];
type SetFilters = ReturnType<typeof useCategoryTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  filters: Filters;
  setFilters: SetFilters;
  onAddCategory?: () => void;
}

interface CategoryTableProps {
  categories?: CategoryType[];
}

const CategoryTable: FC<CategoryTableProps> = ({ categories }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useCategoryTableFilter();
  const columns = getCategoryColumns(); // Use category-specific columns

  const totalCount = categories?.length ?? 0;
  const isLoading = false;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleAddCategory = () => {
    // TODO: Open add category modal or navigate to add category page
    console.log("Add new category");
  };

  return (
    <div className="w-full relative">
      <DataTable<CategoryType, unknown>
        isLoading={isLoading}
        data={categories ?? []}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            filters={filters}
            setFilters={setFilters}
            onAddCategory={handleAddCategory}
          />
        }
      />
    </div>
  );
};

const DataTableFilterToolbar: FC<DataTableFilterToolbarProps> = ({
  isLoading,
  filters,
  setFilters,
  onAddCategory,
}) => {
  const handleFilterChange = (key: keyof Filters, value: string | null) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null && value !== ""
  );

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-4 lg:mb-0 lg:space-x-2 lg:space-y-0">
      <div className="flex flex-1 flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        <Input
          placeholder="Search categories..."
          value={filters.search || ""}
          onChange={(e) =>
            handleFilterChange("search", e.target.value || null)
          }
          className="h-8 w-full lg:w-[250px]"
        />

        <Select
          value={filters.status || ""}
          onValueChange={(value) =>
            handleFilterChange("status", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="h-8 w-full lg:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.parentCategory || ""}
          onValueChange={(value) =>
            handleFilterChange("parentCategory", value === "all" ? null : value)
          }
        >
          <SelectTrigger className="h-8 w-full lg:w-[150px]">
            <SelectValue placeholder="Parent Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="root">Root Categories</SelectItem>
            <SelectItem value="subcategory">Subcategories</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            disabled={isLoading}
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() =>
              setFilters({
                search: null,
                status: null,
                parentCategory: null,
              })
            }
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <Button
        onClick={onAddCategory}
        className="h-8 px-3"
        size="sm"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>
    </div>
  );
};

export default CategoryTable;
