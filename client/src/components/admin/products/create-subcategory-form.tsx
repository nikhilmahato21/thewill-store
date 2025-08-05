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

import { MultiSelect } from "@/components/ui/multi-select";


import CreateAttributeDialog from "./create-attribue-dialog";

// Main subcategory schema
const formSchema = z.object({
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  name: z.string().min(1, "Subcategory name is required"),
  attributes: z.array(z.string()).optional(),
});
type FormValues = z.infer<typeof formSchema>;



export default function CreateSubcategoryForm() {
 
  const attributeOptions= [
    { label: "Color", value: "color" },
    { label: "Size", value: "size" },
    { label: "Material", value: "material" },
  ];

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
          <CreateAttributeDialog/>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Subcategory
          </Button>
        </form>
      </Form>
    </div>
  );
}
