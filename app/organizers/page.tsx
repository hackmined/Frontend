import OrganizersSection from "@/components/sections/OrganizersSection/OrganizersSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Organizing Team | Hackamined',
    description: 'Meet the team behind Hackamined 2026.',
};

export default function OrganizersPage() {
    return (
        <main>
            <OrganizersSection />
        </main>
    );
}
