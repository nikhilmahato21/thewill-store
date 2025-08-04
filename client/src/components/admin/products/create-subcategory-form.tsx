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
import { Checkbox } from "@/components/ui/checkbox";

import { MultiSelect } from "@/components/ui/multi-select";
import CreateAttributeDialog from "./create-attribue-dialog";

// Schema with conditional validation
const formSchema = z.object({
  isSubcategory: z.boolean().default(true),
  name: z.string().min(1, "Subcategory name is required").optional(),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
  attributes: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateSubcategoryForm() {
  const attributeOptions = [
    { label: "Color", value: "color" },
    { label: "Size", value: "size" },
    { label: "Material", value: "material" },
  ];

  const categoryOptions = [
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Footwear", value: "footwear" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isSubcategory: true,
      name: "",
      categoryIds: [],
      attributes: [],
    },
  });

  const isSubcategory = form.watch("isSubcategory");

  const onSubmit = (values: FormValues) => {
    console.log("Subcategory Data", values);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Subcategory</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Add as Subcategory Checkbox */}
          <FormField
            control={form.control}
            name="isSubcategory"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="m-0">Add as subcategory</FormLabel>
              </FormItem>
            )}
          />

          {/* Conditional Fields */}
          {isSubcategory && (
            <>
              {/* Subcategory Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subcategory name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parent Category */}
              <FormField
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={categoryOptions}
                        defaultValue={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Select category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Attributes */}
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

          {/* Add Attribute Modal */}
          <CreateAttributeDialog />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Subcategory
          </Button>
        </form>
      </Form>
    </div>
  );
}
