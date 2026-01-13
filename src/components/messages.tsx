import { Message } from "@/types/messages";

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
}

// Helper functions for message handling
export const createMessage = (
  id: number,
  text: string,
  sender: "user" | "bot"
): Message => {
  return {
    id,
    text,
    sender,
    timestamp: new Date(),
  };
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

