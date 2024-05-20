"use client"

import { useTheme } from "@/context";
import { useCallback, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { Button } from "@/components";
import { useAutomaticCloseForm } from "../Forms/useAutomaticCloseForm";
import { LinkObjectType } from "./LinkObject";

export const LinkObjectLabel = ({ link, objKey }: { link: LinkObjectType, objKey: string }) => {

    const { mode } = useTheme();
    const [updateMode, setUpdateMode] = useState<boolean>(false);
    const [label, setLabel] = useState<string>(link.label || "");
    const [showControls, setShowControls] = useState<boolean>(false);

    const { updateObject } = useDataContext();

    const updateLabel = useCallback(() => {
        updateObject({ objKey, type: "link", linkUpdates: { label } });
        setShowControls(false);
    }, [label, objKey, updateObject]);

    const { ref } = useAutomaticCloseForm(() => {
        setUpdateMode(false);
    });

    return (
        <form
            className={`
                link--label__form 
                link--label__form--${mode}`
            }
            ref={ref}
            onMouseOver={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onSubmit={e => {
                e.preventDefault();
                updateLabel();
                setUpdateMode(false);
            }}>
            {
                updateMode ?
                    <input
                        type="text"
                        className={`link--label__update-input link--label__update-input--${mode}`}
                        autoFocus={true}
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                    /> :
                    <div className={`link--label__wrapper link--label__wrapper--${mode}`}>
                        <p className={`link--label 
                            link--label--${mode}`}>
                            {label}
                        </p>
                        {
                            showControls &&
                            <div className="link--label__controls">
                                <Button
                                    className={`link--label__controls__button link--label__controls__button--${mode}`}
                                    onClick={() => setUpdateMode(true)}>
                                    Edit
                                </Button>
                            </div>
                        }
                    </div>
            }
        </form>
    );
};