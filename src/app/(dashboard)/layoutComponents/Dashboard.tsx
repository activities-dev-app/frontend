"use client";

import { useTheme } from "@/context";
import DashboardMainPane from "./DashboardMainPane";
import DashboardSidePane from "./DashboardSidePane"
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function Dashboard({ children }: { children: React.ReactNode }) {

    const { mode } = useTheme();
    return (
        <div className={`dashboard dashboard--${mode}`}>
            <Allotment
                proportionalLayout={false}
                separator={false}
                className={`dashboard__allotment dashboard__allotment--${mode}`}
            >
                <Allotment.Pane
                    minSize={100}
                    preferredSize={200}
                    snap={true}
                    className={`dashboard__allotment__side-pane 
                        dashboard__allotment__side-pane--${mode}`}
                >
                    <DashboardSidePane />
                </Allotment.Pane>
                <Allotment.Pane
                    minSize={400}
                    className={`dashboard__allotment__main-pane 
                        dashboard__allotment__main-pane--${mode}`}
                >
                    <DashboardMainPane>
                        {children}
                    </DashboardMainPane>
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}


/* 

"use client";

import { useEffect, useRef, useState } from "react";
import DashboardMainPane from "./DashboardMainPane";
import DashboardSidePane from "./DashboardSidePane"
import { PanelGroup, Panel, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";

export default function Dashboard({ children }: { children: React.ReactNode }) {

    const ref = useRef<ImperativePanelHandle>(null);
    const { initialPercentValue, setSize, windowInnerWidth } = useWindow(ref);
    

    return (
        <div className="dashboard">
            <PanelGroup direction="horizontal">
                <Panel
                    defaultSize={initialPercentValue}
                    minSize={130*100/windowInnerWidth}
                    ref={ref}
                    order={1}
                    collapsible
                    //onResize={setSize}
                >
                    <DashboardSidePane />
                </Panel>
                <PanelResizeHandle className="resize-handle"/>
                <Panel
                    defaultSize={100 - initialPercentValue}
                    minSize={30000/windowInnerWidth}
                    order={2}>
                    <DashboardMainPane>
                        {children}
                    </DashboardMainPane>
                </Panel>
            </PanelGroup>
        </div>
    );
}

const useWindow = (ref: React.RefObject<ImperativePanelHandle>) => {

    const width = (size: number) => size * window.innerWidth / 100;
    const percentValue = (width: number) => width * 100 / window.innerWidth;

    const initialWidth = 200;
    const widthRef = useRef<number>(initialWidth);
    const initialPercentValue = percentValue(initialWidth);
    const [size, setSize] = useState(initialPercentValue);
    const windowInnerWidth = useRef<number>(window.innerWidth);

    useEffect(() => {
        const onResize = () => {
            console.log(window.innerWidth);
            if (windowInnerWidth) {
                windowInnerWidth.current = window.innerWidth;
            }
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    useEffect(() => {
        if (widthRef) {
            widthRef.current = width(size);
        }
    }, [size]);

    useEffect(() => {
        const panel = ref.current;

        const onResize = () => {
            if (panel) {
                if (widthRef) {
                    panel.resize(percentValue(widthRef.current));
                }
            }
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return {
        initialPercentValue,
        setSize,
        windowInnerWidth: windowInnerWidth.current
    };
}; */