import React, { useState, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import { SendIcon } from '../assets/icons';

const SalesWelcome: React.FC = () => {
    const { sendMessage, setIsOpen, messages } = useChatContext();
    const [isVisible, setIsVisible] = useState(true);
    const [input, setInput] = useState('');

    // Hide if chat is already active or user has interacted
    useEffect(() => {
        if (messages.length > 1) {
            setIsVisible(false);
        }
    }, [messages]);

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input.trim());
            setIsOpen(true); // Open the main chat
            setIsVisible(false); // Close this welcome modal
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-arsenal-red/50 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl shadow-red-900/50 relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-arsenal-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Avatar */}
                    <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-full border-4 border-arsenal-red shadow-[0_0_20px_rgba(220,38,38,0.5)] overflow-hidden">
                        <img
                            src="/tactical_sales_agent.png"
                            alt="Agente de Vendas"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">
                            Bem-vindo à <span className="text-arsenal-red">Arsenal Brasil</span>
                        </h2>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                            Sou o <strong className="text-white">Sr. Nall</strong>, seu agente de vendas.
                            <br /><br />
                            <span className="text-arsenal-red font-bold">O que você procura hoje?</span>
                        </p>

                        <form onSubmit={handleStart} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ex: Preciso de proteção para minha casa..."
                                className="w-full bg-gray-800 border-2 border-gray-700 rounded-xl py-4 px-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-arsenal-red focus:ring-1 focus:ring-arsenal-red transition-all text-lg shadow-inner"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 bg-arsenal-red hover:bg-red-700 text-white p-3 rounded-lg transition-colors shadow-lg"
                            >
                                <SendIcon className="w-6 h-6" />
                            </button>
                        </form>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="mt-4 text-sm text-gray-500 hover:text-white underline transition-colors"
                        >
                            Apenas olhando por enquanto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesWelcome;
