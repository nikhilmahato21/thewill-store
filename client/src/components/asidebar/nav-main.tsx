

import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import useWorkspaceId from "@/hooks/use-workspace-id";
import {
  LayoutDashboard,
  CirclePlus,
  List,
  Edit,
  Users,
  Settings,
  ShoppingCart,
  Box,
  Tag,
  SlidersHorizontal,
  Folder, 
  ShoppingBag,
  FolderOpen,
  ChevronDown,
   ChevronUp 
} from "lucide-react";

type SidebarItem =
  | {
      title: string;
      url: string;
      icon: React.ElementType;
      children?: undefined;
    }
  | {
      title: string;
      icon: React.ElementType;
      children: { title: string; url: string; icon: React.ElementType }[];
    };

export function NavMain() {
  const workspaceId = useWorkspaceId();
  const location = useLocation();
  const pathname = location.pathname;
  const [openSection, setOpenSection] = useState<string | null>(null);

  const items: SidebarItem[] = [
    {
      title: "Dashboard",
      url: `/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      icon: ShoppingBag ,
      children: [
        { title: "List", url: "/products", icon: List },
        { title: "Grid", url: "/products/grid", icon: List },
        { title: "Details", url: "/products/details", icon: Edit },
        { title: "Edit", url: "/products/edit", icon: Edit },
        { title: "Create", url: "/add-product", icon: CirclePlus },
      ],
    },
    {
      title: "Category",
      icon: FolderOpen,
      children: [
        { title: "List", url: "/category", icon: List },
        { title: "Add", url: "/category/add", icon: CirclePlus },
      ],
    },
    {
      title: "Inventory",
      icon: Box,
      children: [
        { title: "List", url: "/inventory", icon: List },
        { title: "Edit", url: "/inventory/edit", icon: Edit },
      ],
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      children: [
        { title: "List", url: "/orders", icon: List },
        { title: "Edit", url: "/orders/edit", icon: Edit },
      ],
    },
    {
      title: "Attributes",
      icon: SlidersHorizontal,
      children: [
        { title: "List", url: "/attributes", icon: List },
        { title: "Add", url: "/attributes/add", icon: CirclePlus },
      ],
    },
    {
      title: "Settings",
      url: `/workspace/${workspaceId}/settings`,
      icon: Settings,
    },
    {
      title: "Members",
      url: `/workspace/${workspaceId}/members`,
      icon: Users,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.children ? (
            <React.Fragment key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={item.children.some((child) => child.url === pathname)}
                  onClick={() =>
                    setOpenSection(openSection === item.title ? null : item.title)
                  }
                  style={{ justifyContent: "space-between" }}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <item.icon className="mr-2 h-4 w-4 " />
                    {item.title}
                  </span>
                  <span>
                    <span>
  {openSection === item.title ? (
    <ChevronUp className="h-4 w-4 ml-1 text-muted-foreground" />
  ) : (
    <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
  )}
</span>

                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {openSection === item.title && (
                <div className="ml-8">
                  {item.children.map((child) => (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton
                        isActive={child.url === pathname}
                        asChild
                        style={{ fontWeight: 400, fontSize: "15px" }}
                      >
                        <Link to={child.url}>{child.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </React.Fragment>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={item.url === pathname} asChild>
                <Link to={item.url} className="!text-[15px]">
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
