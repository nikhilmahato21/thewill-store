export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  GOOGLE_OAUTH_CALLBACK: "/auth/google/callback",
  
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  ADD_PRODUCT: "/add-product",
  PRODUCTS: "/products",
  CREATE_CATEGORY: "/category/add",
  CATEGORIES:"/all-categories",
  ACCOUNT: "/account",
  ORDERS: "/account/orders",
  ORDER_DETAILS: "/account/orders/:orderId",
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  PROFILE: "/account/profile",
};

export const BASE_ROUTE = {
  PRODUCT_DETAILS: "/product/:productId",
  CATEGORY: "/category/:categoryId",
  HOME: "/",
};
