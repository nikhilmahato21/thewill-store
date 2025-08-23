import { API, ECOM_API } from "./axios-client";
import {
  CategoryType,
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
} from "@/types/api.type";

// Use API for existing functions
export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => await API.post("/auth/logout")  ;

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };



// Use ECOM_API for e-commerce functions
export const getProductsQueryFn = async () => {
  const response = await ECOM_API.get("/products");
  return response.data;
};

export const getAllCategoriesQueryFn = async (): Promise<CategoryType[]> => {
  try {
    const response = await ECOM_API.get("/public/category/all-categories"); // Use ECOM_API instead of fetch
    const data = response.data;
    
    // If your API returns { data: CategoryType[] }
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // If your API returns { categories: CategoryType[] }
    if (data.categories && Array.isArray(data.categories)) {
      return data.categories;
    }
    
    // If your API returns CategoryType[] directly
    if (Array.isArray(data)) {
      return data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
