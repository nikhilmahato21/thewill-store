import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  const [images, setImages] = useState<File[]>([]);
  const [isSubcategory, setIsSubcategory] = useState(false);
 
   const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <main className="flex flex-col gap-6 p-6 min-h-screen">
      <div className="items-center justify-between p-6">
        <h2 className="text-2xl font-bold">New Category</h2>
        <p className="text-muted-foreground">
          This category will be used to organize your products. Please ensure the name is unique and meaningful.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl overflow-hidden">
        <form className="space-y-6">
          {/* Toggle for Subcategory */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-subcategory"
              checked={isSubcategory}
              onCheckedChange={(checked) => setIsSubcategory(Boolean(checked))}
            />
            <Label htmlFor="is-subcategory">Add as subcategory</Label>
          </div>

          {/* Category or Subcategory Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              {isSubcategory ? "Subcategory Name" : "Category Name"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <Input placeholder={isSubcategory ? "Enter subcategory name" : "Enter category name"} />
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
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between text-muted-foreground font-normal "
    >
      {value || "Select category or subcategory..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
    <Command>
      <CommandInput placeholder="Search..." className="h-9" />
      <CommandList>
        <CommandEmpty>No result found.</CommandEmpty>
        {categories.map((cat) => (
          
          <CommandGroup key={cat.name} heading={cat.name}>
            {/* Category itself as selectable */}
            <CommandItem
  value={cat.name}
  onSelect={(currentValue) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  }}
  className={cn(
    "text-muted-foreground px-2 py-1.5 text-xs font-medium  tracking-wide", // mimic CommandLabel
    "hover:bg-transparent hover:cursor-pointer",
    "flex justify-between items-center"
  )}
>
  {cat.name}
  <Check
    className={cn(
      "ml-auto h-4 w-4",
      value === cat.name ? "opacity-100" : "opacity-0"
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
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
      }}
    >
      {sub}
      <Check
        className={cn(
          "ml-auto h-4 w-4",
          value === subValue ? "opacity-100" : "opacity-0"
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


            </div>
          </div>

          {/* Upload Images */}
          <div className="transition-all duration-300 ease-in-out" >
            <label className="block text-sm font-semibold mb-2 ">
              Upload images <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-52 text-muted-foreground text-sm text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <label className="flex flex-col items-center justify-center gap-2 w-full h-full cursor-pointer">
                <Upload className="text-gray-500" />
                <span>
                  Drop your images here or select{" "}
                  <span className="text-gray-500 underline">click to browse</span>
                </span>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt={`preview-${idx}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-2">Save</Button>
        </form>
      </div>
    </main>
  );
};

export default CreateCategory;
