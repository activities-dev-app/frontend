import { useCallback, useState } from "react";
import { useDataContext } from "@/app/(dashboard)/context";
import { Button } from "@/components";
import { useAutomaticCloseForm } from "../Forms/useAutomaticCloseForm";
import { NoteBox } from "../Forms/NoteBox";
import { LinkObjectType } from "./LinkObject";
import { useTheme } from "@/context";


export const LinkObjectComment = ({ link, objKey }: { link: LinkObjectType, objKey: string }) => {

    const { mode } = useTheme();
    const [updateMode, setUpdateMode] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(link.comment || "");
    const { updateObject } = useDataContext();
    const [showControls, setShowControls] = useState<boolean>(false);

    const updateComment = useCallback(() => {
        updateObject({ objKey, type: "link", linkUpdates: { comment } });
        setShowControls(false);
    }, [comment, objKey, updateObject]);

    const { ref } = useAutomaticCloseForm(() => {
        setUpdateMode(false);
    });

    return (
        <form
            className="link--comment__form"
            ref={ref}
            onSubmit={e => {
                e.preventDefault();
                updateComment();
                setUpdateMode(false);
            }}>
            {
                updateMode ?
                    <div className="link--comment__edit-mode">
                        <NoteBox comment={comment} setComment={setComment} label="" />
                        <button type="submit" className="button button-edit-mode">Save</button>
                    </div>
                    :
                    <div
                        className="link--comment__normal-mode"
                        onMouseOver={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}>
                        {
                            comment.length > 0 ?
                                <>

                                    <pre className="link--comment">
                                        {comment}
                                    </pre>

                                    {
                                        showControls &&
                                        <div className="link--comment__controls">
                                            <Button
                                                className={`link--comment__controls__button link--comment__controls__button--${mode}`}
                                                onClick={() => setUpdateMode(true)}>
                                                Edit
                                            </Button>
                                        </div>
                                    }
                                </> :
                                <button className="button button-add-note" onClick={() => {
                                    setUpdateMode(true);
                                }}>Add note...</button>
                        }

                    </div>
            }
        </form>
    );
};

LinkObjectComment.displayName = "LinkObjectComment";