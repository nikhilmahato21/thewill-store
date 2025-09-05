"use client";

import { FC, useState } from "react";

import useCategoryTableFilter from "@/hooks/use-category-table-filter";
import { CategoryType } from "@/types/api.type";
import { getCategoryColumns } from "./table/category-columns";
import { DataTable } from "./table/table";

type CategoryTableProps = {
  categories?: CategoryType[];
};

const CategoryTable: FC<CategoryTableProps> = ({ categories }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useCategoryTableFilter();

  // expanded row ids
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const columns = getCategoryColumns(expandedRows, toggleRow);

  const totalCount = categories?.length ?? 0;
  const isLoading = false;

  // flatten parent + children when expanded
  const buildData = (data: CategoryType[]): CategoryType[] => {
    let result: CategoryType[] = [];
    for (const cat of data) {
      result.push(cat);
      if (expandedRows.includes(cat._id) && cat.subCategories?.length) {
        // mark subs as "child rows"
        result.push(
          ...cat.subCategories.map((sub) => ({
            ...sub,
            parentCategory: cat.title, // keep parent reference
            _id: sub._id, // required unique key
            __isSub: true, // custom flag for styling
          }))
        );
      }
    }
    return result;
  };

  const tableData = buildData(categories ?? []);

  return (
    <div className="w-full relative">
      <DataTable<CategoryType, unknown>
        isLoading={isLoading}
        data={tableData}
        columns={columns}
        onPageChange={setPageNumber}
        onPageSizeChange={setPageSize}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        
      />
    </div>
  );
};

export default CategoryTable;
