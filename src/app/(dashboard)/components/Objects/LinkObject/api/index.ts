"use server"

import axios from "axios";

const apiKey = process.env.JSONLINK_API_KEY;

export const getWebsiteDetails = async (url: string) => {
    const response = await axios.get(`https://jsonlink.io/api/extract?url=${url}&api_key=${apiKey}`);
    return response.data;
};