/* 

In this file:

    Categories: MemoExoticComponent<() => JSX.Element>

    List: MemoExoticComponent<({ activityList, mode, params }: {
        activityList: ActivityList;
        mode: Mode;
        params: Params;
    }) => JSX.Element>

    GroupedActivities: MemoExoticComponent<({ activities }: {
        activities: Activity[];
    }) => JSX.Element[]>

    useActivityList: () => {
        activityList: {
            activities: Activity[];
            id: string;
            created_at: number;
            updated_at: number | null;
            name: string;
            date: number;
        }[];
        error: boolean;
    }

*/
"use client";

import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useFilter, useSorting, useTheme } from "@/context";
import { useDataContext } from "@/app/(dashboard)/context";
import { Activity, ActivityList } from "@/types";
import { Loading } from "@/components";
import Link from "next/link";

import { appData } from "../context/DataContext";
import { Mode } from "@/context/ThemeContext";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { Tooltip } from "react-tooltip";
import Icon from "@/icons";
import { ShownGroupedActivities } from "../layoutComponents/DashboardSidePane";


const Categories = memo(({
    shownGroupedActivities,
    setShownGroupedActivities
}: {
    shownGroupedActivities: ShownGroupedActivities,
    setShownGroupedActivities: React.Dispatch<React.SetStateAction<ShownGroupedActivities>>,
}) => {
    const { activityList, error } = useActivityList();
    const { mode } = useTheme();
    const params = useParams();


    if (!activityList) {
        return (
            <div className={`categories categories--${mode}`}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className={`categories categories--${mode}`}>
                <div className="error">
                    <p>An error ocurred!</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`categories categories--${mode}`}>
            <List
                activityList={activityList}
                mode={mode}
                params={params}
                shownGroupedActivities={shownGroupedActivities}
                setShownGroupedActivities={setShownGroupedActivities}
            />
        </div>
    );
});
Categories.displayName = "Categories";
export default Categories;


interface ListProps {
    activityList: ActivityList,
    mode: Mode,
    params: Params,
    shownGroupedActivities: ShownGroupedActivities,
    setShownGroupedActivities: React.Dispatch<React.SetStateAction<ShownGroupedActivities>>;
}
const List: FC<ListProps> = memo(({
    activityList,
    mode,
    params,
    shownGroupedActivities,
    setShownGroupedActivities
}: ListProps) => {

    const colapseGroup = useCallback(({ e, categoryId }: { e: React.MouseEvent, categoryId: string }) => {
        setShownGroupedActivities(shownGroupedActivities.filter(item => {
            return item.key !== categoryId;
        }));
    }, [setShownGroupedActivities, shownGroupedActivities]);

    const expandGroup = useCallback(({ e, categoryId }: { e: React.MouseEvent, categoryId: string }) => {
        if (e.currentTarget.id === categoryId) {
            setShownGroupedActivities([
                ...shownGroupedActivities,
                { key: categoryId, value: true }
            ]);
        }
    }, [setShownGroupedActivities, shownGroupedActivities]);

    return (
        <ul className={`
            categories__list 
            categories__list--${mode}`}>
            {
                activityList.map(category => {
                    const itemText = category.name ? category.name : `Topic-${category.id}`;
                    const categoryId = category.id;

                    return (
                        <li key={categoryId}
                            className={category.id === params.categoryId || category.activities.map(activity => activity.key).includes(String(params.id)) ?
                                `categories__list__item categories__list__item--${mode} categories__list__item__selected categories__list__item__selected--${mode}` :
                                `categories__list__item categories__list__item--${mode}`
                            }>
                            <div style={{ display: "flex" }}>
                                {
                                    shownGroupedActivities.filter(item => item.key === categoryId && item.value === true).length > 0 ?
                                        <button className="button" onClick={e => colapseGroup({ e, categoryId })}>
                                            <Icon icon="caret-down" />
                                        </button> :
                                        <button id={categoryId} className="button" onClick={e => expandGroup({ e, categoryId })}>
                                            <Icon icon="caret-right" />
                                        </button>
                                }
                                <Link
                                    id={categoryId}
                                    onClick={e => expandGroup({ e, categoryId })}
                                    href={`/dashboard/category/${category.id}`}
                                    className={`
                                    categories__list__item__link 
                                    categories__list__item__link--${mode}`}>
                                    <span
                                        data-tooltip-id={category.id}
                                        data-tooltip-html={itemText}
                                        data-tooltip-position-strategy="fixed"
                                        data-tooltip-place="top-start"
                                        data-tooltip-class-name={
                                            `categories__list__item__link__tooltip 
                                        categories__list__item__link__tooltip--${mode}`
                                        }
                                        data-tooltip-delay-show={250}
                                    >
                                        {itemText}
                                        <Tooltip
                                            id={category.id}
                                            opacity={1}
                                            noArrow={true}
                                        />
                                    </span>

                                </Link>
                            </div>

                            {shownGroupedActivities.filter(item => item.key === categoryId && item.value === true).length > 0 &&
                                <GroupedActivities activities={category.activities} />}
                        </li>
                    );
                })
            }
        </ul>
    );
});
List.displayName = "List";


