"use client"

import { useTheme } from "@/context";
import { ObjectType } from "@/types";
import { LinkObjectLabel } from "./LinkObjectLabel";
import { LinkObjectUrl } from "./LinkObjectUrl";
import { LinkObjectComment } from "./LinkObjectComment";
import { Button } from "@/components";
import { useDataContext } from "@/app/(dashboard)/context";
import { useState } from "react";

export type LinkObjectType = {
    url: string;
    label: string,
    comment: string,
}

const LinkObjectComponent = ({ obj }: { obj: ObjectType }) => {

    const { mode } = useTheme();

    const { removeObject } = useDataContext();

    const [showControls, setShowControls] = useState<boolean>(false);

    const { linkData } = obj;

    if (!linkData) return null;

    return (
        <div className={`link link--${mode}`}>
            <LinkObjectLabel link={linkData as LinkObjectType} objKey={obj.key} />
            <LinkObjectUrl link={linkData as LinkObjectType} objKey={obj.key} />
            <LinkObjectComment link={linkData as LinkObjectType} objKey={obj.key} />
            <div className="link__details">
                <Button onClick={() => setShowControls(!showControls)}>{showControls ? "Less" : "More"}</Button>
                {
                    showControls &&
                    <div className="link__controls">
                        <Button onClick={() => removeObject(obj.key)}>Remove link</Button>
                    </div>
                }
            </div>
        </div>
    );
};

export default LinkObjectComponent;
