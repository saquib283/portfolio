import Script from 'next/script';

interface StructuredDataProps {
    settings?: any;
}

export default function StructuredData({ settings }: StructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Portfolio Owner",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com",
        "jobTitle": "Full Stack Developer",
        "description": settings?.about?.description || "Creative developer building interactive experiences.",
        "sameAs": [
            settings?.contact?.github || "",
            settings?.contact?.linkedin || "",
            settings?.contact?.twitter || ""
        ].filter(Boolean),
        "contactPoint": {
            "@type": "ContactPoint",
            "email": settings?.contact?.email || "",
            "contactType": "Professional"
        }
    };

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
