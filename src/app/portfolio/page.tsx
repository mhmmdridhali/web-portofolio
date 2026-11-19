import type { Metadata } from "next";
import PortfolioPageClient from "./PortfolioPageClient";

export const metadata: Metadata = {
    title: "Portfolio",
    description:
        "Selected work by Muhammad Ali Ridho — production automation tools, Google Apps Script web apps, Python browser bots, and data portals.",
    alternates: {
        canonical: "/portfolio",
    },
    openGraph: {
        title: "Portfolio | Muhammad Ali Ridho",
        description:
            "Production automation tools, Google Apps Script web portals, and data systems designed to eliminate repetitive manual work.",
        url: "/portfolio",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio | Muhammad Ali Ridho",
        description:
            "Production automation tools, Google Apps Script web portals, and data systems designed to eliminate repetitive manual work.",
    },
};

export default function PortfolioPage() {
    return <PortfolioPageClient />;
}
