import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getHistory = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/chat`);
        return response.data;
    } catch (error) {
        console.error("Error fetching history:", error);
        throw new Error("Failed to fetch build history. Please try again later.");
    }
};

export const sendMessage = async (prompt) => {
    try {
        const response = await axios.post(`${BASE_URL}/chatbot`, { prompt });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw new Error("Failed to send message. Please try again later.");
    }
};

export const getSpecificLog = async (uniqueKey) => {
    try {
        const response = await axios.get(`${BASE_URL}/chatbot/${uniqueKey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching specific log:", error);
        throw new Error("Failed to fetch specific log. Please try again later.");
    }
};