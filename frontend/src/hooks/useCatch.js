import React from 'react'

export default async function useCatch(callback) {
    try {
        await callback();
    } catch (error) {
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
    }
}