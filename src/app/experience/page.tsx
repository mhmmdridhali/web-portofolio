import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
    title: "Experience | Muhammad Ali Ridho",
    description:
        "Explore the career journey of Muhammad Ali Ridho — from academic organizations to professional data roles, a path of continuous growth and leadership.",
    openGraph: {
        title: "Experience | Muhammad Ali Ridho",
        description:
            "Career Journey — Professional experience, leadership roles, and technical mastery.",
    },
};

export default function ExperiencePage() {
    return <ExperiencePageClient />;
}
