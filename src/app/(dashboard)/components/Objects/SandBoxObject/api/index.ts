"use server" 

import axios from "axios";

const headers = {
    "Content-Type": "Application/json",
    Accept: "application/json"
};

const data = {
    "files": {
        "index.js": {
            "content": "",
            "isBinary": false
        },
        "package.json": {
            "content": {
                "dependencies": {}
            }
        }
    }
};

const url = "https://codesandbox.io/api/v1/sandboxes/define";

export const createCodesandbox = async () => {
    console.log("starting axios...")
    return await axios.post(url, data, { headers });
};