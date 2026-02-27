import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-8xl font-extrabold tracking-tight mb-4 text-black">
                    404
                </h1>
                <p className="text-xl text-gray-500 mb-8">
                    This page doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-block"
                >
                    Back to Home →
                </Link>
            </div>
        </div>
    );
}
