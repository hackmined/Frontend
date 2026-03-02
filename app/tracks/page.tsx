import React from 'react';
import TracksSection from '@/components/sections/TracksSection/TracksSection';

export const metadata = {
    title: 'Tracks — HACKAMINED 2026',
    description: 'Explore the challenge domains at HackaMined 2026. Choose your track and build impactful solutions.',
};

export default function TracksPage() {
    return (
        <main>
            <div style={{ paddingTop: '80px' }}>
                <TracksSection />
            </div>
        </main>
    );
}
