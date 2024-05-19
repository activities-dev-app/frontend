"use client";

import { useCallback, useState } from "react";
import { useDataContext } from "../context";
import { useForm } from "@/context";
import { CategoryUpdates } from "@/types";

export const useUpdateCategory = () => {

    const { fetchCategories, updateCategory } = useDataContext();

    const { setShowCategoryUpdateForm } = useForm();

    const [updatingCategory, setUpdatingCategory] = useState<boolean>(false);

    const updateCurrentCategory = useCallback(({
        categoryId,
        updates,
        errorCallback,
    }: {
        categoryId: string;
        updates: CategoryUpdates;
        errorCallback: (err: any) => void;
    }) => {
        setUpdatingCategory(true);
        console.log(categoryId, updates, errorCallback);
        updateCategory({ categoryId, updates })
            .then(r => console.log("Updated category: ", r))
            .then(() => fetchCategories({ revalidate: true }))
            .catch(err => errorCallback(err))
            .finally(() => {
                setUpdatingCategory(false);
                setShowCategoryUpdateForm(false);
            });
    }, [updateCategory, fetchCategories, setShowCategoryUpdateForm]);

    const cancelUpdateCategory = useCallback(() => {
        setShowCategoryUpdateForm(false);
    }, [setShowCategoryUpdateForm]);

    return {
        updateCategory: updateCurrentCategory,
        updatingCategory,
        cancelUpdateCategory,
    };
};