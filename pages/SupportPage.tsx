
import React, { useState } from 'react';
import { SupportTicket } from '../types';
import { ChatBubbleIcon, PlusIcon } from '../assets/icons';
import NewTicketModal from '../components/NewTicketModal';
import { useSupportAI } from '../hooks/useSupportAI';

const StatusBadge: React.FC<{ status: SupportTicket['status'] }> = ({ status }) => {
    const baseClasses = "text-xs font-bold px-2.5 py-1 rounded-full";
    const statusClasses = {
        'Aberto': 'bg-green-500/20 text-green-300',
        'Em Andamento': 'bg-yellow-500/20 text-yellow-300',
        'Fechado': 'bg-gray-500/20 text-gray-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const SupportPage: React.FC = () => {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const { isLoading: isAiLoading, analyzeTicket } = useSupportAI();

    const handleCreateTicket = async (subject: string, message: string) => {
        const aiAnalysis = await analyzeTicket(subject, message);

        const newTicket: SupportTicket = {
            id: tickets.length + 1,
            subject: subject,
            status: 'Aberto',
            lastUpdate: new Date().toLocaleDateString('pt-BR'),
            messages: [
                { sender: 'user', text: message, timestamp: new Date().toISOString() },
            ],
        };

        if (aiAnalysis) {
            newTicket.messages.push({
                sender: 'support',
                text: `(Análise da IA: Categoria sugerida - ${aiAnalysis.category})\n\n${aiAnalysis.initialResponse}`,
                timestamp: new Date().toISOString(),
            });
        } else {
             newTicket.messages.push({
                sender: 'support',
                text: 'Olá! Agradecemos seu contato. Recebemos seu ticket e nossa equipe de suporte responderá em até 24 horas úteis.',
                timestamp: new Date().toISOString(),
            });
        }

        setTickets(prevTickets => [newTicket, ...prevTickets]);
        setModalOpen(false);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen py-12 md:py-16">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold">Suporte</h1>
                        <p className="mt-1 text-gray-400">Gerencie seus tickets de atendimento</p>
                    </div>
                    <button 
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Novo Ticket
                    </button>
                </div>

                {tickets.length === 0 ? (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg text-center py-20 px-6">
                        <ChatBubbleIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-white">Você ainda não tem tickets de suporte</h2>
                        <p className="text-gray-400 mt-2 mb-6">Precisa de ajuda? Crie seu primeiro ticket e nossa equipe responderá em breve.</p>
                        <button 
                            onClick={() => setModalOpen(true)}
                            className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                        >
                            Criar Primeiro Ticket
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="p-4 font-semibold">Assunto</th>
                                    <th className="p-4 font-semibold hidden md:table-cell">Ticket ID</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold hidden sm:table-cell">Última Atualização</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                                        <td className="p-4 font-medium">{ticket.subject}</td>
                                        <td className="p-4 text-gray-400 hidden md:table-cell">#{ticket.id.toString().padStart(6, '0')}</td>
                                        <td className="p-4"><StatusBadge status={ticket.status} /></td>
                                        <td className="p-4 text-gray-400 hidden sm:table-cell">{ticket.lastUpdate}</td>
                                        <td className="p-4 text-right">
                                            <button className="text-red-500 hover:text-red-400 font-semibold">Ver</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <NewTicketModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreateTicket}
                isSubmitting={isAiLoading}
            />
        </div>
    );
};

export default SupportPage;
