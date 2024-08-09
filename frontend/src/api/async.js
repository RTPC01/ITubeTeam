import api from './api';

export async function asyncPost(url, data, contentType) {
    try {
        const response = await api.post(url, data, {
            headers: {
                'Content-Type': contentType
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}