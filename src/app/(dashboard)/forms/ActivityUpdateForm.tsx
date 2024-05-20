"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDataContext } from "@/app/(dashboard)/context";
import { Activity, ActivityUpdates } from "@/types";
import { useUpdateActivity } from "@/app/(dashboard)/hooks";
import { useForm, useTheme } from "@/context";
import { FormInput, Form, FormButtonsGroup, FormButton } from "@/components/forms";
import { Modal } from "@/components/modals";

export default function ActivityUpdateForm({ activity }: { activity?: Activity | undefined }) {

    const { mode } = useTheme();

    const params = useParams<{ categoryId: string }>();

    const { categories } = useDataContext();

    const {
        updateActivity,
        updatingActivity,
        cancelUpdate
    } = useUpdateActivity(params.categoryId);

    const {
        emptyActivityNameError,
        emptyCategoryNameError,
        setEmptyCategoryNameError,
        setEmptyActivityNameError,
        setFetchError,
        evaluateActivityName,
        evaluateCategoryName,
        showActivityUpdateForm,
        setShowActivityUpdateForm,
        resetInputErrors,
    } = useForm();

    const [categoryName, setCategoryName] = useState<string>("");
    const [activityId, setActivityId] = useState<string>("");
    const [activityName, setActivityName] = useState<string>("");
    const [activityDescription, setActivityDescription] = useState<string>("");

    const initialize = useCallback(() => {
        if (activity) {
            const category = categories.filter(category => {
                return category.key === activity.categoryId;
            })[0];

            setActivityId(activity.key);
            setCategoryName(category.name);
            setActivityName(activity.name);
            setActivityDescription(activity.description);
        }
    }, [
        categories, 
        activity,
        setActivityId,
        setCategoryName,
        setActivityName,
        setActivityDescription,
    ]);

    useEffect(() => {
        initialize();        
    }, [initialize]);

    const submit = useCallback(() => {
        evaluateCategoryName({ categoryName });
        evaluateActivityName({ activityName });

        const updates: ActivityUpdates = {
            name: activityName,
            description: activityDescription,
        };

        const errorCallback = () => setFetchError(true);

        if (categoryName.length > 0 && activityName.length > 0) {
            activityId &&
                updateActivity({
                    activityId,
                    updates,
                    errorCallback
                });
        }
    }, [
        activityId,
        categoryName,
        activityName,
        activityDescription,
        updateActivity,
        setFetchError,
        evaluateActivityName,
        evaluateCategoryName,
    ]);

    const cancel = useCallback(() => {
        cancelUpdate();
        resetInputErrors();
        initialize();
    }, [cancelUpdate, resetInputErrors, initialize]);

    if (!showActivityUpdateForm) return null;

    return (
        <Modal setShow={setShowActivityUpdateForm} onDismiss={cancel}>
            <Form title="Update activity">

                <FormInput
                    id="category-name-input"
                    label="Category name"
                    value={categoryName || ""}
                    setValue={setCategoryName}
                    placeholder="Category name"
                    readOnly={true}
                    autoFocus={true}
                    error={emptyCategoryNameError}
                    setError={setEmptyCategoryNameError}
                    errorMessage="Please fill in a group name for this activity"
                    mode={mode}
                />

                <FormInput
                    id="activity-name-input"
                    label="Activity name"
                    value={activityName || ""}
                    setValue={setActivityName}
                    placeholder="Activity name"
                    error={emptyActivityNameError}
                    setError={setEmptyActivityNameError}
                    errorMessage="Please fill in a name for this activity"
                    mode={mode}
                />

                <FormInput
                    id="activity-description-input"
                    label="Activity description (optional)"
                    placeholder="Add short description"
                    value={activityDescription || ""}
                    setValue={setActivityDescription}
                    mode={mode}
                />

                <FormButtonsGroup>
                    <FormButton
                        onClick={submit}
                        disabled={updatingActivity}
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