import GoogleOAuthFailure from "@/page/auth/GoogleOAuthFailure";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import Account from "@/page/account/Account";
import Orders from "@/page/account/Orders";
import OrderDetails from "@/page/account/OrderDetails";
import Cart from "@/page/cart/Cart";
import Checkout from "@/page/checkout/Checkout";
import Wishlist from "@/page/account/Wishlist";
import Profile from "@/page/account/Profile";
import ProductDetails from "@/page/product/ProductDetails";
import Category from "@/page/category/Category";
import Home from "@/page/Home";
import { AUTH_ROUTES, BASE_ROUTE, PROTECTED_ROUTES } from "./routePaths";
import Dashboard from "@/page/workspace/Dashboard";
import AddProduct from "@/page/product/AddProduct";
import CreateCategory from "@/page/category/CreateCategory";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUp /> },
  { path: AUTH_ROUTES.GOOGLE_OAUTH_CALLBACK, element: <GoogleOAuthFailure /> },
];

export const protectedRoutePaths = [
    { path: PROTECTED_ROUTES.DASHBOARD, element: <Dashboard/> },
        { path: PROTECTED_ROUTES.ADD_PRODUCT, element: <AddProduct /> },
  { path: PROTECTED_ROUTES.ACCOUNT, element: <Account /> },
  { path: PROTECTED_ROUTES.CATEGORIES, element: <Category /> },

    { path: PROTECTED_ROUTES.CREATE_CATEGORY, element: <CreateCategory /> },
  { path: PROTECTED_ROUTES.ORDERS, element: <Orders /> },
  { path: PROTECTED_ROUTES.ORDER_DETAILS, element: <OrderDetails /> },
  { path: PROTECTED_ROUTES.CART, element: <Cart /> },
  { path: PROTECTED_ROUTES.CHECKOUT, element: <Checkout /> },
  { path: PROTECTED_ROUTES.WISHLIST, element: <Wishlist /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
];

export const baseRoutePaths = [
  { path: BASE_ROUTE.PRODUCT_DETAILS, element: <ProductDetails /> },
  { path: BASE_ROUTE.CATEGORY, element: <Category /> },
  { path: BASE_ROUTE.HOME, element: <Home /> },
];
