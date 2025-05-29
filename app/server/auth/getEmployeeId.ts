"use server";

interface GetEmployeeIdParams {
    username: string,
    password: string,
    accessToken: string,
}

// ! ======================= ENV =============================
const API_KEY = "85ced9c9-b64b-4d76-85a5-ae3b869b044d";
const API_KEY_HEADER_NAME = "x-api-key";
const SESSION_ID = "808eef83a1110af844371b501c5e2ee77109d786";

// ! ======================= STATIC =============================
const QUERY_URL = "http://10.60.55.21";
const FETCH_URL = `https://apis.monshaat.gov.sa/ERP/TaskService/api/call/res.users/api_login`;
const FETCH_DB = "smea";
const FETCH_DEVICE = "sdk_gphone64_x86_64";

export const getEmployeeId = async ({ username, password, accessToken }: GetEmployeeIdParams) => {
    const query = {
        url: QUERY_URL,
        db: FETCH_DB,
        // username: "asaedi.uat",
        // password: "@112",
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
                // 'Authorization': `Bearer fIQ8RX0K8GYKuzw3I83XkduGs2ksh7`,
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
