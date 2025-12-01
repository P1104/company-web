"use client";

import { Mic, X } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: ({ duration, audioBlob }: { duration: number, audioBlob: Blob | null }) => void;
  visualizerBars?: number;
  demoMode?: boolean;
  demoInterval?: number;
  className?: string;
  onCancel?: () => void;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3000,
  className,
  onCancel
}: AIVoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // FIX: Generate stable random heights to avoid "purity" errors during render
  const barHeights = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return Array.from({ length: visualizerBars }).map(() => 20 + Math.random() * 80);
  }, [visualizerBars]);

  useEffect(() => {
    setIsClient(true);
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // FIX: Resolved 'intervalId' used before assignment and missing 'time' dependency
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRecording) {
      // Start timer
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      // Reset time when recording stops
      setTime(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setIsRecording(true);
      timeoutId = setTimeout(() => {
        setIsRecording(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, demoInterval);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval]);

  const startRecording = async () => {
    try {
      chunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.start(100); 
      setIsRecording(true);
      onStart?.();
    } catch (err) {
      console.error("Error starting voice recording:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        if (chunksRef.current.length > 0) {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
          const duration = time;
          
          onStop?.({ duration, audioBlob });
        }
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setIsRecording(false);
    } else {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }
  };

  return (
    <div className={cn("w-full py-2", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-1">
        <div className="relative w-full flex justify-center">
          <button
            className={cn(
              "group w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              isRecording
                ? "bg-none"
                : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
            )}
            type="button"
            onClick={handleClick}
          >
            {isRecording ? (
              <div
                className="w-5 h-5 rounded-sm animate-spin bg-black dark:bg-white cursor-pointer pointer-events-auto"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              <Mic className="w-5 h-5 text-black/70 dark:text-white/70" />
            )}
          </button>
          
          {onCancel && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCancel}
              className="absolute right-2 top-0 h-6 w-6"
              title="Cancel"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        <span
          className={cn(
            "font-mono text-xs transition-opacity duration-300",
            isRecording
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-3 w-56 flex items-center justify-center gap-0.5">
          {barHeights.map((height, i) => (
            <div
              key={i}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                isRecording
                  ? "bg-black/50 dark:bg-white/50 animate-pulse"
                  : "bg-black/10 dark:bg-white/10 h-1"
              )}
              style={
                isRecording && isClient
                  ? {
                      // FIX: Use stable pre-calculated height
                      height: `${height}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-3 text-xs text-black/70 dark:text-white/70">
          {isRecording ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}
