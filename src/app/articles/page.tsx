import type { Metadata } from "next";
import ArticlesPageClient from "./ArticlesPageClient";

export const metadata: Metadata = {
    title: "Articles | Muhammad Ali Ridho",
    description:
        "Read articles by Muhammad Ali Ridho on Medium — thoughts on data, education, technology, and life reflections.",
    openGraph: {
        title: "Articles | Muhammad Ali Ridho",
        description:
            "A quiet corner for thoughts, where reflections and musings find their voice in words.",
    },
};

export default function ArticlesPage() {
    return <ArticlesPageClient />;
}
