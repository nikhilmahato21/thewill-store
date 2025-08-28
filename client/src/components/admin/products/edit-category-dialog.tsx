
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import EditCategoryForm from "./table/edit-category-form";
import { CategoryType } from "@/types/api.type";

interface EditCategoryDialogProps {
  category: CategoryType;
  onClose?: () => void;
}

const EditCategoryDialog = ({ category, onClose }: EditCategoryDialogProps) => {
  return (
    <Dialog modal={true} open={true} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent className="sm:max-w-2xl max-h-auto my-5 border-0">
        <EditCategoryForm category={category} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
