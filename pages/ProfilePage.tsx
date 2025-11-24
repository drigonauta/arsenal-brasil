
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { EnvelopeIcon, CalendarDaysIcon, InboxArrowDownIcon, ArrowTrendingUpIcon, StarIcon, EyeIcon } from '../assets/icons';
import CrVerification from '../components/CrVerification';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserProfile>({
        name: 'Rodrigo Ribeiro',
        email: 'drigonauta@gmail.com',
        memberSince: '22/11/2025',
        role: 'Administrador',
        avatarInitial: 'R',
        stats: {
            activeListings: 0,
            sales: 0,
            reviews: 0,
            views: 0,
        },
        crStatus: 'Não Enviado',
    });

    const handleCrStatusChange = (newStatus: UserProfile['crStatus']) => {
        setUser(prevUser => ({
            ...prevUser,
            crStatus: newStatus,
            role: newStatus === 'Verificado' ? 'Vendedor Verificado' : prevUser.role,
        }));
    };

    const statItems = [
        { name: 'Anúncios Ativos', value: user.stats.activeListings, icon: <InboxArrowDownIcon className="h-8 w-8 text-blue-400" /> },
        { name: 'Vendas Realizadas', value: user.stats.sales, icon: <ArrowTrendingUpIcon className="h-8 w-8 text-green-400" /> },
        { name: 'Avaliações', value: user.stats.reviews, icon: <StarIcon className="h-8 w-8 text-yellow-400" /> },
        { name: 'Visualizações', value: user.stats.views, icon: <EyeIcon className="h-8 w-8 text-purple-400" /> },
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen py-12 md:py-16">
            <div className="container mx-auto px-6 max-w-5xl">
                
                {/* User Header */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex items-center gap-6">
                    <div className="flex-shrink-0 h-24 w-24 bg-orange-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                        {user.avatarInitial}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-gray-400 text-sm">
                            <span className="flex items-center gap-1.5"><EnvelopeIcon className="h-4 w-4" /> {user.email}</span>
                            <span className="flex items-center gap-1.5"><CalendarDaysIcon className="h-4 w-4" /> Membro desde {user.memberSince}</span>
                            <span className="bg-orange-500/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{user.role}</span>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {statItems.map(item => (
                        <div key={item.name} className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{item.name}</p>
                                <p className="text-3xl font-bold text-white">{item.value}</p>
                            </div>
                            {item.icon}
                        </div>
                    ))}
                </div>

                {/* CR Verification Section */}
                <CrVerification user={user} onStatusChange={handleCrStatusChange} />

            </div>
        </div>
    );
};

export default ProfilePage;
