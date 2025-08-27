import {
  PermissionType,
  TaskPriorityEnumType,
  TaskStatusEnumType,
} from "@/constant";

export type loginType = { email: string; password: string };
export type LoginResponseType = {
  success: boolean;
  message: string;
  data: {
    roles: string[];
    email: string;
    username: string;
  };
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

// USER TYPE
export type UserType = {
  userId: string;
  username: string;
  email: string;
  profilePicture: string | null;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
  roles?: string[]; // Added roles field
  
};

export type CurrentUserResponseType = {
  message: string;
  success: boolean;
  data: UserType;
};

//******** */ WORLSPACE TYPES ****************
// ******************************************
export type WorkspaceType = {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  inviteCode: string;
};

export type CreateWorkspaceType = {
  name: string;
  description: string;
};

export type EditWorkspaceType = {
  workspaceId: string;
  data: {
    name: string;
    description: string;
  };
};

export type CreateWorkspaceResponseType = {
  message: string;
  workspace: WorkspaceType;
};

export type AllWorkspaceResponseType = {
  message: string;
  workspaces: WorkspaceType[];
};

export type WorkspaceWithMembersType = WorkspaceType & {
  members: {
    _id: string;
    userId: string;
    workspaceId: string;
    role: {
      _id: string;
      name: string;
      permissions: PermissionType[];
    };
    joinedAt: string;
    createdAt: string;
  }[];
};

export type WorkspaceByIdResponseType = {
  message: string;
  workspace: WorkspaceWithMembersType;
};

export type ChangeWorkspaceMemberRoleType = {
  workspaceId: string;
  data: {
    roleId: string;
    memberId: string;
  };
};

export type AllMembersInWorkspaceResponseType = {
  message: string;
  members: {
    _id: string;
    userId: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string | null;
    };
    workspaceId: string;
    role: {
      _id: string;
      name: string;
    };
    joinedAt: string;
    createdAt: string;
  }[];
  roles: RoleType[];
};

export type AnalyticsResponseType = {
  message: string;
  analytics: {
    totalTasks: number;
    overdueTasks: number;
    completedTasks: number;
  };
};

export type PaginationType = {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  skip: number;
  limit: number;
};

export type RoleType = {
  _id: string;
  name: string;
};
// *********** MEMBER ****************

