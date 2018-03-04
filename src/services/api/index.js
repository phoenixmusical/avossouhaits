import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'http://localhost:3001/api';

export function makeApiCall(action, params) {
    return fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action,
            params: params || {},
        }),
    })
        .then(response => response.json())
        .then(({ error, result }) => {
            if (error) {
                if (typeof error === 'string') {
                    throw new Error(error);
                } else {
                    throw new Error(error.message || 'API Error');
                }
            } else {
                return result;
            }
        });
}
