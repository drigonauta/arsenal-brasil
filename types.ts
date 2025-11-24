
export interface Product {
    id: number;
    name: string;
    caliber: string;
    price: string;
    imageUrls: string[];
    category: string;
    description: string;
    isPremium?: boolean;
    storeId?: number;
    storeVerified?: boolean;
    isCollectorItem?: boolean; // Exclusive for licensed collectors
}

export interface Message {
    sender: 'user' | 'bot';
    text: string;
    isStreaming?: boolean;
}

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

export interface FaqCategory {
    id: string;
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    count: number;
}

export interface SupportTicket {
    id: number;
    subject: string;
    status: 'Aberto' | 'Em Andamento' | 'Fechado';
    lastUpdate: string;
    messages: { sender: 'user' | 'support'; text: string; timestamp: string }[];
}

export interface UserProfile {
    name: string;
    email: string;
    memberSince: string;
    role: 'Membro' | 'Administrador' | 'Vendedor Verificado';
    avatarInitial: string;
    stats: {
        activeListings: number;
        sales: number;
        reviews: number;
        views: number;
    };
    crStatus: 'Não Enviado' | 'Em Análise' | 'Verificado' | 'Rejeitado';
}

export interface Store {
    id: number;
    name: string;
    logoUrl: string;
    description: string;
}

export type Page = 'home' | 'marketplace' | 'product' | 'cac-services' | 'legal-support' | 'faq' | 'support' | 'profile' | 'store' | 'register' | 'admin';
