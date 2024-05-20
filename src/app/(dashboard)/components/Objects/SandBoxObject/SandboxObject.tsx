"use client"

import { useDataContext } from "@/app/(dashboard)/context";
import { Button } from "@/components";
import { FormInput } from "@/components/forms";
import { Modal } from "@/components/modals";
import { useTheme } from "@/context";
import { ObjectType, SandboxTemplate } from "@/types";
import { useCallback, useEffect, useState } from "react";

export default function SandboxObjectComponent({ obj }: { obj: ObjectType }) {

    const [sandboxId, setSandboxId] = useState<string | undefined>(obj.codeSandboxData?.sandboxId);
    const [template, setTemplate] = useState<SandboxTemplate | undefined>(obj.codeSandboxData?.template);
    const [sandboxUri, setSandboxUri] = useState<string>("");

    const { codeSandboxData } = obj;

    const { mode } = useTheme();

    const { updateObject, removeObject } = useDataContext();

    const [full, setFull] = useState<boolean>(false);

    useEffect(() => {
        if (codeSandboxData) {
            if (codeSandboxData.sandboxId) {
                setSandboxId(codeSandboxData.sandboxId);
            }
        }
    }, [codeSandboxData]);

    const saveSandbox = useCallback(() => {
        const extractedId = sandboxUri.split("/").reverse()[0];
        updateObject({ objKey: obj.key, type: "codesandbox", codeSandboxUpdates: { sandboxId: extractedId, template } });
    }, [sandboxUri, obj.key, template, updateObject]);

    return (
        <div className={`code-sandbox code-sandbox--${mode}`}>
            <div className="code-sandbox__iframe-wrapper">
                {full ?

                    <>
                        <Modal onDismiss={() => setFull(false)} setShow={setFull} showCloseIcon={true} className="code-sandbox__modal">
                            <iframe
                                className="code-sandbox__iframe"
                                src={
                                    sandboxId ?
                                        `https://codesandbox.io/p/sandbox/${sandboxId}` : (
                                            template === "react" ?
                                                "https://codesandbox.io/p/sandbox/react-mfmxzl" :
                                                template === "react-typescript" ?
                                                    "https://codesandbox.io/p/sandbox/react-typescript-3ytqky" :
                                                    template === "javascript" ?
                                                        "https://codesandbox.io/p/sandbox/javascript-hflhjf" :
                                                        "https://codesandbox.io/p/sandbox/html-css-l7kv47"
                                        )
                                }
                            ></iframe>
                        </Modal>
                    </> :

                    <iframe
                        className="code-sandbox__iframe"
                        src={
                            sandboxId ?
                                `https://codesandbox.io/p/sandbox/${sandboxId}` : (
                                    template === "react" ?
                                        "https://codesandbox.io/p/sandbox/react-mfmxzl" :
                                        template === "react-typescript" ?
                                            "https://codesandbox.io/p/sandbox/react-typescript-3ytqky" :
                                            template === "javascript" ?
                                                "https://codesandbox.io/p/sandbox/javascript-hflhjf" :
                                                "https://codesandbox.io/p/sandbox/html-css-l7kv47"
                                )
                        }
                    ></iframe>
                }
            </div>
            <div>{sandboxId} <Button onClick={() => setFull(!full)}>Full</Button></div>
            <div className="code-sandbox__controls">
                <Button onClick={() => removeObject(obj.key)}>Remove</Button>
            </div>
            <div>
                {
                    !sandboxId &&
                    <>
                        <FormInput
                            id="sandboxUri-form"
                            value={sandboxUri}
                            setValue={setSandboxUri}
                            label="Copy the sandbox link and paste here to save it."
                        />
                        <Button onClick={saveSandbox}>Save</Button>
                    </>
                }
            </div>
        </div>
    );
}