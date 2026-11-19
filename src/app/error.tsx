"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error boundary caught:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white/85 backdrop-blur-xl border border-neutral-200/80 p-10 rounded-[2rem] shadow-xl text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center">
                    <AlertTriangle
                        className="w-7 h-7 text-black"
                        aria-hidden="true"
                    />
                </div>
                <h2 className="text-2xl font-bold text-black mb-3">
                    Something went wrong
                </h2>
                <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                    An unexpected error occurred while loading this page. Please
                    try again or head back to the home page.
                </p>
                {error.digest && (
                    <p className="text-xs font-mono text-neutral-500 mb-8 tabular-nums">
                        Reference: {error.digest}
                    </p>
                )}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-7 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-[background-color,box-shadow,transform] duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-7 py-3 bg-white border border-neutral-300 text-black text-sm font-medium rounded-full hover:bg-neutral-50 transition-[background-color,box-shadow,transform] duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
