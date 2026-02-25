"use client";

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-black text-white py-20 px-4 md:px-6 rounded-t-[3rem] mt-12 relative overflow-hidden"
        >
            {/* Abstract shape */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left relative z-10">
                <div className="max-w-md">
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Open for opportunities, collaborations, or a simple chat about data
                        and technology.
                    </p>
                    <a
                        href="mailto:ridhoali1922@gmail.com"
                        className="inline-block mt-8 text-xl font-medium border-b border-gray-600 pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors"
                    >
                        ridhoali1922@gmail.com
                    </a>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    {/* GitHub */}
                    <a
                        href="https://github.com/mhmmdridhali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                        aria-label="GitHub"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                        href="http://linkedin.com/in/muhammad-ali-ridho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/mhmmdridhali?igsh=MTU4ZXk3dzU0anR3cw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                        aria-label="Instagram"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </a>
                    {/* Medium */}
                    <a
                        href="https://medium.com/@mhmmdaliridh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                        aria-label="Medium"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.52 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z" />
                        </svg>
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-900 text-center text-sm text-gray-600 relative z-10">
                © 2026 Muhammad Ali Ridho. Designed with minimalist principles.
            </div>
        </footer>
    );
}
