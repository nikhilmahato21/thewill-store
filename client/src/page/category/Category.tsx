import CategoryTable from "@/components/admin/products/category-table";
import { useQuery } from '@tanstack/react-query';
import { getAllCategoriesQueryFn } from '@/lib/api';

const Category = () => {
  const {
    data: categoriesData,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoriesQueryFn,
  });

  // Log the categories data
  console.log('Categories data:', categoriesData);

  if (isLoading) {
    return (
      <div className="w-full h-full flex-col space-y-8 pt-3">
        <div className="flex items-center justify-center h-64">
          <div>Loading categories...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex-col space-y-8 pt-3">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error?.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-full flex-col space-y-8 pt-3">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Categories</h2>
            <p className="text-muted-foreground">
              Manage your categories and organize your products efficiently.
            </p>
          </div>
        </div>
        {/* Category Table */}
        <div>
          <CategoryTable categories={categoriesData || []} />
        </div>
      </div>
    </div>
  );
};

export default Category;