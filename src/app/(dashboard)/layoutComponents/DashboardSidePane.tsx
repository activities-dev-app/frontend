"use client"

import { memo, useCallback, useState } from "react";
import { useForm, useTheme } from "@/context";
import { Categories, FilterComponent, SortingComponent } from "@/app/(dashboard)/components";
import { Button } from "@/components";
import Icon from "@/icons";
import { Tooltip } from "react-tooltip";


const DashboardSidePane = memo(() => {

    const { mode } = useTheme();

    const {
        setShownGroupedActivities,
        shownGroupedActivities,
        collapseAll
    } = useCategoriesCollapsibles();

    return (
        <div className={`dashboard__side-pane dashboard__side-pane--${mode}`}>
            <Header collapseAll={collapseAll}/>

            <div className={`dashboard__side-pane__main dashboard__side-pane__main--${mode}`}>
                <Categories
                    setShownGroupedActivities={setShownGroupedActivities}
                    shownGroupedActivities={shownGroupedActivities}
                />
            </div>

            <Footer />
        </div>
    );
});
DashboardSidePane.displayName = "DashboardSidePane";
export default DashboardSidePane;


const Header = memo(({ collapseAll }: { collapseAll: () => void }) => {

    const { mode } = useTheme();
    return (
        <div className="dashboard__side-pane__header">
            <FilterComponent />
            {/* <SortingComponent /> */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <SortingComponent />
                <button
                    className="button"
                    data-tooltip-id="button-id"
                    data-tooltip-html={"Collapse all folders"}
                    data-tooltip-position-strategy="fixed"
                    data-tooltip-place="top-start"
                    data-tooltip-class-name={`dashboard__side-pane__header__tooltip dashboard__side-pane__header__tooltip--${mode}`}
                    onClick={collapseAll}>
                    <Icon icon="square-chevrons-up" />
                </button>
                <Tooltip
                    id="button-id"
                    opacity={1}
                    noArrow={true}
                />
            </div>
        </div>
    );
});
Header.displayName = "Header";


const Footer = memo(() => {
    const { setShowActivityForm } = useForm();
    const { mode } = useTheme();

    return (
        <div className="dashboard__side-pane__footer">
            <Button
                buttonName="add"
                themeMode={mode}
                className="dashboard__side-pane__footer__button"
                onClick={() => setShowActivityForm(true)}>

                <span className="dashboard__side-pane__footer__button__text">
                    Add
                </span>
                <Icon
                    icon="plus"
                    className="dashboard__side-pane__footer__button__icon" />
            </Button>
        </div>
    );
});
Footer.displayName = "Footer";

export type ShownGroupedActivities = { key: string, value: boolean }[];

const useCategoriesCollapsibles = () => {

    const [shownGroupedActivities, setShownGroupedActivities] = useState<ShownGroupedActivities>([]);

    const collapseAll = useCallback(() => {
        setShownGroupedActivities([]);
    }, [setShownGroupedActivities]);

    return { shownGroupedActivities, setShownGroupedActivities, collapseAll };
};