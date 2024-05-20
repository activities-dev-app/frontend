"use client"

import { useTheme } from "@/context";

export const NoteBox = ({ comment, setComment, label }: { comment: string, setComment: React.Dispatch<React.SetStateAction<string>>, label: string }) => {
    const { mode } = useTheme();

    return (
        <div className="add-link-form__wrapper">
            <label
                className="add-link-form__notebox__label"
                htmlFor="textbox">{label}
            </label>
            <textarea
                id="textbox"
                placeholder="Add a note about this link."
                className={`add-link-form__notebox add-link-form__notebox--${mode}`}
                value={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>
        </div>
    );
};