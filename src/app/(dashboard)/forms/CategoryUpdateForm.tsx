"use client";

import { useCallback, useEffect, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { useUpdateCategory } from "@/app/(dashboard)/hooks";
import { Category, CategoryUpdates } from "@/types";
import { useForm, useTheme } from "@/context";
import { Modal } from "@/components/modals";
import { Form, FormInput, FormButtonsGroup, FormButton } from "@/components/forms";

export default function CategoryUpdateForm({ category }: { category: Category | undefined }) {

    const { mode } = useTheme();

    const {
        emptyCategoryNameError,
        setEmptyCategoryNameError,
        evaluateCategoryName,
        showCategoryUpdateForm,
        setShowCategoryUpdateForm,
        resetInputErrors,
    } = useForm();

    const { categories } = useDataContext();

    const { updateCategory, updatingCategory, cancelUpdateCategory } = useUpdateCategory();

    const [categoryId, setCategoryId] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");

    useEffect(() => {
        if (category) {
            setCategoryId(category.key);
            setCategoryName(category.name);
            setCategoryDescription(category.description);
        }
    }, [category, setCategoryId, setCategoryName, setCategoryDescription]);

    const submit = useCallback(() => {
        evaluateCategoryName({ categoryName });

        const errorCallback = () => setEmptyCategoryNameError(true);

        const updates: CategoryUpdates = { name: categoryName, description: categoryDescription };

        if (categoryName.length > 0) {
            updateCategory({ categoryId, updates, errorCallback });
        }
    }, [
        categoryName,
        categoryDescription,
        categoryId,
        updateCategory,
        setEmptyCategoryNameError,
        evaluateCategoryName,
    ]);

    const cancel = useCallback(() => {
        cancelUpdateCategory();
        resetInputErrors();
        setCategoryName("");
        setCategoryDescription("");
    }, [
        cancelUpdateCategory,
        resetInputErrors,
        setCategoryName,
        setCategoryDescription,
    ]);

    const renderData = () => {
        return categories.map(category => {
            return <option key={category.key}>
                {category.name}
            </option>
        });
    };

    if (!showCategoryUpdateForm) return null;

    return (
        <Modal setShow={setShowCategoryUpdateForm} onDismiss={cancel}>
            <Form title="Edit category">

                <FormInput
                    id="category-name-input"
                    label="Category name"
                    value={categoryName}
                    setValue={setCategoryName}
                    placeholder="Category name"
                    autoFocus={true}
                    error={emptyCategoryNameError}
                    setError={setEmptyCategoryNameError}
                    errorMessage="Please fill in a group name for this activity"
                    withDatalist={true}
                    dataList={renderData}
                    mode={mode}
                />

                <FormInput
                    id="category-description-input"
                    label="Category description (optional)"
                    value={categoryDescription}
                    setValue={setCategoryDescription}
                    placeholder="Add short description"
                    mode={mode}
                />

                <FormButtonsGroup>
                    <FormButton
                        onClick={submit}
                        disabled={updatingCategory}
                        buttonType="submit"
                        label="Save"
                    />
                    <FormButton
                        onClick={cancel}
                        buttonType="cancel"
                        label="Cancel"
                    />
                </FormButtonsGroup>
            </Form>
        </Modal>
    );
}