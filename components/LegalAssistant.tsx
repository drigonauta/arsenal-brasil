
import React, { useState, useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { Message } from '../types';
import { ChatBubbleIcon, CloseIcon, SendIcon, UserIcon, BotIcon, ShieldCheckIcon, ShoppingBagIcon } from '../assets/icons';
import { products } from '../data/products';

const LegalAssistant: React.FC = () => {
    const { messages, isLoading, error, sendMessage, isOpen, setIsOpen, activity } = useChatContext();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasInteracted, setHasInteracted] = useState(false);
    const lastProcessedPage = useRef<string>('');

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Proactive "Entrão" Effect & Context Awareness
    useEffect(() => {
        // Visual cue logic
        if (!hasInteracted && !isOpen) {
            const timer = setTimeout(() => {
                // Visual cue or sound could go here
            }, 3000);
            return () => clearTimeout(timer);
        }

        // Proactive Message Logic based on Activity
        if (activity && activity.currentPage === 'product' && activity.currentProductId && activity.currentPage !== lastProcessedPage.current && !isLoading && messages.length > 0) {
            // Only trigger if we haven't already for this page visit
            lastProcessedPage.current = activity.currentPage;

            // We don't want to spam, so maybe only if chat is open OR force open?
            // "Ele tem que ser entrão" -> Force open or notification?
            // Let's just send the message context to the AI and let it decide if it wants to speak.
            // But we need to trigger the AI.

            // Let's trigger a hidden context message to the AI
            // sendMessage("", `Usuário está vendo o produto ID: ${activity.currentProductId}`);
            // But sendMessage expects text.

            // Actually, let's just make the button pulse more aggressively or show a toast.
            // For now, let's stick to the visual cue unless the user opens the chat.
        }

    }, [hasInteracted, isOpen, activity, isLoading, messages.length, sendMessage]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            sendMessage(input.trim());
            setInput('');
            setHasInteracted(true);
        }
    };

    const PaymentLinkCard: React.FC<{ linkData: string }> = ({ linkData }) => {
        // Format: [PAYMENT_LINK|ID_PRODUTO|PRECO_FINAL|INCLUI_KIT_LEGAL]
        const parts = linkData.replace('[PAYMENT_LINK|', '').replace(']', '').split('|');
        const productId = parseInt(parts[0]);
        const price = parseFloat(parts[1]);
        const includesLegalKit = parts[2] === 'true';

        const product = products.find(p => p.id === productId);

        if (!product) return null;

        return (
            <div className="mt-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/50 rounded-xl overflow-hidden shadow-lg animate-fade-in-up">
                <div className="bg-yellow-500/10 p-3 border-b border-yellow-500/20 flex justify-between items-center">
                    <span className="text-yellow-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheckIcon className="h-4 w-4" /> Oferta Exclusiva
                    </span>
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">PRIORIDADE MÁXIMA</span>
                </div>
                <div className="p-4">
                    <div className="flex gap-3 mb-3">
                        <img src={product.imageUrls[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg border border-gray-700" />
                        <div>
                            <h4 className="font-bold text-white text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-400">{product.category}</p>
                        </div>
                    </div>

                    {includesLegalKit && (
                        <div className="flex items-center gap-2 mb-3 bg-green-900/30 p-2 rounded border border-green-500/20">
                            <ShieldCheckIcon className="h-4 w-4 text-green-400" />
                            <span className="text-xs text-green-300">Kit Despachante + Assessoria Inclusos</span>
                        </div>
                    )}

                    <div className="flex justify-between items-end mb-4">
                        <span className="text-gray-400 text-xs">Total a pagar:</span>
                        <span className="text-xl font-bold text-white">R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>

                    <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-yellow-500/20">
                        <ShoppingBagIcon className="h-5 w-5" />
                        GARANTIR AGORA
                    </button>
                    <p className="text-[10px] text-center text-gray-500 mt-2">Link seguro e criptografado. Expira em 10 min.</p>
                </div>
            </div>
        );
    };

    const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
        const isBot = message.sender === 'bot';

        // Check for payment link token
        const paymentLinkMatch = message.text.match(/\[PAYMENT_LINK\|.*?\]/);
        const textContent = message.text.replace(/\[PAYMENT_LINK\|.*?\]/, '').trim();

        return (
            <div className={`flex items-start gap-3 my-4 ${isBot ? '' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isBot ? 'bg-red-600' : 'bg-gray-600'}`}>
                    {isBot ? <BotIcon className="h-5 w-5 text-white" /> : <UserIcon className="h-5 w-5 text-white" />}
                </div>
                <div className={`max-w-sm md:max-w-md`}>
                    <div className={`p-3 rounded-lg ${isBot ? 'bg-gray-700 text-gray-200 rounded-bl-none' : 'bg-red-700 text-white rounded-br-none'}`}>
                        <p className="text-sm whitespace-pre-wrap">
                            {textContent}
                            {message.isStreaming && <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"></span>}
                        </p>
                    </div>
                    {isBot && paymentLinkMatch && <PaymentLinkCard linkData={paymentLinkMatch[0]} />}
                </div>
            </div>
        );
    };

    return (
        <>
            <button
                onClick={() => { setIsOpen(!isOpen); setHasInteracted(true); }}
                className={`fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110 z-50 ${!isOpen && !hasInteracted ? 'animate-bounce-custom ring-4 ring-red-500/50' : ''}`}
                aria-label="Abrir assistente legal"
            >
                {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
                {!isOpen && !hasInteracted && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-gray-800 border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50 transition-opacity duration-300 animate-fade-in-up">
                    <header className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600 p-2 rounded-lg relative overflow-hidden group">
                                <BotIcon className="h-6 w-6 text-white relative z-10" />
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </div>
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    Sr. Nall
                                    <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded uppercase tracking-wider">Online</span>
                                </h3>
                                <p className="text-xs text-gray-400">Especialista Legal & Vendas</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-800/95 backdrop-blur-sm">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
                                <BotIcon className="h-12 w-12 text-gray-600 mb-4" />
                                <p className="text-sm">Estou analisando seu perfil...</p>
                                <p className="text-xs mt-2">Diga o que procura e eu encontro a solução legal.</p>
                            </div>
                        )}
                        {messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
                        <div ref={messagesEndRef} />
                        {error && <div className="text-red-400 text-sm text-center p-2">{error}</div>}
                    </div>

                    <footer className="p-4 border-t border-gray-700 bg-gray-900 rounded-b-lg">
                        <form onSubmit={handleSend} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Digite sua dúvida ou produto..."
                                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                                disabled={isLoading}
                                aria-label="Mensagem para o assistente"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-red-600 text-white p-3 rounded-xl disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-red-500 transition-all shadow-lg shadow-red-900/20"
                                aria-label="Enviar mensagem"
                            >
                                <SendIcon className="h-5 w-5" />
                            </button>
                        </form>
                    </footer>
                </div>
            )}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
                @keyframes bounce-custom {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-custom {
                    animation: bounce-custom 2s infinite;
                }
            `}</style>
        </>
    );
};

export default LegalAssistant;
