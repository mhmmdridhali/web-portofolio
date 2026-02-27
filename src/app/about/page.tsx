import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "About | Muhammad Ali Ridho",
    description:
        "Learn about Muhammad Ali Ridho — a Statistician combining mathematical precision with modern technology to create efficient, data-driven solutions.",
    openGraph: {
        title: "About | Muhammad Ali Ridho",
        description:
            "Statistician, Tech Enthusiast, and Writer. Where Mathematics meets Technology.",
    },
};

export default function AboutPage() {
    return <AboutPageClient />;
}
