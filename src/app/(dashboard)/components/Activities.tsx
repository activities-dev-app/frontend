"use client";

import { FC, memo } from "react";
import { Activity } from "@/types";
import { useTheme } from "@/context";
import { useDataContext } from "@/app/(dashboard)/context";
import Link from "next/link";

export default function Activities({ categoryId }: { categoryId: string }) {

    const { mode } = useTheme();
    
    const { activities } = useActivitiesListByCategoryId(categoryId);

    return (
        <div className={`activities activities--${mode}`}>
            <ActivitiesList activities={activities} />
        </div>
    );
};

type ActivitiesListProps = { activities: Activity[] }

const ActivitiesList: FC<ActivitiesListProps> = memo(({ activities }: ActivitiesListProps) => {

    const { mode } = useTheme();

    return (
        <ul className={`activities__list activities__list--${mode}`}>
            {
                activities.map(activity => {
                    return (
                        <li
                            key={activity.key}
                            className={`activities__list__item activities__list__item--${mode}`}>

                            <Link href={`/dashboard/activity/${activity.key}`}>
                                {activity.name}
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
});

ActivitiesList.displayName = "ActivitiesList";


const useActivitiesListByCategoryId = (categoryId: string) => {

    const { activities } = useDataContext();

    return {
        activities: activities.filter(activity => {
            return activity.categoryId === categoryId;
        }),
    };
};