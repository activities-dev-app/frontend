"use client";

import { useCallback, useEffect, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { useAddCategory } from "@/app/(dashboard)/hooks";
import { Modal } from "@/components/modals";
import { useForm, useTheme } from "@/context";
import { Form, FormInput, FormButtonsGroup, FormButton } from "@/components/forms";

export default function CategoryForm({userId}: {userId: string}) {

    const { mode } = useTheme();

    const {
        emptyCategoryNameError,
        setEmptyCategoryNameError,
        evaluateCategoryName,
        showCategoryForm,
        setShowCategoryForm,
        resetInputErrors,
    } = useForm();

    const { categories } = useDataContext();

    const { addCategory, addingCategory, cancelAddCategory } = useAddCategory();

    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");

    const submit = useCallback(() => {
        evaluateCategoryName({ categoryName });

        const newCategory = { categoryName, categoryDescription, userId };
        const errorCallback = () => setEmptyCategoryNameError(true);

        if (categoryName.length > 0) {
            addCategory({ newCategory, errorCallback });
        }
    }, [
        categoryName,
        categoryDescription,
        userId,
        addCategory,
        setEmptyCategoryNameError,
        evaluateCategoryName,
    ]);

    const cancel = useCallback(() => {
        cancelAddCategory();
        resetInputErrors();
        setCategoryName("");
        setCategoryDescription("");
    }, [
        cancelAddCategory, 
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

    if (!showCategoryForm) return null;

    return (
        <Modal setShow={setShowCategoryForm} onDismiss={cancel}>
            <Form title="Add a new category">

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
                        disabled={addingCategory}
                        buttonType="submit"
                        label="Add"
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