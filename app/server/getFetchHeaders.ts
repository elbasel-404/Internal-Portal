"use server";

export const getFetchHeaders = async () => {
    const API_KEY = process.env.API_KEY as string;
    const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string;
    const BEARER_TOKEN = process.env.BEARER_TOKEN as string;
    const SESSION_ID = process.env.SESSION_ID as string;

    if (!API_KEY || !API_KEY_HEADER_NAME || !BEARER_TOKEN || !SESSION_ID) {
        console.log({
            API_KEY,
            API_KEY_HEADER_NAME,
            BEARER_TOKEN,
            SESSION_ID,
        });
        throw new Error('Missing env variables');
    }

    const headers = {
        [API_KEY_HEADER_NAME]: API_KEY,
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
        Cookie: `session_id=${SESSION_ID}`,
    };
    return { headers };
};