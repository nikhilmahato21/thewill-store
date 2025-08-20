import { useState } from "react";

interface CategoryFilters {
  search: string | null;
  status: string | null;
  parentCategory: string | null;
}

const useCategoryTableFilter = () => {
  const [filters, setFilters] = useState<CategoryFilters>({
    search: null,
    status: null,
    parentCategory: null,
  });

  return [filters, setFilters] as const;
};

export default useCategoryTableFilter;