import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function useFetch(url, method = 'GET', body = null, headers = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize options to prevent unnecessary re-renders and re-fetches
    const options = useMemo(() => {
        const opts = {
            method,
            url,
            headers
        };
        if (body) {
            opts.data = body;
        }
        return opts;
    }, [url, method, body, headers]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios(options);
                if (isMounted) {
                    setData(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                    console.error('Error fetching data:', error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
