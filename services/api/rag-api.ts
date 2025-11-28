interface ChatbotResponse {
    response: string;
}

export const CHATBOT_API_URL = 'http://192.168.0.166:8031/chatjs/query';

export async function queryChatbot(
    userMessage: string,
): Promise<ChatbotResponse> {
    try {
        const requestBody = {
            message: userMessage,
        };

        const response = await fetch(CHATBOT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('API Response::::', responseData);

        return responseData;
    } catch (error) {
        if ((error as Error).name === 'AbortError') {
            throw new Error('Request was aborted');
        }
        throw error;
    }
}
