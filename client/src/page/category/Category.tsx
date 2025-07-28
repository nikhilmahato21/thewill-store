import CategoryTable from "@/components/admin/products/category-table";
import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";


const Category = () => <div><div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Categories</h2>
          <p className="text-muted-foreground">
            Manage your categories and tasks efficiently.
          </p>
        </div>
        <CreateTaskDialog />
      </div>
      {/* {Task Table} */}
      <div>
        <CategoryTable />
      </div>
    </div></div>;
export default Category;