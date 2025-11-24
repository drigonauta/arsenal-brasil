import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useChat as useChatHook } from '../hooks/useChat';
import { Message } from '../types';

import { UserActivity } from '../hooks/useUserActivity';

interface ChatContextType {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (text: string, context?: string) => void;
    initializeChat: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activity?: UserActivity;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode; activity?: UserActivity }> = ({ children, activity }) => {
    const chat = useChatHook();
    const [isOpen, setIsOpen] = useState(false);

    // Auto-initialize when opened
    useEffect(() => {
        if (isOpen && chat.messages.length === 0) {
            chat.initializeChat();
        }
    }, [isOpen, chat.messages.length, chat.initializeChat]);

    return (
        <ChatContext.Provider value={{ ...chat, isOpen, setIsOpen, activity }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
