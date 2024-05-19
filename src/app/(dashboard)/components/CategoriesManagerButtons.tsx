"use client";

import { useState } from "react";
import { useForm, useModal, useTheme } from "@/context";
import { useCategory, useDeleteCategory } from "@/app/(dashboard)/hooks";
import { Button } from "@/components";
import { CategoryUpdateForm } from "../forms";
import { Category } from "@/types";
import Icon from "@/icons";

export default function CategoriesManagerButtons() {

    const { category } = useCategory();
    const { openDialog } = useModal();
    const { deleteCategory } = useDeleteCategory();
    const { setShowCategoryUpdateForm } = useForm();
    const { mode } = useTheme();

    const [selectedCategory, setSelectedCategory] = useState<Category>();

    return (
        <div
            id={category?.key}
            className={`category-manager__buttons category-manager__buttons--${mode}`}
        >
            <Button
                buttonName="update"
                className="category-manager__button"
                onClick={() => {
                    setSelectedCategory(category);
                    setShowCategoryUpdateForm(true);
                }}>
                <Icon icon="edit" className="category-manager__icon" />
            </Button>

            <Button
                buttonName="delete"
                className="category-manager__button"
                onClick={() => {
                    openDialog(`Confirm deleting ${category?.name}?`, () => {
                        category && deleteCategory(category.key);
                    });
                }}>
                <Icon icon="trash" className="category-manager__icon" />
            </Button>
            <CategoryUpdateForm category={selectedCategory} />
        </div>
    );
}