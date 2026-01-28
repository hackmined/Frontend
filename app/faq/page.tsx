import React from 'react';
import Header from '@/components/layout/Header/Header';
import FAQSection from '@/components/sections/FAQSection/FAQSection';

export default function FAQPage() {
    return (
        <main>
            <Header />
            <div style={{ paddingTop: '80px' }}> {/* Add padding for fixed header */}
                <FAQSection />
            </div>
        </main>
    );
}
