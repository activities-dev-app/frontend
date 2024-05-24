"use client"

import { useCallback, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { useTheme } from "@/context";
import { isURL, isEmpty } from "validator";
import { FormInput } from "@/components/forms";
import { Button } from "@/components";
import { useAutomaticCloseForm } from "./useAutomaticCloseForm";
import { NoteBox } from "./NoteBox";
import { useSession } from "@/app/auth/context";
import { getWebsiteDetails } from "../LinkObject/api"

interface AddLinkFormProps {
    activityId: string,
    position: number,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddLinkForm = ({
    activityId,
    position,
    show,
    setShow,
}: AddLinkFormProps) => {

    const { mode } = useTheme();
    const { session } = useSession();

    const [url, setUrl] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    
    const { addObject } = useDataContext();

    const clear = useCallback(() => {
        setUrl("");
        setLabel("");
        setComment("");
    }, [setUrl, setLabel]);

    const submit = useCallback(() => {
        if (session) {
            const { userId } = session;

            getWebsiteDetails(url).then(r => {

                console.log(r);

                if (isValidUrl(url) && !isEmpty(url)) {
                    addObject({
                        userId,
                        activityId,
                        type: "link",
                        position,
                        linkData: {
                            url,
                            label: label || url,
                            comment,
                            title: r.title,
                            description: r.description,
                            images: r.images,
                            favicon: r.favicon,
                            domain: r.domain,
                            sitename: r.sitename,
                        },
                    });
                }
            })
            .catch(err => console.log(err));

        }

        setShow(false);
        clear();
    }, [
        url, 
        label, 
        comment, 
        activityId, 
        position, 
        session, 
        setShow, 
        addObject, 
        clear
    ]);

    const cancel = useCallback(() => {
        setShow(false);
        clear();
    }, [setShow, clear]);

    const isValidUrl = (url: string) => {
        return isURL(url, {
            require_protocol: true,
            require_valid_protocol: true,
        });
    };

    const { ref } = useAutomaticCloseForm(cancel);

    if (!show) return null;

    return (
        <form
            className={`add-link-form add-link-form--${mode}`}
            ref={ref}
        >
            <FormInput
                id="url-input"
                label="Link url"
                value={url}
                setValue={setUrl}
                autoFocus={true}
                placeholder="Url"
                type="text"
                size="small"
                validateInput={() => isValidUrl(url)}
                mode={mode}
            />

            {/* <FormInput
                id="label-input"
                label="Link label"
                value={label}
                setValue={setLabel}
                autoFocus={false}
                placeholder="Label"
                type="text"
                size="small"
                mode={mode}
            /> */}

            <NoteBox comment={comment} setComment={setComment} label={"Add a note about this link."} />

            <div className="add-link-form__buttons-group">
                <Button
                    baseClassName="add-link-form__button"
                    buttonName="submit"
                    themeMode={mode}
                    label="Add"
                    onClick={submit}
                    disabled={isEmpty(url) || !isValidUrl(url)}
                />

                <Button
                    baseClassName="add-link-form__button"
                    buttonName="cancel"
                    themeMode={mode}
                    label="Cancel"
                    onClick={cancel}
                />

                <Button
                    baseClassName="add-link-form__button"
                    buttonName="opt"
                    themeMode={mode}
                    label="Add a note"
                //onClick={() => {}}
                />
            </div>
        </form>
    );
};
