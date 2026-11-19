import type { Metadata } from "next";
import { getMediumArticles } from "@/lib/medium";
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
    return <ArticlesPageClient initialArticles={initialArticles} />;
}
