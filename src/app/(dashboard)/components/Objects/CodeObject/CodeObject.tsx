"use client"

import { useDataContext } from "@/app/(dashboard)/context";
import { useTheme } from "@/context";
import { ObjectType } from "@/types";
import { useCallback, useState } from "react";
import { Button } from "@/components";

import Editor from "@monaco-editor/react";
import { languages } from "./languages";
import type { OnMount } from "@monaco-editor/react";

import monaco from 'monaco-editor';
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import "./jsx.css";


const CodeObjectComponent = ({ obj }: { obj: ObjectType }) => {

    const { mode } = useTheme();

    const { removeObject, updateObject } = useDataContext();

    const [showControls, setShowControls] = useState<boolean>(false);

    const { codeData } = obj;

    const [codeString, setCodeString] = useState<string | undefined>(codeData?.code);

    const [language, setLanguage] = useState<string>("");

    const [unsaved, setUnsaved] = useState<boolean>(false);

    const onMount: OnMount = useCallback(async (monacoEditor, monaco) => {

        if (obj.codeData && obj.codeData.language) {
            setLanguage(obj.codeData?.language)
        }

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            target: monaco.languages.typescript.ScriptTarget.Latest,
            esModuleInterop: true,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            jsxFactory: "React.createElement",
            reactNamespace: "React",
            allowJs: true,
            typeRoots: ["node_modules/@types"],
        });

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: true,
        });


        const babelParse = (codeString: string) => parse(codeString, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
        });

        const monacoJSXHighlighter = new MonacoJSXHighlighter(
            monaco,
            babelParse,
            traverse,
            monacoEditor
        );

        monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
        monacoJSXHighlighter.addJSXCommentCommand();

        return {
            monacoJSXHighlighter,
        }
    }, [obj]);

    const onEditorChange = useCallback((value: string | undefined) => {
        setCodeString(value);
        setUnsaved(true);
    }, [setCodeString]);

    const saveCode = useCallback(() => {
        if (codeString) {
            updateObject({ objKey: obj.key, type: "code", codeUpdates: { code: codeString, language } });
            setUnsaved(false);
        }
    }, [updateObject, codeString, language, obj.key]);

    return (
        <div className={`code code--${mode}`}>
            <div className="code__header">
                <select
                    onChange={(e) => setLanguage(e.currentTarget.value)}
                    value={language}
                    className={`code__select-language code__select-language--${mode}`}>
                    {
                        languages.map(language => <option key={language} value={language}>{language}</option>)
                    }
                </select>
            </div>
            <div className="code__editor__wrapper">
                <Editor
                    height="100%"
                    language={language}
                    value={codeString}
                    key={obj.key}
                    onChange={onEditorChange}
                    onMount={onMount}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        readOnly: false, /* Use this to toggle editing mode */
                        formatOnPaste: true,
                        lineNumbersMinChars: 2,
                        scrollBeyondLastLine: false,
                        padding: { top: 25 }
                    }}
                />
            </div>
            <div className="code__editor__controls">
                <Button onClick={saveCode}>
                    <span>{unsaved ? "Save *" : "Save"}</span>
                </Button>
                <div className="code__editor__controls__details">
                    {
                        showControls &&
                        <Button onClick={() => removeObject(obj.key)}>Delete</Button>
                    }
                    <Button onClick={() => setShowControls(!showControls)}>{showControls ? "Less" : "More"}</Button>
                </div>
            </div>
        </div>
    );
}

export default CodeObjectComponent;