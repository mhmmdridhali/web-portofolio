export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400 font-medium tracking-wider uppercase">
                    Loading
                </p>
            </div>
        </div>
    );
}
