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
    const response = await ECOM_API.get("/public/category/all-categories"); 
    console.log(response?.data);
    
    return response?.data?.data || [];
  
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategoryMutationFn = async (formData: FormData) => {
  try {
    const response = await ECOM_API.post("/admin/category/create-category", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error: any) {
    console.log("Error creating category:", error);
    
    throw new Error("Failed to create category");
  }
};