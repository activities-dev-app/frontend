"use client";

import { memo } from "react";
import { FilterContext, SortingContext, useTheme } from "@/context";
import { Loading } from "@/components";
import { Confirm } from "@/components/modals";
import { CategoryForm, ActivityForm } from "@/app/(dashboard)/forms";
import { DataContext } from "@/app/(dashboard)/context";
import { Dashboard } from "@/app/(dashboard)/layoutComponents";
import { useAuth, useSession } from "@/app/auth/context";
import { LoadingPane } from "@/app/auth/components";

export default function Template({ children }: { children: React.ReactNode }) {
    const { session } = useSession();

    if (!session) return <Loading />;

    return (
        <DataContext userId={session.userId}>
            <FilterContext>
                <SortingContext>
                    <DashboardSchema userId={session.userId}>
                        {children}
                    </DashboardSchema>
                </SortingContext>
            </FilterContext>
        </DataContext>
    );
}

const DashboardSchema = memo(({ children, userId }: { children: React.ReactNode, userId: string }) => {
    const { mode } = useTheme();
    const { working } = useAuth();

    return (
        <div className={`container container--${mode} dashboard-container`}>
            <Dashboard>
                {children}
            </Dashboard>
            <ActivityForm userId={userId} />
            <CategoryForm userId={userId} />
            <Confirm />
            <LoadingPane loading={working} />
        </div >
    );
});
DashboardSchema.displayName = "DashboardSchema";