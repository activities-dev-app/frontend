"use client";

import { useSorting, useTheme } from "@/context";
import Icon from "@/icons";
import { Tooltip } from "react-tooltip";

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
                data-tooltip-id="a-z-id"
                data-tooltip-html={"Sort alphabetically"}
                data-tooltip-position-strategy="fixed"
                data-tooltip-place="top-start"
                data-tooltip-class-name={`sorting__tooltip sorting__tooltip--${mode}`}
                onClick={() => setSortType("a-z")}>
                <Icon
                    icon="sort-a-z"
                    className={
                        sortType === "a-z" ?
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon__selected--${mode} sorting__button__icon--a-z` :
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon--a-z`
                    }/>
            </button>
            <Tooltip
                id="a-z-id"
                opacity={1}
                noArrow={true}
            />
            <button
                className={
                    sortType === "date" ?
                    `button button__filter-categories sorting__button sorting__button__selected sorting__button--date` :
                    `button button__filter-categories sorting__button sorting__button--date`
                }
                data-tooltip-id="date-id"
                data-tooltip-html={"Sort by date"}
                data-tooltip-position-strategy="fixed"
                data-tooltip-place="top-start"
                data-tooltip-class-name={`sorting__tooltip sorting__tooltip--${mode}`}
                onClick={() => setSortType("date")}>
                <Icon
                    icon="calendar-clock"
                    className={
                        sortType === "date" ?
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon__selected--${mode} sorting__button__icon--date` :
                        `sorting__button__icon sorting__button__icon--${mode} sorting__button__icon--date`
                        }/>
            </button>
            <Tooltip
                id="date-id"
                opacity={1}
                noArrow={true}
            />
            {/* Add reverse button */}
        </div>
    );
}