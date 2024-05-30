"use client"

import { memo } from "react";
import { useForm, useTheme } from "@/context";
import { Categories, FilterComponent, SortingComponent } from "@/app/(dashboard)/components";
import { Button } from "@/components";
import Icon from "@/icons";


const DashboardSidePane = memo(() => {

    const { mode } = useTheme();

    return (
        <div className={`dashboard__side-pane dashboard__side-pane--${mode}`}>
            <Header />

            <div className={`dashboard__side-pane__main dashboard__side-pane__main--${mode}`}>
                <Categories />
            </div>

            <Footer />
        </div>
    );
});
DashboardSidePane.displayName = "DashboardSidePane";
export default DashboardSidePane;


const Header = memo(() => {
    return (
        <div className="dashboard__side-pane__header">
            <FilterComponent />
            <SortingComponent />
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