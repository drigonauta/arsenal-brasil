
import React, { useState } from 'react';
import { CloseIcon } from '../assets/icons';

interface NewTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (subject: string, message: string) => void;
    isSubmitting: boolean;
}

const NewTicketModal: React.FC<NewTicketModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) {
            alert('Por favor, preencha o assunto e a mensagem.');
            return;
        }
        onSubmit(subject, message);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-2xl relative border border-red-800">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white disabled:opacity-50" disabled={isSubmitting}>
                    <CloseIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Abrir Novo Ticket de Suporte</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Assunto</label>
                        <input 
                            type="text" 
                            id="subject" 
                            value={subject} 
                            onChange={e => setSubject(e.target.value)} 
                            required 
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" 
                            placeholder="Ex: Dúvida sobre transferência de arma"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                        <textarea 
                            id="message" 
                            value={message} 
                            onChange={e => setMessage(e.target.value)} 
                            required 
                            rows={6}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Descreva seu problema ou dúvida em detalhes..."
                        ></textarea>
                    </div>
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-wait"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Criar Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTicketModal;
