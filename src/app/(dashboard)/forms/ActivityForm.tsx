
"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDataContext } from "@/app/(dashboard)/context";
import { useCategory, useAddActivity } from "@/app/(dashboard)/hooks";
import { useForm, useTheme } from "@/context";
import { Form, FormInput, FormButtonsGroup, FormButton } from "@/components/forms";
import { Modal } from "@/components/modals";
import { redirectTo } from "@/app/actions";

export default function ActivityForm({ userId }: { userId: string }) {

    const { mode } = useTheme();

    const { categories, activities, fetchCategories, fetchActivities, addCategory, addObjectsOrdering } = useDataContext();
    const { category } = useCategory();
    const { addActivity, addingActivity, cancelAddActivity } = useAddActivity();
    const params = useParams();

    const {
        emptyActivityNameError,
        emptyCategoryNameError,
        setEmptyCategoryNameError,
        setEmptyActivityNameError,
        setFetchError,
        evaluateActivityName,
        evaluateCategoryName,
        showActivityForm,
        setShowActivityForm,
        resetInputErrors,
    } = useForm();

    const [categoryId, setCategoryId] = useState<string>();
    const [categoryName, setCategoryName] = useState<string>("");
    const [activityName, setActivityName] = useState<string>("");
    const [activityDescription, setActivityDescription] = useState<string>("");

    const initializeInputs = useCallback(() => {
        if (category) {
            setCategoryId(category.key);
            setCategoryName(category.name);
        } else {
            setCategoryId("");
            setCategoryName("");
        }

        if (params.id) {
            const activity = activities.filter(activity => activity.key === params.id)[0];
            if (activity) {
                const categoryId = activity && activity.categoryId
                const categoryName = categories.filter(category => category.key === categoryId)[0].name;
                setCategoryName(categoryName);
            }
        }

        setActivityName("");
        setActivityDescription("");
    }, [category, activities, categories, setCategoryId, setCategoryName, setActivityName, setActivityDescription, params.id]);

    useEffect(() => {
        initializeInputs();
    }, [initializeInputs, showActivityForm]);

    const submit = useCallback(() => {
        evaluateCategoryName({ categoryName });
        evaluateActivityName({ activityName });

        if (categoryName.length > 0 && activityName.length > 0) {

            const newActivity = (categoryId: string) => {
                return {
                    categoryId,
                    activityName,
                    activityDescription,
                    userId,
                };
            };

            const errorCallback = () => setFetchError(true);

            if (!categoryId) {
                if (userId) {
                    addCategory({ categoryName, categoryDescription: "", userId })
                        .then(r => {
                            return addActivity({ newActivity: newActivity(r.key), errorCallback });
                        })
                        .then(r => {
                            if (r) {
                                console.log(r);
                                addObjectsOrdering({ activityId: r.key, objectsOrdering: [] });
                            }
                            return r;
                        })
                        .then((r) => {
                            fetchCategories({ revalidate: true });
                            return r;
                        })
                        .then((r) => {
                            fetchActivities({ revalidate: true });
                            return r;
                        })
                        .then((r) => {
                            initializeInputs();
                            return r;
                        })
                        .then((r) => {
                            r && redirectTo(`/dashboard/activity/${r.key}`);
                        })
                        .catch(() => setFetchError(true));
                }
            } else {
                addActivity({ newActivity: newActivity(categoryId), errorCallback })
                    .then(r => {
                        fetchActivities({ revalidate: true });
                        initializeInputs();
                        return r;
                    })
                    .then(r => {
                        if (r) {
                            console.log(r);
                            addObjectsOrdering({ activityId: r.key, objectsOrdering: [] });
                        }
                        return r;
                    })
                    .then((r) => {
                        r && redirectTo(`/dashboard/activity/${r.key}`);
                    })
                    .catch(() => setFetchError(true));
            }
        }
    }, [
        categoryId,
        categoryName,
        activityName,
        activityDescription,
        addCategory,
        fetchCategories,
        fetchActivities,
        setFetchError,
        evaluateCategoryName,
        evaluateActivityName,
        addActivity,
        initializeInputs,
        userId,
    ]);

    const cancel = useCallback(() => {
        cancelAddActivity();
        resetInputErrors();
        initializeInputs();
    }, [cancelAddActivity, resetInputErrors, initializeInputs]);

    const renderData = () => {
        return categories.map(category => {
            return <option key={category.key}>
                {category.name}
            </option>
        });
    };

    if (!showActivityForm) return null;

    return (
        <Modal setShow={setShowActivityForm} onDismiss={cancel}>
            <Form title="Add activity">

                <FormInput
                    id="category-name-input"
                    label="Category name"
                    placeholder="Category name"
                    autoFocus={true}
                    value={categoryName}
                    setValue={setCategoryName}
                    error={emptyCategoryNameError}
                    setError={setEmptyCategoryNameError}
                    errorMessage="Please fill in a group name for this activity"
                    withDatalist={true}
                    dataList={renderData}
                    mode={mode}
                />

                <FormInput
                    id="activity-name-input"
                    label="Activity name"
                    placeholder="Activity name"
                    value={activityName}
                    setValue={setActivityName}
                    error={emptyActivityNameError}
                    setError={setEmptyActivityNameError}
                    errorMessage="Please fill in a name for this activity"
                    mode={mode}
                />

                <FormInput
                    id="activity-description-input"
                    label="Activity description (optional)"
                    placeholder="Add short description"
                    value={activityDescription}
                    setValue={setActivityDescription}
                    mode={mode}
                />

                <FormButtonsGroup>
                    <FormButton
                        onClick={submit}
                        disabled={addingActivity}
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