//******** */ PROJECT TYPES ****************
//****************************************** */
export type ProjectType = {
  _id: string;
  name: string;
  emoji: string;
  description: string;
  workspace: string;
  createdBy: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectPayloadType = {
  workspaceId: string;
  data: {
    emoji: string;
    name: string;
    description: string;
  };
};

export type ProjectResponseType = {
  message: "Project created successfully";
  project: ProjectType;
};

export type EditProjectPayloadType = {
  workspaceId: string;
  projectId: string;
  data: {
    emoji: string;
    name: string;
    description: string;
  };
};

//ALL PROJECTS IN WORKSPACE TYPE
export type AllProjectPayloadType = {
  workspaceId: string;
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  skip?: boolean;
};

export type AllProjectResponseType = {
  message: string;
  projects: ProjectType[];
  pagination: PaginationType;
};

// SINGLE PROJECT IN WORKSPACE TYPE
export type ProjectByIdPayloadType = {
  workspaceId: string;
  projectId: string;
};

//********** */ TASK TYPES ************************
//************************************************* */

export type CreateTaskPayloadType = {
  workspaceId: string;
  projectId: string;
  data: {
    title: string;
    description: string;
    priority: TaskPriorityEnumType;
    status: TaskStatusEnumType;
    assignedTo: string;
    dueDate: string;
  };
};

export type TaskType = {
  _id: string;
  title: string;
  description?: string;
  project?: {
    _id: string;
    emoji: string;
    name: string;
  };
  priority: TaskPriorityEnumType;
  status: TaskStatusEnumType;
  assignedTo: {
    _id: string;
    name: string;
    profilePicture: string | null;
  } | null;
  createdBy?: string;
  dueDate: string;
  taskCode: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AllTaskPayloadType = {
  workspaceId: string;
  projectId?: string | null;
  keyword?: string | null;
  priority?: TaskPriorityEnumType | null;
  status?: TaskStatusEnumType | null;
  assignedTo?: string | null;
  dueDate?: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
};

export type AllTaskResponseType = {
  message: string;
  tasks: TaskType[];
  pagination: PaginationType;
};

//********** */ ECOMMERCE TYPES ************************
//****************************************************** */

// CATEGORY TYPES
export type CategoryType = {
  _id: string;
  title: string; // Changed from 'name' to 'title'
  description?: string;
  slug?: string; // Made optional since it's not in your API response
  banner?: string; // Added banner field as array of strings
  categoryId: string; // Added categoryId field
  parentCategory?: string | null;
  subCategories?: CategoryType[] | null; // Added subCategories field
  categoryProducts?: any[] | null; // Added categoryProducts field
  isActive?: boolean; // Made optional since it's not in your API response
  createdAt?: string; // Made optional since it's not in your API response
  updatedAt?: string; // Made optional since it's not in your API response
};

export type CreateCategoryPayloadType = {
  title: string; // Changed from 'name' to 'title'
  description?: string;
  banner?: string; // Changed from 'image' to 'banner'
  parentCategory?: string;
};

export type EditCategoryPayloadType = {
  categoryId: string;
  data: {
    title: string; // Changed from 'name' to 'title'
    description?: string;
    banner?: string[]; // Changed from 'image' to 'banner'
    parentCategory?: string;
    isActive?: boolean;
  };
};

export type CategoryResponseType = {
  message: string;
  category: CategoryType;
};

export type AllCategoriesResponseType = {
  message: string;
  categories: CategoryType[];
  pagination: PaginationType;
};

// PRODUCT TYPES
export type ProductImageType = {
  url: string;
  alt?: string;
  isPrimary: boolean;
};

export type ProductVariantType = {
  _id: string;
  sku: string;
  price: number;
  comparePrice?: number;
  inventory: number;
  attributes: {
    size?: string;
    color?: string;
    material?: string;
    [key: string]: any;
  };
  images: ProductImageType[];
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  slug: string;
  category: CategoryType;
  brand?: string;
  tags: string[];
  images: ProductImageType[];
  variants: ProductVariantType[];
  basePrice: number;
  comparePrice?: number;
  isActive: boolean;
  isFeatured: boolean;
  inventory: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductPayloadType = {
  name: string;
  description: string;
  categoryId: string;
  brand?: string;
  tags: string[];
  basePrice: number;
  comparePrice?: number;
  inventory: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  images: Omit<ProductImageType, 'isPrimary'>[];
  variants?: Omit<ProductVariantType, '_id'>[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type EditProductPayloadType = {
  productId: string;
  data: Partial<CreateProductPayloadType> & {
    isActive?: boolean;
    isFeatured?: boolean;
  };
};

export type ProductResponseType = {
  message: string;
  product: ProductType;
};

export type AllProductsPayloadType = {
  categoryId?: string;
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  sortBy?: 'price' | 'name' | 'createdAt' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
};

export type AllProductsResponseType = {
  message: string;
  products: ProductType[];
  pagination: PaginationType;
  filters: {
    categories: CategoryType[];
    brands: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
};

// CART TYPES
export type CartItemType = {
  _id: string;
  product: ProductType;
  variant?: ProductVariantType;
  quantity: number;
  price: number;
  totalPrice: number;
};

export type CartType = {
  _id: string;
  userId: string;
  items: CartItemType[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  updatedAt: string;
};

export type AddToCartPayloadType = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type UpdateCartItemPayloadType = {
  cartItemId: string;
  quantity: number;
};

export type CartResponseType = {
  message: string;
  cart: CartType;
};

// ORDER TYPES
export type OrderStatusType = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export type ShippingAddressType = {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
};

export type OrderItemType = {
  _id: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    images: ProductImageType[];
  };
  variant?: {
    _id: string;
    sku: string;
    attributes: Record<string, any>;
  };
  quantity: number;
  price: number;
  totalPrice: number;
};

export type OrderType = {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItemType[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatusType;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'cod';
  shippingAddress: ShippingAddressType;
  billingAddress?: ShippingAddressType;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderPayloadType = {
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  shippingAddress: ShippingAddressType;
  billingAddress?: ShippingAddressType;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'cod';
  notes?: string;
  couponCode?: string;
};

export type OrderResponseType = {
  message: string;
  order: OrderType;
};

export type AllOrdersPayloadType = {
  status?: OrderStatusType;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  startDate?: string;
  endDate?: string;
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type AllOrdersResponseType = {
  message: string;
  orders: OrderType[];
  pagination: PaginationType;
};

// COUPON TYPES
export type CouponType = {
  _id: string;
  code: string;
  description?: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateCouponPayloadType = {
  code: string;
  description?: string;
  type: 'percentage' | 'fixed_amount';
  value: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  validFrom: string;
  validUntil: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
};

export type ValidateCouponPayloadType = {
  code: string;
  subtotal: number;
};

export type ValidateCouponResponseType = {
  message: string;
  isValid: boolean;
  discount: number;
  coupon?: CouponType;
};

// REVIEW TYPES
export type ReviewType = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateReviewPayloadType = {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
};

export type ReviewResponseType = {
  message: string;
  review: ReviewType;
};

export type AllReviewsResponseType = {
  message: string;
  reviews: ReviewType[];
  pagination: PaginationType;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
};

// WISHLIST TYPES
export type WishlistItemType = {
  _id: string;
  product: ProductType;
  addedAt: string;
};

export type WishlistType = {
  _id: string;
  userId: string;
  items: WishlistItemType[];
  updatedAt: string;
};

export type WishlistResponseType = {
  message: string;
  wishlist: WishlistType;
};

// SEARCH TYPES
export type SearchResultType = {
  products: ProductType[];
  categories: CategoryType[];
  suggestions: string[];
};

export type SearchResponseType = {
  message: string;
  results: SearchResultType;
  pagination: PaginationType;
};
