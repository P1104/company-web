/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { X, Mic, VolumeX, Volume2, Send, Play, Pause, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ttsAudioUrl, setTtsAudioUrl] = useState<string | null>(null);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            content: "Hi there 👋\nHow can I help you today?",
            timestamp: new Date(),
            chatType: "",
        },
    ])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

    const handleChat = (userInput?: string) => {
        let userMessage = ''

        if (userInput === undefined) {
            if (chatInput.trim() === '') return;
            userMessage = chatInput.trim();
        } else {
            userMessage = userInput.trim();
        }

        if (userMessage === '') return;

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

        setIsLoading(true);
        
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    content: "This is a mock response. Connect your API to get real responses.",
                    sender: "bot",
                    timestamp: new Date(),
                    chatType: "",
                }
            ]);
            setIsLoading(false);
        }, 1000);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleChat(chatInput)
        }
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

    if (!isOpen) {
        return (
            <div className="fixed bottom-4 right-4 z-40">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg"
                    size="icon"
                >
                    <Bot className="h-6 w-6" />
                </Button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-40 w-11/12 sm:w-96 max-h-[85vh] md:max-h-[90vh] flex flex-col bg-white rounded-lg shadow-2xl overflow-hidden">
            {ttsAudioUrl && (
                <audio ref={audioRef} src={ttsAudioUrl} className="hidden" />
            )}

            {/* Header */}
            <div className="flex flex-col border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 md:p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        <h2 className="text-base md:text-lg font-semibold">{headerTitle}</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-6 w-6 hover:bg-blue-700 text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xs md:text-sm opacity-90">
                        Ask me anything.
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {audioEnabled ?
                                <Volume2 className="h-3.5 w-3.5" /> :
                                <VolumeX className="h-3.5 w-3.5" />
                            }
                            <button
                                onClick={() => setAudioEnabled(!audioEnabled)}
                                className="bg-blue-700 rounded p-0.5"
                            >
                                <div className={`w-4 h-2.5 rounded-full transition-colors ${audioEnabled ? 'bg-white' : 'bg-gray-300'}`} />
                            </button>
                        </div>

                        {audioEnabled && ttsAudioUrl && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 hover:bg-blue-700 text-white p-0"
                                onClick={toggleAudioPlayback}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="h-3 w-3" />
                                ) : (
                                    <Play className="h-3 w-3" />
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gray-50">
                {messages.map((message) => (
                    <div key={message.id} className="flex flex-col">
                        <div
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-sm px-3 py-2 rounded-lg text-sm ${
                                    message.sender === "user"
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                                }`}
                            >
                                <span className="break-words">{message.content}</span>
                            </div>
                        </div>
                        <div
                            className={`text-xs text-gray-500 mt-1 ${
                                message.sender === "user" ? "text-right" : "text-left"
                            } px-2`}
                        >
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-gray-800 px-3 py-2 rounded-lg rounded-bl-none border border-gray-200">
                            <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" />
                                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.1s'}} />
                                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            {showRecorder ? (
                <div className="border-t p-2 md:p-3 bg-white">
                    <div className="relative flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded px-3 py-2">
                            <Mic className="h-4 w-4 text-red-500 animate-pulse" />
                            <span className="text-xs text-gray-600">Recording...</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowRecorder(false)}
                            className="h-8 w-8"
                            title="Cancel"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="border-t bg-white p-2 md:p-3">
                    <div className="space-y-2">
                        <textarea
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="w-full min-h-10 md:min-h-12 p-2 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={1}
                        />
                        <div className="flex items-center justify-between gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                type="button"
                                onClick={() => setShowRecorder(true)}
                                className="h-8 w-8 md:h-9 md:w-9"
                            >
                                <Mic className="h-4 w-4" />
                            </Button>
                            <Button 
                                onClick={() => handleChat(chatInput)}
                                size="sm" 
                                className="gap-1.5"
                            >
                                <Send className="h-3.5 w-3.5" />
                                <span className="text-xs md:text-sm">Send</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EDCSChatBot