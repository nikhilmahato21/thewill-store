import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateCategory = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [selectedParent, setSelectedParent] = useState("");

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

      <div className="bg-white p-6 rounded-xl">
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
              <Select onValueChange={setSelectedParent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload Images */}
          <div>
            <label className="block text-sm font-semibold mb-2">
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
