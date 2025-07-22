export const Roles = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type RoleType = keyof typeof Roles;

export const Permissions = {
  // Product management
  CREATE_PRODUCT: "CREATE_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  VIEW_PRODUCT: "VIEW_PRODUCT",

  // Order management
  CREATE_ORDER: "CREATE_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  DELETE_ORDER: "DELETE_ORDER",
  VIEW_ORDER: "VIEW_ORDER",
  MANAGE_ORDER_STATUS: "MANAGE_ORDER_STATUS",

  // Inventory management
  MANAGE_INVENTORY: "MANAGE_INVENTORY",

  // User management
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  REMOVE_USER: "REMOVE_USER",
  VIEW_USER: "VIEW_USER",

  // Category management
  CREATE_CATEGORY: "CREATE_CATEGORY",
  EDIT_CATEGORY: "EDIT_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  VIEW_CATEGORY: "VIEW_CATEGORY",

  // Discount & coupon management
  CREATE_COUPON: "CREATE_COUPON",
  EDIT_COUPON: "EDIT_COUPON",
  DELETE_COUPON: "DELETE_COUPON",
  VIEW_COUPON: "VIEW_COUPON",

  // General
  VIEW_DASHBOARD: "VIEW_DASHBOARD",
  VIEW_REPORTS: "VIEW_REPORTS",
} as const;

export type PermissionType = keyof typeof Permissions;
