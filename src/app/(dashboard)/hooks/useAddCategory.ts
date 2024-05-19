"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "../context";
import { useForm } from "@/context";

export const useAddCategory = () => {

    const router = useRouter();

    const {
        addCategory,
        fetchCategories,
    } = useDataContext();

    const { setShowCategoryForm } = useForm();

    const [addingCategory, setAddingCategory] = useState<boolean>(false);

    const addNewCategory = useCallback(async ({
        newCategory,
        errorCallback,
    }: {
        newCategory: { categoryName: string, categoryDescription: string, userId: string };
        errorCallback?: (err?: any) => void;
    }) => {

        setAddingCategory(true);

        const { categoryName, categoryDescription, userId } = newCategory;

        try {
            const response = await addCategory({ categoryName, categoryDescription, userId });
            setAddingCategory(false);
            setShowCategoryForm(false);
            return response;
        } catch (err) {
            errorCallback && errorCallback(err);
        }
    }, [addCategory, setAddingCategory, setShowCategoryForm]);

    const cancelAddCategory = useCallback(() => {
        setShowCategoryForm(false);
    }, [setShowCategoryForm]);

    return { 
        addCategory: addNewCategory,
        addingCategory,
        cancelAddCategory,
    };
};