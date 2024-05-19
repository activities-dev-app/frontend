import { Activity, Category } from "@/types";
import localforage from "localforage";

const dataStore = localforage.createInstance({
    name: "dataStore"
});


export const getCategories = async () => {
    return await dataStore.getItem("categories") as unknown as Category[];
};

export const setCategories = async (categories: Category[]) => {
    return await dataStore.setItem("categories", categories);
};

export const getActivities = async () => {
    return await dataStore.getItem("activities") as unknown as Activity[];
};

export const setActivities = async (activities: Activity[]) => {
    return await dataStore.setItem("activities", activities);
};
