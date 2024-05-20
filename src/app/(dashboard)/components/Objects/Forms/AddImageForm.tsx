"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useDataContext } from "@/app/(dashboard)/context";
import { useTheme } from "@/context";
import { isURL, isEmpty } from "validator";
import { FormInput } from "@/components/forms";
import { Button } from "@/components";
import { useAutomaticCloseForm } from "./useAutomaticCloseForm";
import { useSession } from "@/app/auth/context";
import { CloudinaryImageData } from "@/types";

interface AddImageFormProps {
    activityId: string,
    position: number,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddImageForm = ({
    activityId,
    position,
    show,
    setShow,
}: AddImageFormProps) => {

    const { mode } = useTheme();
    const { session } = useSession();
    const { addObject } = useDataContext();

    const [cloudinaryImagesArray, setCloudinaryImagesArray] = useState<CloudinaryImageData[]>([]);
    const [caption, setCaption] = useState<string>("");
    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (session) {
            setUserId(session.userId);
        }
    }, [session]);

    const generateControlId = () => {
        const alphanum: string[] = [];

        for (let i = 48; i <= 57; i++) {
            alphanum.push(String.fromCharCode(i))
        }
        for (let i = 65; i <= 90; i++) {
            alphanum.push(String.fromCharCode(i))
        }
        for (let i = 97; i <= 122; i++) {
            alphanum.push(String.fromCharCode(i))
        }

        let controlId = "";

        for (let i = 0; i < 30; i++) {
            const randomPosition = Math.round(Math.random() * alphanum.length - 1);
            controlId += alphanum[randomPosition];
        }
        return controlId;
    }

    const idRef = useRef<string>(generateControlId());

    const clear = useCallback(() => {
        setCloudinaryImagesArray([]);
    }, []);

    const submit = useCallback(() => {
        if (session) {
            const { userId } = session;
            addObject({
                userId,
                activityId,
                type: "image",
                position,
                imageData: { caption, cloudinary: cloudinaryImagesArray, controlId: idRef.current },
            });
        }
        setShow(false);
        clear();
    }, [caption, cloudinaryImagesArray, activityId, position, session, setShow, addObject, clear]);

    const cancel = useCallback(() => {
        setShow(false);
        clear();
    }, [setShow, clear]);

    const onUploadSuccess = useCallback((results: CloudinaryUploadWidgetResults) => {

        const responseData = results.info as unknown as {
            format: string;
            path: string;
            public_id: string;
            resource_type: string;
            thumbnail_url: string;
            secure_url: string;
            version: number;
            version_id: string;
            height: number;
            width: number;
        };
        console.log(results);

        const newCloudinaryImagesArray = cloudinaryImagesArray;

        newCloudinaryImagesArray.push({
            format: responseData.format,
            path: responseData.path,
            publicId: responseData.public_id,
            resourceType: responseData.resource_type,
            thumbnailUrl: responseData.thumbnail_url,
            url: responseData.secure_url,
            version: responseData.version,
            versionId: responseData.version_id,
            height: responseData.height,
            width: responseData.width,
        });

        setCloudinaryImagesArray(newCloudinaryImagesArray);

    }, [cloudinaryImagesArray, setCloudinaryImagesArray]);

    useEffect(() => {
        console.log(cloudinaryImagesArray);
    }, [cloudinaryImagesArray]);

    const { ref } = useAutomaticCloseForm(cancel);

    if (!show) return null;

    return (
        <form
            className={`add-image-form add-image-form--${mode}`}
            ref={ref}
            onSubmit={e => e.preventDefault()}
        >
            <FormInput
                id="caption-input"
                label="Caption (optional)"
                value={caption}
                setValue={setCaption}
                autoFocus={false}
                placeholder="Caption"
                type="text"
                size="small"
                mode={mode}
            />

            <div className="add-image-form__buttons-group">
                <CldUploadButton
                    className="button add-image-form__button"
                    uploadPreset="activity-objects-unsigned-simple-preset"
                    onSuccess={onUploadSuccess}
                    config={{
                        api: {
                            uploadPrefix: `${userId}/${activityId}/${idRef.current}`,
                        }
                    }}
                    onAbort={() => cancel()}
                    onClose={() => submit()}
                    onError={(error) => console.log("Upload error: ", error)}
                    options={{
                        sources: ["local", "url", "unsplash", "camera"],
                        //tags: [],
                        //publicId: "",
                        folder: `activity-objects/${userId}/${activityId}/${idRef.current}`,
                        //context: 
                        //fieldName: 
                    }}
                >
                    Upload images
                </CldUploadButton>

                <Button
                    baseClassName="add-image-form__button"
                    buttonName="cancel"
                    themeMode={mode}
                    label="Cancel"
                    onClick={cancel}
                />

                <button onClick={() => console.log(generateControlId())}>Test</button>
            </div>
        </form>
    );
};


/* 

{
  "event": "success",
  "info": {
    "id": "uw-file3",
    "batchId": "uw-batch2",
    "asset_id": "5651f28910bd23125a6a8ac247d6ea57",
    "public_id": "activity-objects/brpe8wrmzgvx5pcnbzpp",
    "version": 1714831673,
    "version_id": "3c1d0b7506b4cc1cd1f6a90c4621893a",
    "signature": "8d7e9716cc1b02105b2f4212c8afb4cbb2708d39",
    "width": 1471,
    "height": 981,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2024-05-04T14:07:53Z",
    "tags": [
      "image_object"
    ],
    "bytes": 282021,
    "type": "upload",
    "etag": "88ed27f2c4196e6905af9087eb808101",
    "placeholder": false,
    "url": "http://res.cloudinary.com/dtxgf9g51/image/upload/v1714831673/activity-objects/brpe8wrmzgvx5pcnbzpp.jpg",
    "secure_url": "https://res.cloudinary.com/dtxgf9g51/image/upload/v1714831673/activity-objects/brpe8wrmzgvx5pcnbzpp.jpg",
    "folder": "activity-objects",
    "original_filename": "photo-1713962488123-80b6b07a7c64",
    "path": "v1714831673/activity-objects/brpe8wrmzgvx5pcnbzpp.jpg",
    "thumbnail_url": "https://res.cloudinary.com/dtxgf9g51/image/upload/c_limit,h_60,w_90/v1714831673/activity-objects/brpe8wrmzgvx5pcnbzpp.jpg"
  }
}


*/
