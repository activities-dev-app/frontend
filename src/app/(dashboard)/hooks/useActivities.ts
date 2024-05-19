import { useDataContext } from "../context";

export const useActivities = (categoryId: string) => {

    const { activities } = useDataContext();

    return { activities: activities.filter(activity => {
        return activity.categoryId === categoryId;
    }) };
};
