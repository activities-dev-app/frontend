"use client";

import { useCallback, useState } from "react";
import { useDataContext } from "../context";

export const useDeleteActivity = () => {

    const { fetchActivities, deleteActivity } = useDataContext();

    const [deletingActivity, setDeletingActivity] = useState<boolean>(false);

    const deleteCurrentActivity = useCallback((activityId: string) => {
        setDeletingActivity(true);
        deleteActivity({ activityId })
            .then(() => fetchActivities({ revalidate: true }))
            .finally(() => setDeletingActivity(false));
    }, [deleteActivity, fetchActivities]);

    return {
        deleteCurrentActivity,
        deletingActivity,
    };
};