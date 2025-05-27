"use server";

interface GetEmployeeIdParams {
    username: string,
    password: string,
    accessToken: string,
}

// ! ======================= ENV =============================
const API_ROOT_URL = process.env.API_ROOT_URL;
const API_KEY = process.env.API_KEY
const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME
const SESSION_ID = process.env.SESSION_ID

// ! ======================= STATIC =============================
const QUERY_URL = "http://172.25.54.80:8069"
const FETCH_URL = `${API_ROOT_URL}/api/call/res.users/api_login`
const FETCH_DB = "pre_prod"
const FETCH_DEVICE = "SM-N970F"

export const getEmployeeId = async ({ username, password, accessToken }: GetEmployeeIdParams) => {
    const query = {
        url: QUERY_URL,
        db: FETCH_DB,
        username,
        password,
        device_type: FETCH_DEVICE
    };

    const queryString = encodeURIComponent(JSON.stringify(query));
    const fullUrl = `${FETCH_URL}?kwargs=${queryString}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                [API_KEY_HEADER_NAME]: API_KEY,
                'Cookie': `session_id=${SESSION_ID}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const employeeId = await response.text();
        return employeeId;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

