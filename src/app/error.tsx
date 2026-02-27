"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2rem] shadow-xl text-center">
                <span className="text-5xl block mb-6">⚠️</span>
                <h2 className="text-2xl font-bold mb-3">
                    Something went wrong
                </h2>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                    {error.message || "An unexpected error occurred. Please try again."}
                </p>
                <button
                    onClick={() => reset()}
                    className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
