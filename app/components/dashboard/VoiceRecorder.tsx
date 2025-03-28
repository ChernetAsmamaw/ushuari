"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Send, Loader2 } from "lucide-react";

export const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setAudioURL(null);
      setRecordingDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Unable to access your microphone. Please check your browser permissions."
      );
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop all audio tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  // Format seconds into MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Submit recording function
  const submitRecording = async () => {
    if (!audioURL) return;

    setIsSubmitting(true);

    try {
      // In a real app, you would send the audio file to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

      // Reset state after successful submission
      setAudioURL(null);
      setRecordingDuration(0);
      alert("Your legal query has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting recording:", error);
      alert("Failed to submit your recording. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Visualization */}
      <div className="w-full h-20 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {isRecording ? (
          <div className="flex items-center justify-center space-x-1">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#D4AF37]"
                animate={{
                  height: [15, 30 + Math.random() * 40, 15],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        ) : audioURL ? (
          <audio src={audioURL} controls className="w-full h-10" />
        ) : (
          <p className="text-gray-400">Press the microphone to record</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {audioURL ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={submitRecording}
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#002366] text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Query</span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-full ${
              isRecording
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#002366] text-white hover:bg-[#001A4D]"
            }`}
          >
            {isRecording ? (
              <Square className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </motion.button>
        )}

        {isRecording && (
          <div className="text-red-500 font-mono">
            {formatTime(recordingDuration)}
          </div>
        )}
      </div>
    </div>
  );
};
