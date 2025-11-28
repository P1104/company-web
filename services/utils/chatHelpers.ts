import { queryChatbot } from '@/services/api/rag-api';
import { callSarvamTTS } from '@/services/api/tts-api';
import { handleTTSPlayback } from '@/services/utils/audioProcessing';

interface Message {
    id: number;
    content: string;
    sender?: string;
    timestamp: Date;
    chatType: string;
}

export async function generateResponse(
    userMessage: string,
    chatString: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessages: (update: (prev: Message[]) => Message[]) => void,
    setChatArray: React.Dispatch<React.SetStateAction<string[]>>,
    setChatString: React.Dispatch<React.SetStateAction<string>>,
    chatArray: string[],
    audioEnabled: boolean,
    kannadaOption: boolean,
    setTtsAudioUrl: (url: string | null) => void,
) {
    setIsLoading(true);
    setTtsAudioUrl(null);

    try {
        const chatbotResponse = await queryChatbot(userMessage);
        const responseText = chatbotResponse.response;

        if (audioEnabled) {
            try {
                const { ttsResponse } = await callSarvamTTS(responseText, kannadaOption);
                await handleTTSPlayback(ttsResponse, audioEnabled, setTtsAudioUrl);
            } catch (error) {
                console.error("Error in TTS processing:", error);
            }
        }

        setChatArray(prev => [...prev, `user:${userMessage}`, `assistant:${responseText}`]);
        setChatString(prev => `${prev},assistant:${responseText}`);
        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                content: responseText,
                timestamp: new Date(),
                chatType: "",
            }
        ]);
    } catch (error) {
        console.error("Error generating response:", error);
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                content: "Sorry, an error occurred. Please try again.",
                timestamp: new Date(),
                chatType: "",
            }
        ]);
    } finally {
        setIsLoading(false);
    }
}