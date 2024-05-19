"use server";

import { cache } from "react"; 
import { dataApi } from "@/app/axiosInstance";
import { Category, CategoryUpdates } from "@/types";

/* Fetch categories */
export const fetchCategories = cache(async (userId: string) => {
    try {
        const response = await dataApi.get(`/categories/${userId}`);
        return response.data as Category[];
    } catch (err) {
        console.log(err);
        return null;
    }
});


/* Add category */
export async function addCategory({
    categoryName,
    categoryDescription,
    userId,
}: {
    categoryName: string;
    categoryDescription: string;
    userId: string;
}) {
    return (
        await dataApi.post("/categories", {
            "name": categoryName.toLowerCase(),
            "description": categoryDescription.toLowerCase(),
            "userId": userId,
        })
    ).data as Category;
}


/* Update category */
export async function updateCategory({
    categoryId, updates
}: {
    categoryId: string, updates: CategoryUpdates
}) {
    return (
        await dataApi.put(`/category/${categoryId}`, updates)
    ).data as Category;
}


/* Delete category */
export async function deleteCategory(categoryId: string) {
    return (
        await dataApi.delete(`/category/${categoryId}`)
    ).data as null;
}