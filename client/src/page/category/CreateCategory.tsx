import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Check, ChevronsUpDown, X } from "lucide-react";
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
import {
  createCategoryMutationFn,
  getAllCategoriesQueryFn,
  uploadMediaMutationFn,
} from "@/lib/api";

const categories = [
  {
    categoryId: "68ad7f45aae2867f3a03c918",
    title: "Clothing",
    parentCategoryId: null,
    subcategories: [
      {
        categoryId: "68ad7f45aae2867f3a03c919",
        title: "Shirts",
        parentCategoryId: "68ad7f45aae2867f3a03c918",
      },
      {
        categoryId: "68ad7f45aae2867f3a03c920",
        title: "Pants",
        parentCategoryId: "68ad7f45aae2867f3a03c918",
      },
    ],
  },
  {
    categoryId: "68af2308dfe3c6171cf9d29g",
    title: "Electronics",
    parentCategoryId: null,
    subcategories: [
      {
        categoryId: "68af2308dfe3c6171cf9d300",
        title: "Laptops",
        parentCategoryId: "68af2308dfe3c6171cf9d29f",
      },
      {
        categoryId: "68af2308dfe3c6171cf9d301",
        title: "Mobiles",
        parentCategoryId: "68af2308dfe3c6171cf9d29f",
      },
    ],
  },
  {
    categoryId: "68af2308dfe3c6171cf9d29f",
    title: "Footwear",
    parentCategoryId: null,
    subcategories: [
      {
        categoryId: "68af2308dfe3c6171cf9d401",
        title: "Sneakers",
        parentCategoryId: "68af2308dfe3c6171cf9d400",
      },
      {
        categoryId: "68af2308dfe3c6171cf9d402",
        title: "Sandals",
        parentCategoryId: "68af2308dfe3c6171cf9d400",
      },
    ],
  },
];

const CreateCategory = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [parentCategoryTitle, setParentCategoryTitle] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
const {
    data: categoriesData,
    isLoading,
    error,
    isError
} = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoriesQueryFn,
  });

  console.log('Categories data for input:', categoriesData);
  

  const { mutate: uploadMedia, isPending: isUploadingMedia } = useMutation({
    mutationFn: uploadMediaMutationFn,
  });

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: createCategoryMutationFn,
    }
  );

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
      title: "",
      description: "",
      isSubcategory: false,
      parentCategoryId: "",
      imageUrl: "",
    },
  });

  const isSubcategory = form.watch("isSubcategory");
  const parentCategoryId = form.watch("parentCategoryId");

  const handleImageUpload = (file: File) => {
    setImage(file);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    const imageFormData = new FormData();
    imageFormData.append("media", file);

    uploadMedia(imageFormData, {
      onSuccess: (imageResponse) => {
        setUploadProgress(100);
        setUploadedImageUrl(imageResponse?.data[0]?.url || "");
        form.setValue("imageUrl", imageResponse?.data[0]?.url || "");
        form.clearErrors("imageUrl");

        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });

        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      },
      onError: (error) => {
        clearInterval(progressInterval);
        setUploadProgress(0);
        setImage(null);
        setUploadedImageUrl("");

        toast({
          title: "Error",
          description: "Failed to upload image: " + error.message,
          variant: "destructive",
        });
      },
    });
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
    if (isCreatingCategory) return;

    const categoryData = {
      title: values.title,
      description: values.description,
      banner: values.imageUrl,
      ...(values.isSubcategory &&
        values.parentCategoryId && {
          parentCategoryId: values.parentCategoryId,
        }),
    };

    console.log("Category data:", categoryData);

    createCategory(categoryData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["categories"],
        });

        toast({
          title: "Success",
          description: `${
            isSubcategory ? "Subcategory" : "Category"
          } created successfully`,
        });

        navigate("/all-categories");
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
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* Category Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {isSubcategory
                ? "Subcategory Description"
                : "Category Description"}{" "}
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
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
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
                      {categoriesData?.map((cat) => (
                        <CommandGroup key={cat.categoryId}>
                          {/* Category as selectable */}
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

                          {/* Subcategories with parent category shown */}
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
            <label className="block text-sm font-semibold mb-2">
              Upload image <span className="text-red-500">*</span>
            </label>

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
                    disabled={isUploadingMedia}
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
                    isUploadingMedia ? "opacity-50" : "opacity-100"
                  }`}
                />

                {isUploadingMedia && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded flex items-center justify-center">
                    <div className="text-white text-sm font-medium">
                      Uploading...
                    </div>
                  </div>
                )}

                {isUploadingMedia && uploadProgress > 0 && (
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

                {!isUploadingMedia && (
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isCreatingCategory || isUploadingMedia || !uploadedImageUrl}
          >
            {isCreatingCategory ? "Creating category..." : "Save"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreateCategory;
