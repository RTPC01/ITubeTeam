export default function getAuthHeader(extraHeaders = {}) {
    const token = localStorage.getItem("token");
    const authHeader = {
        'Authorization': `Bearer ${token}`,
    };
    return { ...authHeader, ...extraHeaders };
}