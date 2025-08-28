import { API, ECOM_API } from "./axios-client";
import {
  CategoryType,
  CreateCategoryPayloadType,
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
} from "@/types/api.type";

// Use API for existing functions
export const loginMutationFn = async (
  data: loginType
): Promise<LoginResponseType> => {
  const response = await ECOM_API.post("/auth/user/login", data);
  return response.data;
};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => await API.post("/auth/logout");

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await ECOM_API.get(`/auth/user/validate-token`);
    return response.data;
  };

// Use ECOM_API for e-commerce functions
export const getProductsQueryFn = async () => {
  const response = await ECOM_API.get("/products");
  return response.data;
};

export const getAllCategoriesQueryFn = async (): Promise<CategoryType[]> => {
  try {
    const response = await ECOM_API.get("/aladdin/public/category/all-categories");
    console.log(response?.data);

    return response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategoryMutationFn = async (data: CreateCategoryPayloadType) => {
  console.log("Form Data entries:", data);

  try {
    const response = await ECOM_API.post(
      "/aladdin/admin/category/create-category",
      data
    );
    return response?.data;
  } catch (error: any) {
    console.log("Error creating category:", error);

    throw new Error("Failed to create category");
  }
};

export const uploadMediaMutationFn = async (formData: FormData) => {
  try {
    const response = await ECOM_API.post(
      "/aladdin/admin/media/upload-media",
      formData
    );
    return response?.data;
  } catch (error: any) {
    console.log("Error uploading media:", error);
    throw new Error("Failed to upload media");
  }
};

export const updateCategoryMutationFn = async (
  id: string,
  data: CreateCategoryPayloadType
) => {
  console.log("Updating category with ID:", id, "Data:", data);

  try {
    const response = await ECOM_API.put(
      `/aladdin/admin/category/update-category/${id}`,
      data
    );
    return response?.data;
  } catch (error: any) {
    console.log("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};