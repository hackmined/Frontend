import Header from "@/components/layout/Header/Header";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import CursorTrail from "@/components/ui/CursorTrail/CursorTrail";
import HorizontalScroll from "@/containers/HorizontalScroll/HorizontalScroll";

export default function ContactPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#0b0d17' }}>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0
            }}>
                <img src="/bg.svg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            </div>

            <ContactSection />
        </main>
    );
}

// NOTE: Checked layout.tsx in previous steps
// layout.tsx:
// <body className...>
//   <CursorTrail />
//   <ScrollProgress />
//   <Header />
//   {children}
// </body>

// So yes, I just need to return the page content.
