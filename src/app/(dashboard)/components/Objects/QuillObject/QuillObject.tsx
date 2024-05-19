"use client";

import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { useTheme } from "@/context";
import { useCallback, useEffect, useRef, useState } from "react";
import { ObjectType } from "@/types";
import { Button } from "@/components";
import { useDataContext } from "@/app/(dashboard)/context";
import { Delta, EmitterSource } from "quill/core";

const QuillObjectComponent = ({ obj }: { obj: ObjectType }) => {

    const { mode } = useTheme();
    const { updateObject, removeObject } = useDataContext();
    const [showControls, setShowControls] = useState<boolean>(false);
    const [quill, setQuill] = useState<Quill | null>(null);
    const [quillStarted, setQuillStarted] = useState<boolean>(false);
    const [editor, setEditor] = useState<string | HTMLElement>("");
    const [unsaved, setUnsaved] = useState<boolean>(false);

    const [options, setOptions] = useState<QuillOptions>({
        modules: {
            toolbar: [
                { 'header': 1 }, { 'header': 2 },
                'bold', 'italic', 'underline', 'strike',
                { 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' },
                { 'align': [] },
                { 'indent': '-1' }, { 'indent': '+1' }
            ],
        },
        //readOnly: true,
        theme: "snow",
        placeholder: "Write rich text here...",
    });

    const editorRef = useRef<HTMLDivElement>(null);

    const { quillData } = obj;

    useEffect(() => {
        const currentEditorRef = editorRef.current;

        if (currentEditorRef) {
            setEditor(currentEditorRef);

            if (editor) {
                if (!quillStarted) {
                    //Quill.register
                    console.log("Starting quill...");
                    setQuill(new Quill(editor, options));
                    setQuillStarted(true);
                } else {
                    console.log("Quill is on...");

                    if (quillData && quillData.delta) {
                        const stringifiedDelta = quillData.delta as unknown as string; /* Object comes stringified from server */
                        const delta = JSON.parse(stringifiedDelta);
                        if (quill) {
                            quill.setContents(delta);
                        }
                    }
                }
            }
        }
    }, [editor, quillStarted, quill, quillData, options]);  /* 
    
    *** You can also replace multiple useState variables with useReducer if 'setQuill' needs the current value of 'options'.  react-hooks/exhaustive-deps

    */

    useEffect(() => {
        const onEditorChanged = (delta: Delta, oldContent: Delta, source: EmitterSource) => {
            if (source === "user") {
                setUnsaved(true);
            }

            console.log(quill?.getText())
        };

        if (quill) {
            quill.on("text-change", onEditorChanged);
        }

        return () => {
            if (quill) {
                quill.off("text-change", onEditorChanged);
            }
        }

    }, [quill]);

    const saveContent = useCallback(() => {
        if (quill) {
            const delta = quill.getContents();
            const html = quill.getSemanticHTML();

            updateObject({
                objKey: obj.key,
                type: "quill",
                quillUpdates: {
                    delta: JSON.stringify(delta),
                    html: html,
                },
            });

            setUnsaved(false);
        }
    }, [quill, obj.key, updateObject]);

    const deleteObject = useCallback(() => {
        removeObject(obj.key);
    }, [removeObject, obj.key]);

    return (
        <div className={`quill quill--${mode}`}>
            <div className={`quill__editor__wrapper quill__editor__wrapper--${mode}`}>
                <div id="editor" ref={editorRef}></div>
            </div>
            <div className="quill__editor__controls">
                <Button onClick={saveContent}>{unsaved ? "Save *" : "Save"}</Button>
                <div className="quill__editor__controls__details">
                    {
                        showControls &&
                        <Button onClick={deleteObject}>Delete</Button>
                    }
                    <Button onClick={() => setShowControls(!showControls)}>{showControls ? "Less" : "More"}</Button>
                </div>
            </div>
        </div>
    );
};

export default QuillObjectComponent;