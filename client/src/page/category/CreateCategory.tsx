import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Check, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { createCategoryMutationFn } from "@/lib/api";

const categories = [
  {
    name: "Clothing",
    subcategories: ["Shirts", "Jeans", "Jackets"],
  },
  {
    name: "Electronics",
    subcategories: ["Shirts", "Mobiles"],
  },
  {
    name: "Footwear",
    subcategories: ["Sneakers", "Sandals"],
  },
];



const CreateCategory = () => {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategoryMutationFn,
  });

  const formSchema = z.object({
    title: z.string().trim().min(1, {
      message: "Category title is required",
    }),
    description: z.string().trim().min(1, {
      message: "Category description is required",
    }),
    isSubcategory: z.boolean().default(false),
    parentCategory: z.string().optional(),
    image: z.instanceof(File, {
      message: "Image is required",
    }),
  }).refine((data) => {
    if (data.isSubcategory && !data.parentCategory) {
      return false;
    }
    return true;
  }, {
    message: "Parent category is required for subcategories",
    path: ["parentCategory"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isSubcategory: false,
      parentCategory: "",
    },
  });

  const isSubcategory = form.watch("isSubcategory");
  const parentCategory = form.watch("parentCategory");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      form.setValue("image", file);
      form.clearErrors("image");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      form.setValue("image", file);
      form.clearErrors("image");
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    
    
    if (isPending) return;

    // Create FormData for file upload
    const formData = new FormData();
    
    // Create category object with title and description
    const categoryData = {
      title: values.title,
      description: values.description,
    };
    
    formData.append('category', JSON.stringify(categoryData));
    // formData.append('isSubcategory', values.isSubcategory.toString());
    // if (values.parentCategory) {
    //   formData.append('parentCategory', values.parentCategory);
    // }
    if (values.image) {
      formData.append('banner', values.image); // Changed from 'image' to 'banner'
    }
   

    mutate(formData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        toast({
          title: "Success",
          description: `${isSubcategory ? "Subcategory" : "Category"} created successfully`,
        });

        // Navigate back to categories list or wherever appropriate
        navigate('/categories');
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="flex flex-col gap-6 p-6 min-h-screen">
      <div className="items-center justify-between p-6">
        <h2 className="text-2xl font-bold">New Category</h2>
        <p className="text-muted-foreground">
          This category will be used to organize your products. Please ensure
          the name is unique and meaningful.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl overflow-hidden">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <label className="block text-sm font-semibold mb-1">
              {isSubcategory ? "Subcategory Title" : "Category Title"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              {...form.register("title")}
              placeholder={
                isSubcategory
                  ? "Enter subcategory title"
                  : "Enter category title"
              }
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          {/* Category Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {isSubcategory ? "Subcategory Description" : "Category Description"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              {...form.register("description")}
              placeholder={
                isSubcategory
                  ? "Enter subcategory description"
                  : "Enter category description"
              }
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>

          {/* Smooth Reveal: Parent Category Select */}
          <div
            className={`transition-all duration-300 overflow-hidden space-y-6 ${
              isSubcategory
                ? "max-h-[500px] opacity-100 scale-100 pointer-events-auto"
                : "max-h-0 opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {/* Parent Category */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Parent Category <span className="text-red-500">*</span>
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-muted-foreground font-normal"
                  >
                    {parentCategory || "Select category or subcategory..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No result found.</CommandEmpty>
                      {categories.map((cat) => (
                        <CommandGroup key={cat.name}>
                          {/* Category as selectable */}
                          <CommandItem
                            value={cat.name}
                            onSelect={(currentValue) => {
                              const newValue = currentValue === parentCategory ? "" : currentValue;
                              form.setValue("parentCategory", newValue);
                              setOpen(false);
                            }}
                            className="text-muted-foreground px-2 py-1.5 text-xs font-medium tracking-wide flex justify-between items-center"
                          >
                            {cat.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                parentCategory === cat.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>

                          {/* Subcategories */}
                          {cat.subcategories.map((sub) => {
                            const subValue = `${cat.name}-${sub}`;
                            return (
                              <CommandItem
                                key={subValue}
                                value={subValue}
                                onSelect={(currentValue) => {
                                  const newValue = currentValue === parentCategory ? "" : currentValue;
                                  form.setValue("parentCategory", newValue);
                                  setOpen(false);
                                }}
                                className="pl-6"
                              >
                                {sub}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    parentCategory === subValue
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {isSubcategory && form.formState.errors.parentCategory && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.parentCategory.message}</p>
              )}
            </div>
          </div>

          {/* Upload Image */}
          <div className="transition-all duration-300 ease-in-out">
            <label className="block text-sm font-semibold mb-2">
              Upload image <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-52 text-muted-foreground text-sm text-center cursor-pointer"
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

            {form.formState.errors.image && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.image.message}</p>
            )}

            {/* Image Preview */}
            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? "Creating..." : "Save"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreateCategory;
