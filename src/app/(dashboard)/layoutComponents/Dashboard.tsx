"use client";

import { useCallback, useRef, useState } from "react";
import { useTheme } from "@/context";

import DashboardMainPane from "./DashboardMainPane";
import DashboardSidePane from "./DashboardSidePane"

import { Button } from "@/components";
import Icon from "@/icons";

import { Allotment } from "allotment";
import "allotment/dist/style.css";


export default function Dashboard({ children }: { children: React.ReactNode }) {

    const { mode } = useTheme();
    const {
        sidePaneRef,
        show,
        hideSidebar,
        showSidebar,
        onAllotmentChange,
        onDragStart,
        onDragEnd,
        protectionActive,
    } = useAllotmentHelpers();

    return (
        <div className={`dashboard dashboard--${mode}`}>
            <Allotment
                proportionalLayout={false}
                separator={false}
                onChange={onAllotmentChange}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className={`dashboard__allotment dashboard__allotment--${mode}`}>

                <Allotment.Pane
                    minSize={40}
                    maxSize={40}
                    snap={false}
                    preferredSize={40}
                    visible={true}>
                    <div
                        className="dashboard__side-pane__fixedbar">
                        {show ?
                            <Button
                                className="dashboard__side-pane__fixedbar__button dashboard__side-pane__fixedbar__button--hide"
                                onClick={hideSidebar}>
                                <Icon className="" icon="chevrons-left" />
                            </Button> :
                            <Button
                                className="dashboard__side-pane__fixedbar__button dashboard__side-pane__fixedbar__button--show"
                                onClick={showSidebar}>
                                <Icon className="" icon="chevrons-right" />
                            </Button>
                        }
                    </div>
                </Allotment.Pane>

                <Allotment.Pane
                    minSize={200}
                    preferredSize={200}
                    snap={true}
                    visible={show}
                    ref={sidePaneRef}
                    className={`dashboard__allotment__side-pane dashboard__allotment__side-pane--${mode}`}>
                    <div className="dashboard__side-pane__click-protection"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            width: 200,
                            height: "100%",
                            position: "absolute",
                            zIndex: 3000,
                            visibility: protectionActive ? "visible" : "hidden"
                        }}
                    ></div>
                    <DashboardSidePane />
                </Allotment.Pane>

                <Allotment.Pane
                    minSize={400}
                    className={`dashboard__allotment__main-pane dashboard__allotment__main-pane--${mode}`}>
                    <DashboardMainPane>
                        {children}
                    </DashboardMainPane>
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}


const useAllotmentHelpers = () => {

    const [show, setShow] = useState<boolean>(true);
    const [protectionActive, setProtectionActive] = useState<boolean>(false);
    const sidePaneRef = useRef<HTMLDivElement>(null);

    const getSidePaneWidth = useCallback(() => {
        const currentSidePane = sidePaneRef.current;
        if (currentSidePane) {
            return currentSidePane.getBoundingClientRect().width;
        }
    }, [sidePaneRef]);

    const onAllotmentChange = useCallback(() => {
        const width = getSidePaneWidth();
        console.log("changed to: ", width);
        if (width === 0) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [getSidePaneWidth]);

    const hideSidebar = useCallback(() => {
        setShow(false);
    }, []);

    const showSidebar = useCallback(() => {
        setShow(true);
    }, []);

    const onDragStart = useCallback(() => {
        setProtectionActive(true);
    }, [])
    const onDragEnd = useCallback(() => {
        setProtectionActive(false);
    }, [])

    return {
        sidePaneRef,
        show,
        onAllotmentChange,
        hideSidebar,
        showSidebar,
        onDragStart,
        onDragEnd,
        protectionActive,
    };
};
