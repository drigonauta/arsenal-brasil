import { useState } from 'react';
import { Page } from '../types';

export interface UserActivity {
    currentPage: Page;
    currentProductId?: number;
    lastAction: string;
    timestamp: number;
}

export const useUserActivity = (initialPage: Page) => {
    const [activity, setActivity] = useState<UserActivity>({
        currentPage: initialPage,
        lastAction: 'App Opened',
        timestamp: Date.now(),
    });

    const trackNavigation = (page: Page, id?: number) => {
        setActivity({
            currentPage: page,
            currentProductId: id,
            lastAction: `Navigated to ${page}${id ? ` (ID: ${id})` : ''}`,
            timestamp: Date.now(),
        });
    };

    const trackAction = (action: string) => {
        setActivity(prev => ({
            ...prev,
            lastAction: action,
            timestamp: Date.now(),
        }));
    };

    return { activity, trackNavigation, trackAction };
};
