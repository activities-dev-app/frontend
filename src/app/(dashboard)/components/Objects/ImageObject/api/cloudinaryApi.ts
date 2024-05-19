"use server"

import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

//const cloudinaryUrl = `cloudinary://${apiKey}:${apiSecret}@${cloudName}`;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});

export const uploadImageToCloudinary = ({ file }: { file: string }) => {
    cloudinary.uploader
        .upload(file)
        .then(r => {
            console.log(r);
        });
};

export const deleteFileFromCloudinary = async ({publicId}: {publicId: string}) => {
    return cloudinary.uploader
        .destroy(publicId, {
            invalidate: true,
            resource_type: "image",
            type: "upload"
        });
};

export const bulkDeleteFilesFromCloudinary = async ({publicIds}: {publicIds: string[]}) => {
    return cloudinary.api
        .delete_resources(publicIds);
}

export const deleteFolder = async ({ path }: { path: string }) => {
    return cloudinary.api
        .delete_folder(path);
}