import {
    addCategory,
    deleteCategory,
    fetchCategories,
    updateCategory
} from "./categoriesStore";

import {
    addActivity,
    deleteActivity,
    fetchActivities,
    getActivitiesByCategoryId,
    updateActivity,
    deleteManyActivities,
} from "./activitiesStore";

import {
    fetchObjects,
    addObject,
    updateObject,
    deleteObject,
    fetchActivityObjectsOrdering,
    fetchObjectsOrdering,
    addObjectsOrdering,
    updateObjectsOrdering,
    deleteObjectsOrdering,
} from "./objectsStore";

export const dataStore = {
    addCategory,
    deleteCategory,
    fetchCategories,
    updateCategory,
    addActivity,
    deleteActivity,
    deleteManyActivities,
    fetchActivities,
    getActivitiesByCategoryId,
    updateActivity,
    fetchObjects,
    addObject,
    updateObject,
    deleteObject,
    fetchActivityObjectsOrdering,
    fetchObjectsOrdering,
    addObjectsOrdering,
    updateObjectsOrdering,
    deleteObjectsOrdering,
};