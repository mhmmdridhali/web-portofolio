import type { Metadata } from "next";
import { getMediumArticles } from "@/lib/medium";
import { getArticlesPageJsonLd } from "@/lib/structured-data";
import ArticlesPageClient from "./ArticlesPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Articles",
    description:
        "Notes and essays on Medium by Muhammad Ali Ridho — covering education data, Google Apps Script automation, practical tech, and everyday reflections.",
    alternates: {
        canonical: "/articles",
    },
    openGraph: {
        url: "https://muhammadaliridho.my.id/articles",
        title: "Articles | Muhammad Ali Ridho",
        description:
            "A quiet corner for thoughts, where reflections, practical tech notes, and musings find their voice in words.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Articles | Muhammad Ali Ridho",
        description:
            "Notes and essays on Medium by Muhammad Ali Ridho — covering education data, automation, and everyday reflections.",
    },
};

export default async function ArticlesPage() {
    const initialArticles = await getMediumArticles();
    const recentLinks = new Set(initialArticles.recent.map((item) => item.link));
    const combined = [
        ...initialArticles.recent,
        ...initialArticles.library.filter((item) => !recentLinks.has(item.link)),
    ].slice(0, 20);
    const jsonLd = getArticlesPageJsonLd(combined);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticlesPageClient initialArticles={initialArticles} />
        </>
    );
}
