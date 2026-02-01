"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Debounce or just fire on mount
        const track = async () => {
            try {
                await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ path: pathname })
                });
            } catch (e) {
                // Fail silently
            }
        };

        track();
    }, [pathname]);

    return null;
}
