import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
    title: "Portfolio | Muhammad Ali Ridho",
    description:
        "A curated collection of professional solutions and creative experiments by Muhammad Ali Ridho — from production automation to web development.",
    openGraph: {
        title: "Portfolio | Muhammad Ali Ridho",
        description:
            "Selected work — production automation tools, web portals, and data dashboards.",
    },
};

export default function PortfolioPage() {
    return <PortfolioPageClient />;
}