interface GroupedActivitiesProps { activities: Activity[] }
const GroupedActivities: FC<GroupedActivitiesProps> = memo(({ activities }: GroupedActivitiesProps) => {

    const { id } = useParams<{ id: string }>();
    const { mode } = useTheme();

    return (
        <ul className="categories__list__item__activities-list">
            {
                activities.map(activity => {
                    return (
                        <li
                            key={activity.key}
                            className={
                                activity.key === id ? `
                                categories__list__item__activities-list__item categories__list__item__activities-list__item__selected
                                categories__list__item__activities-list__item categories__list__item__activities-list__item__selected--${mode}
                            ` : `
                                categories__list__item__activities-list__item
                                categories__list__item__activities-list__item--${mode}
                            `}>
                            <Link href={`/dashboard/activity/${activity.key}`}>
                                <span
                                    data-tooltip-id={activity.key}
                                    data-tooltip-html={activity.name}
                                    data-tooltip-position-strategy="fixed"
                                    data-tooltip-place="top-start"
                                    data-tooltip-class-name={
                                        `categories__list__item__activities-list__item__tooltip 
                                         categories__list__item__activities-list__item__tooltip--${mode}`
                                    }
                                >
                                    {activity.name}
                                    <Tooltip
                                        id={activity.key}
                                        opacity={1}
                                        noArrow={true}
                                    />
                                </span>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
});
GroupedActivities.displayName = "GroupedActivities";


const useActivityList = () => {

    const { matchText } = useFilter();
    const { sortType, sortedAlphabeticaly, sortedByDate } = useSorting();

    const { fetchActivityError } = useDataContext();

    const categories = appData.getCategories();
    const activities = appData.getActivities();

    const activityList = useMemo(() => {

        if (categories && activities) {

            let categoryIds: string[] = [];

            new Set(activities.map(activity => activity.categoryId))
                .forEach(id => categoryIds.push(id));

            categoryIds = categoryIds.filter(id => {
                const match = categories.filter(category => category.key === id).length > 0;
                if (!match) {
                    console.log("Non-correspondent categoryId: ", id);
                }
                return match;
            });

            const activityList: ActivityList = categoryIds.map(id => {

                const category = categories.filter(category => category.key === id)[0];

                return {
                    id,
                    created_at: category.created_at,
                    updated_at: category.updated_at,
                    date: category.updated_at || category.created_at,
                    name: category.name,
                    activities: activities
                        .filter(activity => activity.categoryId === id)
                        .map(activity => {
                            return { ...activity, date: activity.updated_at || activity.created_at };
                        }),
                };

            });

            return activityList;
        }

        return [];

    }, [categories, activities]);



    let filteredList = activityList
        .filter(activity => {
            return (
                activity.name && matchText(activity.name, "gim") ||
                activity.activities.filter(activity => {
                    return matchText(activity.name, "gim");
                }).length > 0
            );
        })
        .map(result => {
            const reducedActivities = result.activities.filter(item => {
                return matchText(item.name, "gim");
            });
            return (
                { ...result, activities: reducedActivities }
            );
        });

    if (sortType === "date") {
        sortedByDate(filteredList, "date");

        filteredList = filteredList.map(item => {
            const orderedActivities: Activity[] = item.activities;
            sortedByDate(orderedActivities, "date")
            return {
                ...item,
                activities: orderedActivities,
            };
        });
    } else {
        sortedAlphabeticaly(filteredList, "name");

        filteredList = filteredList.map(item => {
            const orderedActivities: Activity[] = item.activities;
            sortedAlphabeticaly(orderedActivities, "name");
            return {
                ...item,
                activities: orderedActivities,
            };
        });
    }

    return {
        activityList: filteredList,
        error: fetchActivityError,
    };
};