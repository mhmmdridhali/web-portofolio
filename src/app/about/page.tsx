import type { Metadata } from "next";
import { getAboutPageJsonLd } from "@/lib/structured-data";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Muhammad Ali Ridho — a Statistician in the government sector wrangling education data, automating daily workflows with Google Apps Script & Python, and writing on Medium.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About | Muhammad Ali Ridho",
        description:
            "Statistician, Tech Enthusiast, and Writer. Math background, zero server bills, and practical workflow automation.",
        url: "/about",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About | Muhammad Ali Ridho",
        description:
            "Statistician, Tech Enthusiast, and Writer. Math background, zero server bills, and practical workflow automation.",
    },
};

export default function AboutPage() {
    const jsonLd = getAboutPageJsonLd();
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <AboutPageClient />
        </>
    );
}
