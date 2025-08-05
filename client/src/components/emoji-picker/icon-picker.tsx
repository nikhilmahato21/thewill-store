import React from "react";

import * as Icons from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconPickerProps = {
  value: string;
  onChange: (iconName: string) => void;
};

const iconEntries = Object.entries(Icons).filter(
  ([, val]) => typeof val === "function"
);

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredIcons = iconEntries.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-muted-foreground">
          {value &&
            Icons[value] &&
            React.createElement(Icons[value] as React.FC<any>, {
              className: "mr-2 h-4 w-4",
            })}
          {value || "Select an icon"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search icons..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[300px] overflow-auto">
            {filteredIcons.map(([name, Icon]) => (
              <CommandItem
                key={name}
                value={name}
                onSelect={() => {
                  onChange(name);
                  setOpen(false);
                }}
              >
                {React.createElement(Icon, { className: "mr-2 h-4 w-4" })}
                {name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
