export interface SalesConfig {
    maxDiscountPercent: number; // Maximum discount percentage allowed (e.g., 10 for 10%)
    defaultMarkupPercent: number; // Default markup percentage to start negotiations (e.g., 20 for 20%)
    legalKitPrice: number; // Price of the "Kit Despachante"
    cleaningKitPrice: number; // Price of the "Kit Limpeza" (Brinde/Upsell)
}

export const salesConfig: SalesConfig = {
    maxDiscountPercent: 10,
    defaultMarkupPercent: 20,
    legalKitPrice: 899.00,
    cleaningKitPrice: 150.00
};
