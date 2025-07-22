import {
  Roles,
  Permissions,
  PermissionType,
  RoleType,
} from "../enums/role.enum";

export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  OWNER: [
    Permissions.CREATE_PRODUCT,
    Permissions.EDIT_PRODUCT,
    Permissions.DELETE_PRODUCT,
    Permissions.VIEW_PRODUCT,

    Permissions.CREATE_ORDER,
    Permissions.EDIT_ORDER,
    Permissions.DELETE_ORDER,
    Permissions.VIEW_ORDER,
    Permissions.MANAGE_ORDER_STATUS,

    Permissions.MANAGE_INVENTORY,

    Permissions.ADD_USER,
    Permissions.EDIT_USER,
    Permissions.REMOVE_USER,
    Permissions.VIEW_USER,

    Permissions.CREATE_CATEGORY,
    Permissions.EDIT_CATEGORY,
    Permissions.DELETE_CATEGORY,
    Permissions.VIEW_CATEGORY,

    Permissions.CREATE_COUPON,
    Permissions.EDIT_COUPON,
    Permissions.DELETE_COUPON,
    Permissions.VIEW_COUPON,

    Permissions.VIEW_DASHBOARD,
    Permissions.VIEW_REPORTS,
  ],
  ADMIN: [
    Permissions.CREATE_PRODUCT,
    Permissions.EDIT_PRODUCT,
    Permissions.DELETE_PRODUCT,
    Permissions.VIEW_PRODUCT,

    Permissions.CREATE_ORDER,
    Permissions.EDIT_ORDER,
    Permissions.DELETE_ORDER,
    Permissions.VIEW_ORDER,
    Permissions.MANAGE_ORDER_STATUS,

    Permissions.MANAGE_INVENTORY,

    Permissions.ADD_USER,
    Permissions.EDIT_USER,
    Permissions.VIEW_USER,

    Permissions.CREATE_CATEGORY,
    Permissions.EDIT_CATEGORY,
    Permissions.DELETE_CATEGORY,
    Permissions.VIEW_CATEGORY,

    Permissions.CREATE_COUPON,
    Permissions.EDIT_COUPON,
    Permissions.DELETE_COUPON,
    Permissions.VIEW_COUPON,

    Permissions.VIEW_DASHBOARD,
    Permissions.VIEW_REPORTS,
  ],
  MEMBER: [
    Permissions.VIEW_PRODUCT,
    Permissions.CREATE_ORDER,
    Permissions.VIEW_ORDER,
    Permissions.VIEW_CATEGORY,
    Permissions.VIEW_COUPON,
    Permissions.VIEW_DASHBOARD,
  ],
};
