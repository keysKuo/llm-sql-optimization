import React from 'react'

export default function useCatch(callback) {
    try {
        callback();
    } catch (error) {
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
    }
}