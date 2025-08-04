
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


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

import { useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const CreateAttributeDialog = (props: { projectId?: string }) => {
     const [showAttributeModal, setShowAttributeModal] = useState(false);
     const [attributeOptions, setAttributeOptions] = useState([
    { label: "Color", value: "color" },
    { label: "Size", value: "size" },
    { label: "Material", value: "material" },
  ]);

// Attribute creation schema
const attributeSchema = z.object({
  name: z.string().min(1, "Attribute name is required"),
  values: z.string().min(1, "Values are required"),
  type: z.enum(['dropdown', 'multi-select', 'text', 'boolean']),
  
});
type AttributeFormValues = z.infer<typeof attributeSchema>;
     // Attribute form inside modal
       const attributeForm = useForm<AttributeFormValues>({
         resolver: zodResolver(attributeSchema),
         defaultValues: {
           name: "",
           values: "",
           type: "dropdown",
           
         },
       });
     
       const handleAttributeSubmit = (values: AttributeFormValues) => {
         const newAttribute = {
           label: values.name,
           value: values.name.toLowerCase().replace(/\s+/g, "_"),
         };
         console.log("Attribute data Data", values);
        //  setAttributeOptions((prev) => [...prev, newAttribute]);
        //  attributeForm.reset();
        //  setShowAttributeModal(false);
         
       };
      
  return (
    <div>
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
                          <SelectContent defaultValue={field.value}>
                            <SelectItem value="dropdown">Dropdown</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
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
    </div>
  );
};

export default CreateAttributeDialog;
