import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

const CreateCategory = () => {
  const [images, setImages] = useState<File[]>([]);

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
    <main className="flex flex-col gap-6 p-6  min-h-screen">
      <div className=" items-center justify-between p-6">
        <h2 className="text-2xl font-bold">New Category</h2>
        <p className="text-muted-foreground ">
  This category will be used to organize your products. Please ensure the name is unique and meaningful.
</p>

      </div>

      <div className="bg-white p-6 rounded-xl ">
        <form className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Product name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="Category name" />
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

  {/* Preview below the drop zone */}
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


          {/* Select Icon */}
          {/* <div>
            <label className="block text-sm font-semibold mb-1">
              Select category icon
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tshirt">T-shirt</SelectItem>
                <SelectItem value="shoe">Shoe</SelectItem>
                <SelectItem value="hat">Hat</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Save Button */}
          <Button className="w-full mt-2">Save</Button>
        </form>
      </div>
    </main>
  );
};

export default CreateCategory;
