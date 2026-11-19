import type { Metadata } from "next";
import { getExperiencePageJsonLd } from "@/lib/structured-data";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
    title: "Experience",
    description:
        "Career journey of Muhammad Ali Ridho — from campus leadership and math tutoring to building data tools and automation systems in the public sector.",
    alternates: {
        canonical: "/experience",
    },
    openGraph: {
        title: "Experience | Muhammad Ali Ridho",
        description:
            "Professional experience, campus leadership, and data management workflows across public and academic sectors.",
        url: "/experience",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Experience | Muhammad Ali Ridho",
        description:
            "Professional experience, campus leadership, and data management workflows across public and academic sectors.",
    },
};

export default function ExperiencePage() {
    const jsonLd = getExperiencePageJsonLd();
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ExperiencePageClient />
        </>
    );
}
