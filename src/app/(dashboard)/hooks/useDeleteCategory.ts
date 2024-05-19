import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "../context";

export const useDeleteCategory = () => {

    const router = useRouter();

    const { deleteCategory, fetchCategories } = useDataContext();

    const removeCurrentCategory = useCallback((categoryId: string) => {
        deleteCategory({ categoryId })
            .then(() => fetchCategories({ revalidate: true }))
            .then(() => router.push("/dashboard"));
    }, [deleteCategory, fetchCategories, router]);

    return {
        deleteCategory: removeCurrentCategory
    };
};