"use client"

import { useTheme } from "@/context";
import { useCallback, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { Button } from "@/components";
import { useAutomaticCloseForm } from "../Forms/useAutomaticCloseForm";
import Link from "next/link";
import { LinkObjectType } from "./LinkObject";

export const LinkObjectUrl = ({ link, objKey }: { link: LinkObjectType, objKey: string }) => {

    const { mode } = useTheme();
    const [updateMode, setUpdateMode] = useState<boolean>(false);
    const [url, setUrl] = useState<string>(link.url || "");
    const { updateObject } = useDataContext();
    const [showControls, setShowControls] = useState<boolean>(false);

    const updateUrl = useCallback(() => {
        updateObject({ objKey, type: "link", linkUpdates: { url } });
        setShowControls(false);
    }, [url, objKey, updateObject]);

    const { ref } = useAutomaticCloseForm(() => {
        setUpdateMode(false);
    });

    return (
        <form
            className="link--url__form"
            ref={ref}
            onSubmit={e => {
                e.preventDefault();
                updateUrl();
                setUpdateMode(false);
            }}>
            {
                updateMode ?
                    <div className="link--url__edit-mode">
                        <input
                            type="text"
                            autoFocus={true}
                            className={`link--url__update-input link--url__update-input--${mode}`}
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <button type="submit" className="button button-edit-mode">Save</button>
                    </div> :
                    <div
                        className="link--url__normal-mode"
                        onMouseOver={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                    >
                        <Link
                            href={url}
                            target="_blank"
                            className={`link--url 
                                link--url--${mode}`}>
                            {url}
                        </Link>

                        {
                            showControls &&
                            <div className="link--url__controls">
                                <Button
                                    className={`link--url__controls__button link--url__controls__button--${mode}`}
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
