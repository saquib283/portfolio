import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "../index.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MouseSpotlight from "@/components/ux/MouseSpotlight";

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
    title: {
        default: "Portfolio | Md Rehan Saquib",
        template: "%s | Portfolio"
    },
    description: "A showcase of creative development, interactive experiences, and full-stack engineering.",
    keywords: ["Next.js", "React", "Developer", "Portfolio", "Three.js", "Creative", "Full Stack", "Web Development"],
    authors: [{ name: "Md Rehan Saquib" }],
    creator: "Portfolio Owner",
    openGraph: {
        title: "Portfolio | Md Rehan Saquib",
        description: "A showcase of creative development and interactive experiences.",
        url: "/",
        siteName: "Portfolio",
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        title: "Portfolio | Md Rehan Saquib",
        card: "summary_large_image",
    },
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${syne.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
            <body className="font-sans antialiased overflow-x-hidden">
                <ThemeProvider>
                    <MouseSpotlight />
                    <div className="relative w-full max-w-[100vw] overflow-x-hidden min-h-screen flex flex-col">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
