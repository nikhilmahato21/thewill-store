import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Check, ChevronsUpDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryType } from "@/types/api.type";

interface EditCategoryFormProps {
  category: CategoryType;
  onSuccess?: () => void;
}

// Demo data
const demoCategories = [
  {
    categoryId: "1",
    title: "Electronics",
    subCategories: [
      { categoryId: "1-1", title: "Smartphones" },
      { categoryId: "1-2", title: "Laptops" },
    ]
  },
  {
    categoryId: "2", 
    title: "Clothing",
    subCategories: [
      { categoryId: "2-1", title: "Men's Wear" },
      { categoryId: "2-2", title: "Women's Wear" },
    ]
  },
  {
    categoryId: "3",
    title: "Home & Garden",
    subCategories: [
      { categoryId: "3-1", title: "Furniture" },
      { categoryId: "3-2", title: "Decor" },
    ]
  }
];

const demoCategoryData = {
  title: "Sample Category",
  description: "This is a sample category description",
  banner: "https://via.placeholder.com/600x300",
  parentCategoryId: "1",
};

const EditCategoryForm = ({ category, onSuccess }: EditCategoryFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(demoCategoryData.banner);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [parentCategoryTitle, setParentCategoryTitle] = useState<string>("Electronics");
  console.log("Editing category:", category);
  
  const formSchema = z
    .object({
      title: z.string().trim().min(1, {
        message: "Category title is required",
      }),
      description: z.string().trim().min(1, {
        message: "Category description is required",
      }),
      isSubcategory: z.boolean().default(false),
      parentCategoryId: z.string().optional(),
      imageUrl: z.string().min(1, {
        message: "Image is required",
      }),
    })
    .refine(
      (data) => {
        if (data.isSubcategory && !data.parentCategoryId) {
          return false;
        }
        return true;
      },
      {
        message: "Parent category is required for subcategories",
        path: ["parentCategoryId"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: demoCategoryData.title,
      description: demoCategoryData.description,
      isSubcategory: !!demoCategoryData.parentCategoryId,
      parentCategoryId: demoCategoryData.parentCategoryId,
      imageUrl: demoCategoryData.banner,
    },
  });

  const isSubcategory = form.watch("isSubcategory");
  const parentCategoryId = form.watch("parentCategoryId");

  const handleImageUpload = (file: File) => {
    setImage(file);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate successful upload after progress completes
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      setUploadedImageUrl(mockUrl);
      form.setValue("imageUrl", mockUrl);
      form.clearErrors("imageUrl");

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    }, 1100);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setUploadedImageUrl("");
    setUploadProgress(0);
    form.setValue("imageUrl", "");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Simulate form submission
    console.log("Form submitted with values:", values);
    
    toast({
      title: "Success",
      description: "Category updated successfully",
    });

    onSuccess?.();
  };

  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* Toggle for Subcategory */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="is-subcategory"
            checked={isSubcategory}
            onCheckedChange={(checked) =>
              form.setValue("isSubcategory", Boolean(checked))
            }
          />
          <Label htmlFor="is-subcategory">Add as subcategory</Label>
        </div>

        {/* Category Title */}
        <div>
          <Label htmlFor="title" className="block text-sm font-semibold mb-1">
            {isSubcategory ? "Subcategory Title" : "Category Title"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            {...form.register("title")}
            placeholder={
              isSubcategory
                ? "Enter subcategory title"
                : "Enter category title"
            }
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        {/* Category Description */}
        <div>
          <Label htmlFor="description" className="block text-sm font-semibold mb-1">
            {isSubcategory
              ? "Subcategory Description"
              : "Category Description"}{" "}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            {...form.register("description")}
            placeholder={
              isSubcategory
                ? "Enter subcategory description"
                : "Enter category description"
            }
            rows={3}
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        {/* Parent Category Select */}
        <div
          className={`transition-all duration-300 overflow-hidden space-y-6 ${
            isSubcategory
              ? "max-h-[500px] opacity-100 scale-100 pointer-events-auto"
              : "max-h-0 opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div>
            <Label className="block text-sm font-semibold mb-1">
              Parent Category <span className="text-red-500">*</span>
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-muted-foreground font-normal"
                >
                  {parentCategoryTitle ||
                    "Select category or subcategory..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No result found.</CommandEmpty>
                    {demoCategories?.map((cat) => (
                      <CommandGroup key={cat.categoryId}>
                        <CommandItem
                          value={cat.title}
                          onSelect={() => {
                            form.setValue("parentCategoryId", cat.categoryId);
                            setParentCategoryTitle(cat.title);
                            setOpen(false);
                          }}
                          className="text-muted-foreground px-2 py-1.5 text-xs font-medium tracking-wide flex justify-between items-center"
                        >
                          {cat.title}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              parentCategoryId === cat.categoryId
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>

                        {cat?.subCategories?.map((sub) => (
                          <CommandItem
                            key={sub.categoryId}
                            value={`${cat.title} ${sub.title}`}
                            onSelect={() => {
                              form.setValue(
                                "parentCategoryId",
                                sub.categoryId
                              );
                              setParentCategoryTitle(
                                `${cat.title} → ${sub.title}`
                              );
                              setOpen(false);
                            }}
                            className="pl-6 flex flex-col items-start"
                          >
                            <div className="flex justify-between items-center w-full">
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground opacity-60">
                                  {cat.title}
                                </span>
                                <span className="text-sm">{sub.title}</span>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  parentCategoryId === sub.categoryId
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {isSubcategory && form.formState.errors.parentCategoryId && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.parentCategoryId.message}
              </p>
            )}
          </div>
        </div>

        {/* Upload Image */}
        <div className="transition-all duration-300 ease-in-out">
          <Label className="block text-sm font-semibold mb-2">
            Upload image <span className="text-red-500">*</span>
          </Label>

          {!image && !uploadedImageUrl && (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-52 text-muted-foreground text-sm text-center cursor-pointer hover:border-gray-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <label className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer">
                <Upload className="text-gray-500" />
                <span>
                  Drop your image here or{" "}
                  <span className="text-gray-500 underline">
                    click to browse
                  </span>
                </span>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          {(image || uploadedImageUrl) && (
            <div className="relative w-full">
              <img
                src={
                  uploadedImageUrl || (image ? URL.createObjectURL(image) : "")
                }
                alt="preview"
                className={`w-full h-52 object-cover rounded border transition-opacity ${
                  uploadProgress > 0 && uploadProgress < 100 ? "opacity-50" : "opacity-100"
                }`}
              />

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded flex items-center justify-center">
                  <div className="text-white text-sm font-medium">
                    Uploading...
                  </div>
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center gap-2">
                  <div className="w-16 bg-gray-600 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{uploadProgress}%</span>
                </div>
              )}

              {uploadProgress === 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full p-0"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {form.formState.errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.imageUrl.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit">
            Update Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryForm;