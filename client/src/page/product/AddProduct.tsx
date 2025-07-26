import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";

const categories = ["Shoes", "Clothing", "Accessories"];
const brands = ["Nike", "Adidas", "Puma"];
const genders = ["Male", "Female", "Unisex"];
const sizes = [
  "EU - 44",
  "EU - 38.5",
  "EU - 39",
  "EU - 40",
  "EU - 41.5",
  "EU - 42",
  "EU - 43",
];

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  // Drag & drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setImages(Array.from(e.dataTransfer.files));
    }
  };

  // Size selection handler
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  return (
    <main className="flex flex-1 flex-col md:flex-row gap-8 py-4 md:pt-3">
      {/* Left: Product Details */}
      <div className="flex-1 bg-white rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
          <p className="text-muted-foreground">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="font-medium text-sm mb-1 block">
              Product name <span className="text-red-500">*</span>
            </label>
            <Input maxLength={20} placeholder="Enter product name" />
            <div className="text-xs text-muted-foreground mt-1">
              Do not exceed 20 characters when entering the product name.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-medium text-sm mb-1 block">
                Category <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="font-medium text-sm mb-1 block">
                Gender <span className="text-red-500">*</span>
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="font-medium text-sm mb-1 block">
              Brand <span className="text-red-500">*</span>
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="font-medium text-sm mb-1 block">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea maxLength={100} placeholder="Description" rows={4} />
            <div className="text-xs text-muted-foreground mt-1">
              Do not exceed 100 characters when entering the product name.
            </div>
          </div>
        </form>
      </div>

      {/* Right: Images, Sizes, Date */}
      <div className="flex-1 bg-white rounded-lg p-6">
        <div>
          <label className="font-medium text-sm mb-2 block">Upload images</label>
          <div className="flex gap-2 mb-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-32 object-cover rounded border"
              />
            ))}
            {images.length < 4 && (
              <div
                className="flex flex-col items-center justify-center w-36  h-44 border-2 border-dashed rounded cursor-pointer text-muted-foreground p-2 text-center "
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center m-1">
                  <Upload />
                  <span className="text-xs">
                    Drop your images here or select{" "}
                    <span className="underline">click to browse</span>
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
            )}
          </div>
          <div className="text-xs text-muted-foreground mb-4">
            You need to add at least 4 images. Pay attention to the quality of
            the pictures you add, comply with the background color standards.
            Pictures must be in certain dimensions. Notice that the product shows
            all the details.
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="font-medium text-sm mb-1 block">Add size</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="EU - 44" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={
                    selectedSizes.includes(size) ? "default" : "outline"
                  }
                  className="px-3 py-1 text-xs"
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="font-medium text-sm mb-1 block">Product date</label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="dd/mm/yyyy"
                value={date ? date.toLocaleDateString() : ""}
                readOnly
                className="w-full"
              />
              <Button
                type="button"
                variant="outline"
                className="p-2"
                onClick={() => {
                  // Open calendar logic here
                }}
              >
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </div>
            {/* You can add a popover calendar here using your Calendar component */}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <Button className="flex-1">Add product</Button>
          <Button className="flex-1" variant="outline">
            Save product
          </Button>
          <Button className="flex-1" variant="secondary">
            Schedule
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;