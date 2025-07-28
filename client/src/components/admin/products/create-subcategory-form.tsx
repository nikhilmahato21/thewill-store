import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Main subcategory schema
const formSchema = z.object({
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  name: z.string().min(1, "Subcategory name is required"),
  attributes: z.array(z.string()).optional(),
});
type FormValues = z.infer<typeof formSchema>;

// Attribute creation schema
const attributeSchema = z.object({
  name: z.string().min(1, "Attribute name is required"),
  values: z.string().min(1, "Values are required"),
  type: z.enum(["color", "select"]),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});
type AttributeFormValues = z.infer<typeof attributeSchema>;

export default function CreateSubcategoryForm() {
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [attributeOptions, setAttributeOptions] = useState([
    { label: "Color", value: "color" },
    { label: "Size", value: "size" },
    { label: "Material", value: "material" },
  ]);

  const categoryOptions = [
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Footwear", value: "footwear" },
  ];

  // Main form for creating subcategory
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryIds: [],
      name: "",
      attributes: [],
    },
  });

  // Attribute form inside modal
  const attributeForm = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      values: "",
      type: "select",
      categoryIds: [],
    },
  });

  const handleAttributeSubmit = (values: AttributeFormValues) => {
    const newAttribute = {
      label: values.name,
      value: values.name.toLowerCase().replace(/\s+/g, "_"),
    };

    setAttributeOptions((prev) => [...prev, newAttribute]);
    attributeForm.reset();
    setShowAttributeModal(false);
  };

  const onSubmit = (values: FormValues) => {
    console.log("Subcategory Data", values);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Subcategory</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Categories */}
          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={categoryOptions}
                    defaultValue={field.value || []}
                    onValueChange={field.onChange}
                    placeholder="Select categories"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subcategory Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. T-Shirts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assign Attributes */}
          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assign Attributes</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={attributeOptions}
                    defaultValue={field.value || []}
                    onValueChange={field.onChange}
                    placeholder="Select attributes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add New Attribute Modal */}
          <Dialog open={showAttributeModal} onOpenChange={setShowAttributeModal}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                [+] Add New Attribute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Add New Attribute</h3>
              <Separator className="my-2" />
              <Form {...attributeForm}>
                <form onSubmit={attributeForm.handleSubmit(handleAttributeSubmit)} className="space-y-4">
                  {/* Attribute Name */}
                  <FormField
                    control={attributeForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Material" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Values */}
                  <FormField
                    control={attributeForm.control}
                    name="values"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Values (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Cotton, Linen, Silk" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={attributeForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="color">Color</SelectItem>
                            <SelectItem value="select">Select</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Categories this attribute belongs to */}
                  <FormField
                    control={attributeForm.control}
                    name="categoryIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign to Categories</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={categoryOptions}
                            defaultValue={field.value || []}
                            onValueChange={field.onChange}
                            placeholder="Select categories"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Add Attribute
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Subcategory
          </Button>
        </form>
      </Form>
    </div>
  );
}
