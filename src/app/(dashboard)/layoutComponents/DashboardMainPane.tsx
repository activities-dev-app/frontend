"use client"

import { memo } from "react";
import { useForm, useTheme } from "@/context";
import { Button, Loading } from "@/components";
import { CategoriesManagerButtons } from "@/app/(dashboard)/components";
import { ActivitySelectionContext, useActivitySelection, useDataContext } from "@/app/(dashboard)/context";
import { useParams, usePathname } from "next/navigation";
import { ActivityUpdateForm } from "../forms";
import { ActivitiesManagerButtons } from "../components";
import DashboardAppHeader from "./DashboardAppHeader";
import Icon from "@/icons";
import Link from "next/link";


const DashboardMainPane = memo(({ children }: { children: React.ReactNode }) => {

    const { mode } = useTheme();

    return (
        <div className={`dashboard__main-pane dashboard__main-pane--${mode}`}>
            <DashboardAppHeader />

            <ActivitySelectionContext>
                <div className="dashboard__main-pane__variable-width">
                    <Header />

                    <div className={`dashboard__main-pane__main dashboard__main-pane__main--${mode}`}>
                        {children}
                    </div>
                </div>
            </ActivitySelectionContext>

            <Footer />
        </div>
    );
});
DashboardMainPane.displayName = "DashboardMainPane";
export default DashboardMainPane;


const Header = () => {
    const params = useParams();
    const { mode } = useTheme();
    const { activities, categories } = useDataContext();
    const { selectedActivity } = useActivitySelection();

    return (
        <div className={`
                dashboard__main-pane__header 
                dashboard__main-pane__header--${mode}`}>
            {
                params.id &&
                activities.map(activity => {
                    if (activity.key === params.id) {
                        return (
                            <div className="dashboard__main-pane__header__wrapper" key={activity.key}>
                                <Link
                                    className="dashboard__main-pane__header__back-button"
                                    href={`/dashboard/category/${activity.categoryId}`}>
                                    Back
                                </Link>
                                <div className={`dashboard__main-pane__header__details `}>
                                    {activity.name}
                                    <ActivitiesManagerButtons />
                                </div>
                            </div>
                        );
                    }
                })
            }
            {
                params.categoryId &&
                (
                    categories.filter(category => {
                        return category.key === params.categoryId;
                    })[0]?.name ||
                    <Loading />
                )
            }
            {
                params.categoryId && <CategoriesManagerButtons />
            }
            <ActivityUpdateForm activity={selectedActivity} />
        </div>
    );
};


const Footer = () => {
    const pathname = usePathname();
    const params = useParams();
    const { mode } = useTheme();
    const { setShowActivityForm } = useForm();

    return (
        <div className="dashboard__main-pane__footer">
            {
                (pathname === "/dashboard" || params.categoryId) &&

                <Button
                    buttonName="add"
                    themeMode={mode}
                    className="dashboard__main-pane__footer__button"
                    onClick={() => setShowActivityForm(true)}>
                    <span className={"dashboard__main-pane__footer__button__text"}>
                        New activity
                    </span>
                    <Icon icon="plus" className="dashboard__main-pane__footer__button__icon" />
                </Button>
            }
        </div>
    );
};
