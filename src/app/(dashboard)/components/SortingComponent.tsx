"use client";

import { useSorting, useTheme } from "@/context";
import Icon from "@/icons";

export default function SortingComponent() {

    const { sortType, setSortType } = useSorting();
    const { mode } = useTheme();

    return (
        <div className={`sorting sorting--${mode}`}>
            <button
                className={
                    sortType === "a-z" ?
                    `button button__filter-categories sorting__button sorting__button__selected sorting__button--a-z` :
                    `button button__filter-categories sorting__button sorting__button--a-z`
                }
                onClick={() => setSortType("a-z")}>
                <Icon
                    icon="sort-a-z"
                    className={
                        sortType === "a-z" ?
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon__selected--${mode} sorting__button__icon--a-z` :
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon--a-z`
                    }/>
            </button>
            <button
                className={
                    sortType === "date" ?
                    `button button__filter-categories sorting__button sorting__button__selected sorting__button--date` :
                    `button button__filter-categories sorting__button sorting__button--date`
                }
                onClick={() => setSortType("date")}>
                <Icon
                    icon="calendar-clock"
                    className={
                        sortType === "date" ?
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon__selected--${mode} sorting__button__icon--date` :
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon--date`
                        }/>
            </button>
            {/* Add reverse button */}
        </div>
    );
}