import React, { useState } from 'react';
import { Page } from '../types';
import { ChartBarIcon, UsersIcon, ShoppingBagIcon, CheckCircleIcon, XCircleIcon } from '../assets/icons';

interface AdminPanelPageProps {
    onNavigate: (page: Page) => void;
}

const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'products'>('dashboard');

    const stats = [
        { title: 'Vendas Totais', value: 'R$ 1.2M', change: '+12%', icon: <ChartBarIcon className="h-6 w-6 text-green-500" /> },
        { title: 'Usuários Ativos', value: '2.4k', change: '+5%', icon: <UsersIcon className="h-6 w-6 text-blue-500" /> },
        { title: 'Anúncios Pendentes', value: '14', change: '-2', icon: <ShoppingBagIcon className="h-6 w-6 text-amber-500" /> },
    ];

    const pendingUsers = [
        { id: 1, name: 'João Silva', type: 'Vendedor', cr: '123456', status: 'Pendente' },
        { id: 2, name: 'Armaria Central', type: 'Loja', cr: '987654', status: 'Pendente' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                    <div className="p-6">
                        <h2 className="text-2xl font-black text-white tracking-tighter">
                            ARSENAL <span className="text-arsenal-red">ADMIN</span>
                        </h2>
                    </div>
                    <nav className="flex-1 px-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-arsenal-red text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <ChartBarIcon className="h-5 w-5" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'users' ? 'bg-arsenal-red text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <UsersIcon className="h-5 w-5" />
                            Usuários
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-arsenal-red text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                            <ShoppingBagIcon className="h-5 w-5" />
                            Produtos
                        </button>
                    </nav>
                    <div className="p-4 border-t border-gray-700">
                        <button onClick={() => onNavigate('home')} className="w-full text-sm text-gray-400 hover:text-white">
                            Voltar para o Site
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">
                            {activeTab === 'dashboard' && 'Visão Geral'}
                            {activeTab === 'users' && 'Gerenciar Usuários'}
                            {activeTab === 'products' && 'Moderação de Anúncios'}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">Admin Logado</span>
                            <div className="h-10 w-10 rounded-full bg-gray-700 border-2 border-arsenal-red"></div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm text-gray-400">{stat.title}</p>
                                                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                                            </div>
                                            <div className="p-2 bg-gray-700/50 rounded-lg">
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                            {stat.change} <span className="text-gray-500 font-normal">vs mês anterior</span>
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity / Pending Approvals */}
                            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                                <div className="p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-bold text-white">Aprovações Pendentes</h3>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-gray-700/50 text-gray-400 text-sm uppercase">
                                        <tr>
                                            <th className="p-4">Usuário</th>
                                            <th className="p-4">Tipo</th>
                                            <th className="p-4">CR</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {pendingUsers.map(user => (
                                            <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="p-4 font-medium text-white">{user.name}</td>
                                                <td className="p-4 text-gray-300">{user.type}</td>
                                                <td className="p-4 text-gray-300 font-mono">{user.cr}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500/20 text-yellow-500">
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right space-x-2">
                                                    <button className="text-green-400 hover:text-green-300" title="Aprovar">
                                                        <CheckCircleIcon className="h-6 w-6" />
                                                    </button>
                                                    <button className="text-red-400 hover:text-red-300" title="Rejeitar">
                                                        <XCircleIcon className="h-6 w-6" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'dashboard' && (
                        <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl border border-dashed border-gray-700">
                            <p className="text-gray-500">Funcionalidade em desenvolvimento...</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminPanelPage;
