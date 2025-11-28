/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { X, Mic, VolumeX, Volume2, Send, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { Switch } from "@/components/ui/switch"
import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { callSarvamSTT } from "@/services/api/stt-api";
import { generateResponse } from "@/services/utils/chatHelpers";

interface Message {
    id: number;
    content: string;
    sender?: string;
    timestamp: Date;
    chatType: string;
}

const EDCSChatBot = ({ headerTitle = "Chat Bot ✨" }) => {
    const [chatInput, setChatInput] = useState<string>('')
    const [showRecorder, setShowRecorder] = useState<boolean>(false);
    const [chatArray, setChatArray] = useState<string[]>([])
    const [chatString, setChatString] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
    const [kannadaOption, setKannadaOption] = useState<boolean>(false);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "Hi there 👋\nHow can I help you today?",
            timestamp: new Date(),
            chatType: "",
        },
    ])

    useEffect(() => {
        if (ttsAudioUrl && audioEnabled && audioRef.current) {
            const audio = audioRef.current;
            audio.src = ttsAudioUrl;
            audio.onplay = () => setIsPlaying(true);
            audio.onpause = () => setIsPlaying(false);
            audio.onended = () => setIsPlaying(false);

            audio.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    }, [ttsAudioUrl, audioEnabled]);

    const handleStart = () => {
    };

    const handleSTT = async (audioBlob: Blob) => {
        console.log("Calling STT API...");
        try {
            const text = await callSarvamSTT(audioBlob, kannadaOption);

            if (text) {
                setMessages(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        content: text,
                        sender: "user",
                        timestamp: new Date(),
                        chatType: "",
                    }
                ]);

                const newChatString = chatString + `,user:${text}`;
                setChatString(newChatString);

                await generateResponseForVoice(text, newChatString);
            } else {
                console.log("STT returned no text");
            }
        } catch (error) {
            console.error("Error in STT processing:", error);
        }
    };

    const generateResponseForVoice = async (userMessage: string, newChatString: string) => {
        try {
            await generateResponse(
                userMessage,
                newChatString,
                setIsLoading,
                setMessages,
                setChatArray,
                setChatString,
                chatArray,
                audioEnabled,
                kannadaOption,
                (url: string | null) => setTtsAudioUrl(url),
            );
        }

        finally {
        }
    };

    const handleStop = async ({ duration, audioBlob }: { duration: number, audioBlob: Blob | null }) => {
        if (audioBlob && audioBlob.size > 0) {
            try {
                const buffer = await audioBlob.arrayBuffer();
                const processedBlob = new Blob([buffer], { type: "audio/wav" });
                await handleSTT(processedBlob);
            } catch (error) {
                console.error("Recording processing failed:", error);
            }
        } else {
            console.error("Recording Failed: Empty audio blob");
        }
    };

    const handleChat = (userInput?: string) => {
        let userMessage = ''
        let newChatString = ''

        if (userInput === undefined) {
            if (chatInput.trim() === '') return;
            userMessage = chatInput.trim();
        } else {
            userMessage = userInput.trim();
        }

        if (userMessage === '') return;

        newChatString = chatString + `,user:${userMessage}`
        setChatInput("")

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                content: userMessage,
                sender: "user",
                timestamp: new Date(),
                chatType: "",
            }
        ])

        setChatString(newChatString)

        setTimeout(() => {
            generateResponse(
                userMessage,
                newChatString,
                setIsLoading,
                setMessages,
                setChatArray,
                setChatString,
                chatArray,
                audioEnabled,
                kannadaOption,
                (url: string | null) => setTtsAudioUrl(url),
            )
        }, 600)
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey && window.innerWidth > 800) {
            event.preventDefault()
            handleChat(chatInput)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim()) return
        handleChat(chatInput)
    }

    const toggleAudioPlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Failed to play audio:", error);
                });
            }
        }
    };

    return (
        <div
            className="w-full theme-custom"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            {ttsAudioUrl && (
                <audio ref={audioRef} src={ttsAudioUrl} className="hidden" />
            )}
            <ExpandableChat
                size="lg"
                position="bottom-right"
            >
                <ExpandableChatHeader className="flex flex-col text-center justify-center">
                    <div className="flex items-center justify-between w-full mb-1">
                        {/* <ToggleGroup
                            type="single"
                            value={kannadaOption ? "kn" : "en"}
                            onValueChange={(value) => {
                                if (value) setKannadaOption(value === "kn");
                            }}
                            className="border border-muted rounded-md p-1"
                        >
                            <ToggleGroupItem
                                value="en"
                                aria-label="English"
                                className="text-xs px-3 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                Eng
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="kn"
                                aria-label="Kannada"
                                className="text-xs px-3 py-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                            >
                                ಕನ್ನಡ
                            </ToggleGroupItem>
                        </ToggleGroup> */}

                        <h2 className="text-xl font-semibold">{headerTitle}</h2>

                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                {audioEnabled ?
                                    <Volume2 className="h-4 w-4 text-green-500" /> :
                                    <VolumeX className="h-4 w-4 text-red-500" />
                                }
                                <Switch
                                    checked={audioEnabled}
                                    onCheckedChange={() => {
                                        setAudioEnabled(!audioEnabled);
                                    }}
                                />
                            </div>

                            {audioEnabled && ttsAudioUrl && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={toggleAudioPlayback}
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? (
                                        <Pause className="size-3.5" />
                                    ) : (
                                        <Play className="size-3.5" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Ask me anything.
                    </p>
                </ExpandableChatHeader>

                <ExpandableChatBody className="overflow-y-hidden">
                    <ChatMessageList>
                        {messages.map((message) => (
                            <div key={message.id} className="flex flex-col">
                                <ChatBubble
                                    variant={message.sender === "user" ? "sent" : "received"}
                                >
                                    <ChatBubbleMessage
                                        variant={message.sender === "user" ? "sent" : "received"}
                                    >
                                        <span>{message.content}</span>
                                    </ChatBubbleMessage>
                                </ChatBubble>

                                <div className={`text-xs text-muted-foreground ${message.sender === "user" ? "text-right" : "text-left"} px-2`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <ChatBubble variant="received">
                                <ChatBubbleMessage isLoading />
                            </ChatBubble>
                        )}
                    </ChatMessageList>
                </ExpandableChatBody>

                {showRecorder ? (
                    <div className="border-t py-2 px-4 bg-background">
                        <div className="relative">
                            <AIVoiceInput
                                onStart={handleStart}
                                onStop={handleStop}
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowRecorder(false)}
                                className="absolute right-2 top-0 h-6 w-6"
                                title="Cancel"
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ExpandableChatFooter>
                        <form
                            onSubmit={handleSubmit}
                            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
                        >
                            <ChatInput
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                            />
                            <div className="flex items-center p-3 pt-0 justify-between">
                                <div className="flex">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        type="button"
                                        onClick={() => setShowRecorder(true)}
                                    >
                                        <Mic className="size-4 hover:text-green-500" />
                                    </Button>
                                </div>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send
                                    <Send className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </ExpandableChatFooter>
                )}
            </ExpandableChat>
        </div>
    )
}

export default EDCSChatBot