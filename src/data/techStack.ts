export interface TechStackItem {
    name: string;
    slug?: string;
    iconUrl: string;
}

// Clean monochrome SVG for Hermes Agent (Caduceus / Winged AI Agent Node symbol)
const HERMES_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1 4.83V22h2V6.83a3.001 3.001 0 0 1 0 0z"/>
        <path d="M4.5 6.5C2.5 6.5 1 8 1 9.5c0 2 2.5 3.5 6 3.5h1.5v-2H7c-2.2 0-4-.8-4-1.5 0-.5.7-1 1.5-1h4v-2h-4zm15 0h-4v2h4c.8 0 1.5.5 1.5 1 0 .7-1.8 1.5-4 1.5h-1.5v2H17c3.5 0 6-1.5 6-3.5 0-1.5-1.5-3-3.5-3z"/>
        <path d="M7.5 14.5c-1.8 0-3.5 1-3.5 2.5s1.7 2.5 3.5 2.5h2v-1.8h-2c-.9 0-1.7-.3-1.7-.7s.8-.7 1.7-.7h2V14.5h-2zm9 0h-2v1.8h2c.9 0 1.7.3 1.7.7s-.8.7-1.7.7h-2V19.5h2c1.8 0 3.5-1 3.5-2.5s-1.7-2.5-3.5-2.5z"/>
    </svg>`
)}`;

// Clean monochrome SVG for Microsoft Office ribbon mark
const OFFICE_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
        <path d="M14.7 2L4 5.9v12.2l3.6-1.3V7.9l7.1-2.1v12.4l-8.9-2.3L14.7 22l5.3-1.9V3.9L14.7 2z"/>
    </svg>`
)}`;

// Clean monochrome SVG for REST API (JSON braces + connected endpoint nodes)
const REST_API_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 4C5.5 4 5 5 5 6.5v3.2C5 11 3.8 12 3 12c.8 0 2 1 2 2.3v3.2C5 19 5.5 20 7 20"/>
        <path d="M17 4c1.5 0 2 1 2 2.5v3.2c0 1.3 1.2 2.3 2 2.3-.8 0-2 1-2 2.3v3.2c0 1.5-.5 2.5-2 2.5"/>
        <circle cx="9.5" cy="12" r="1.4" fill="black" stroke="none"/>
        <circle cx="14.5" cy="12" r="1.4" fill="black" stroke="none"/>
        <path d="M10.9 12h2.2"/>
    </svg>`
)}`;

export const techStack: TechStackItem[] = [
    // Row 1 — Automation, Data, Productivity & AI Infrastructure
    {
        name: "Google Apps Script",
        slug: "googleappsscript",
        iconUrl: "https://cdn.simpleicons.org/googleappsscript/black",
    },
    {
        name: "Google Workspace",
        slug: "googledrive",
        iconUrl: "https://cdn.simpleicons.org/googledrive/black",
    },
    {
        name: "Microsoft Office",
        iconUrl: OFFICE_SVG_DATA_URI,
    },
    {
        name: "Python",
        slug: "python",
        iconUrl: "https://cdn.simpleicons.org/python/black",
    },
    {
        name: "Hermes Agent",
        iconUrl: HERMES_SVG_DATA_URI,
    },
    {
        name: "Obsidian",
        slug: "obsidian",
        iconUrl: "https://cdn.simpleicons.org/obsidian/black",
    },
    {
        name: "Ubuntu",
        slug: "ubuntu",
        iconUrl: "https://cdn.simpleicons.org/ubuntu/black",
    },
    {
        name: "MySQL",
        slug: "mysql",
        iconUrl: "https://cdn.simpleicons.org/mysql/black",
    },
    // Row 2 — Web Development, API & Cloud Deployment
    {
        name: "JavaScript",
        slug: "javascript",
        iconUrl: "https://cdn.simpleicons.org/javascript/black",
    },
    {
        name: "TypeScript",
        slug: "typescript",
        iconUrl: "https://cdn.simpleicons.org/typescript/black",
    },
    {
        name: "Next.js",
        slug: "nextdotjs",
        iconUrl: "https://cdn.simpleicons.org/nextdotjs/black",
    },
    {
        name: "Tailwind CSS",
        slug: "tailwindcss",
        iconUrl: "https://cdn.simpleicons.org/tailwindcss/black",
    },
    {
        name: "REST API",
        iconUrl: REST_API_SVG_DATA_URI,
    },
    {
        name: "Postman",
        slug: "postman",
        iconUrl: "https://cdn.simpleicons.org/postman/black",
    },
    {
        name: "Git & GitHub",
        slug: "github",
        iconUrl: "https://cdn.simpleicons.org/github/black",
    },
    {
        name: "Vercel",
        slug: "vercel",
        iconUrl: "https://cdn.simpleicons.org/vercel/black",
    },
];
