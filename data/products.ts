
import { Product } from '../types';

export const products: Product[] = [
    {
        id: 1,
        name: "Pistola Taurus G2C",
        caliber: "9mm",
        price: "R$ 3.200,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1633967563948-a60586483550?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1563239999-395650314b35?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1603473922221-229d33585456?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Pistola",
        description: "A Pistola Taurus G2C é uma arma compacta, ergonômica e leve. Ideal para porte velado e defesa pessoal, com armação em polímero de alta resistência e ferrolho em aço. Possui sistema de mira de 3 pontos e trava de gatilho.",
        storeId: 1,
    },
    {
        id: 5,
        name: "Pistola Glock G19 Gen5",
        caliber: "9mm",
        price: "R$ 7.800,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1626293111721-b6a43a24e5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1619053282063-358315348f39?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1617331621954-27938c453479?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Pistola",
        description: "A Glock G19 Gen5 é a evolução de uma das pistolas mais populares do mundo. Com novo acabamento nDLC, cano Glock Marksman Barrel (GMB) e empunhadura sem sulcos para os dedos, oferece maior precisão e versatilidade.",
        isPremium: true,
        storeId: 2,
        storeVerified: true,
        isCollectorItem: true,
    },
    {
        id: 2,
        name: "Carabina CBC Jade Pro",
        caliber: "5.5mm",
        price: "R$ 1.850,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1571757767154-015565738153?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1451256656123-d628e088c433?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-152098B93211-358424324612?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Carabina",
        description: "A Carabina de Pressão CBC Jade Pro Nitro é a escolha perfeita para atiradores que buscam precisão e potência. Com mola Gás Ram (Nitro), oferece disparos mais uniformes e com menos vibração. Coronha em polipropileno de alta resistência.",
        storeId: 1,
    },
    {
        id: 3,
        name: "Revólver Taurus RT85S",
        caliber: ".38 SPL",
        price: "R$ 2.900,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1607397975599-851693319350?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1580784109483-894f6072a603?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1633172283305-39b65519cce3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Revólver",
        description: "O Revólver Taurus 85S é um clássico da defesa pessoal. Com capacidade para 5 tiros no calibre .38 SPL, possui acabamento em inox fosco e cabo de borracha anatômico, garantindo uma empunhadura firme e segura.",
        storeId: 2,
    },
    {
        id: 4,
        name: "Espingarda CBC Pump Military",
        caliber: "12 GA",
        price: "R$ 4.500,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1627163432147-133a15734f84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1632484339592-655ab6504853?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1569811419328-899253484a43?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Espingarda",
        description: "A Espingarda CBC Pump Military 3.0 é robusta e confiável, ideal para uso policial e defesa patrimonial. Com coronha retrátil e capacidade para 7+1 cartuchos, é uma arma versátil e de alto poder de fogo.",
        storeId: 1,
    },
    {
        id: 6,
        name: "Rifle CBC 7022 Way",
        caliber: ".22 LR",
        price: "R$ 2.100,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1591123720169-2602f6163a69?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1571757767154-015565738153?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-152098B93211-358424324612?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Rifle",
        description: "O Rifle Semiautomático CBC 7022 Way é leve, preciso e versátil. Ideal para o lazer, iniciação no tiro esportivo e caça de pequenos animais. Possui coronha de polipropileno e trilho para fixação de acessórios ópticos.",
        storeId: 3,
    },
    {
        id: 7,
        name: "Revólver Rossi RM66",
        caliber: ".357 Magnum",
        price: "R$ 5.200,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1558961165-39f60431b33b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1607397975599-851693319350?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1580784109483-894f6072a603?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Revólver",
        description: "O Revólver Rossi RM66 é uma arma potente e imponente no calibre .357 Magnum. Com cano de 6 polegadas e capacidade para 6 tiros, é perfeito para o tiro esportivo de precisão e defesa residencial.",
        isPremium: true,
        storeId: 2,
        storeVerified: true,
    },
    {
        id: 8,
        name: "Espingarda Boito A-680",
        caliber: "12 GA",
        price: "R$ 3.100,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1517696095338-61a49b8c065a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1632484339592-655ab6504853?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1569811419328-899253484a43?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ],
        category: "Espingarda",
        description: "A Espingarda Boito A-680 é uma arma de canos sobrepostos, robusta e confiável, ideal para a caça e o tiro ao prato. Possui extrator mecânico e coronha em madeira de lei, unindo tradição e desempenho.",
        storeId: 3,
    },
    {
        id: 9,
        name: "Munição 9mm Luger CBC - 50un",
        caliber: "9mm",
        price: "R$ 350,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1599313689405-2436dce7559e?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2000&auto=format&fit=crop"
        ],
        category: "Munição",
        description: "Caixa com 50 munições calibre 9mm Luger CBC. Projétil ogival de 124gr, ideal para treinamento e defesa. Venda controlada para portadores de CR ou registro de arma.",
        storeId: 1,
        storeVerified: true
    },
    {
        id: 10,
        name: "Rifle Airsoft M4A1 Full Metal",
        caliber: "6mm",
        price: "R$ 1.890,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558961165-39f60431b33b?q=80&w=2000&auto=format&fit=crop"
        ],
        category: "Airsoft",
        description: "Rifle de Airsoft M4A1 Full Metal elétrico (AEG). Gearbox V2 reforçada, hop-up ajustável e alta cadência de tiro. Acompanha bateria e carregador.",
        storeId: 3,
    },
    {
        id: 11,
        name: "Red Dot Holográfico 1x30",
        caliber: "N/A",
        price: "R$ 450,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1584039257564-44c747d21f82?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591123720169-2602f6163a69?q=80&w=2000&auto=format&fit=crop"
        ],
        category: "Acessórios",
        description: "Mira Red Dot Holográfica 1x30 com 11 níveis de intensidade. Retículo iluminado em vermelho e verde. Compatível com trilhos Picatinny de 20mm e 22mm.",
        storeId: 2,
    },
    {
        id: 12,
        name: "Pistola de Pressão Beeman 2004",
        caliber: "5.5mm",
        price: "R$ 680,00",
        imageUrls: [
            "https://images.unsplash.com/photo-1571757767154-015565738153?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-152098B93211-358424324612?q=80&w=2000&auto=format&fit=crop"
        ],
        category: "Armas de Pressão",
        description: "Pistola de Pressão Beeman 2004 P17. Ação por ar comprimido (PCA), sem recuo e de alta precisão. Ideal para tiro ao alvo e iniciação no esporte.",
        storeId: 1,
    }
];
