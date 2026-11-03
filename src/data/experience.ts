export interface ExperienceItem {
    period: string;
    isCurrent: boolean;
    title: string;
    org: string;
    type: string;
    description: string;
    achievements: string[];
    tech: string[];
}

export const experiences: ExperienceItem[] = [
    {
        period: "Present",
        isCurrent: true,
        title: "Statistician (Statistisi Ahli Pertama)",
        org: "Ministry of Religious Affairs (Kemenag Kab. Banjar)",
        type: "Professional",
        description:
            "Managing and analyzing Islamic education data (EMIS, Verval PD, PDUM, TKA) for madrasahs across Banjar Regency. Most operational bottlenecks in our office do not need heavy cloud infrastructure, so I build tools primarily with Google Apps Script and Google Workspace. They cost nothing to run, take very little time to set up, and work right inside the spreadsheets and folders that staff and school operators already use every day.",
        achievements: [
            "Built 10+ Google Apps Script web apps and dashboards (SI-PRIMA, SI-PELITA, SI-PERKAS, Monitor BAP EMIS, Humas Award) running on Google Sheets and Drive with zero hosting bills",
            "Wrote Python browser automation scripts (Selenium and Playwright) for repetitive national portal tasks, including 1-by-1 Electronic Signature (TTE) uploads and EMIS Special Needs (BKH) student checks",
            "Set up a personal Hermes Multi-Agent system ('Minerva') synced 2-way with an Obsidian vault for daily cron jobs, official LPD report drafting, and research",
            "Cleaned up NSM/NPSN reconciliation and school reporting workflows across 20 districts, cutting manual recapitulation time by roughly 80%",
        ],
        tech: [
            "Google Apps Script",
            "Google Workspace",
            "Python Automation",
            "Hermes Agent",
            "Obsidian",
            "Data Reconciliation",
        ],
    },
    {
        period: "Feb 2023 - Jun 2023",
        isCurrent: false,
        title: "Project Officer Intern",
        org: "Yayasan Hasnur Centre - HAFECS",
        type: "Internship",
        description:
            "Helped run 5 educational programs, managed schedules and work plans, and coordinated day-to-day communication for more than 600 participants and partners.",
        achievements: [
            "Handled logistics and timelines for 5 training programs running at the same time",
            "Coordinated with 600+ participants, speakers, and partner institutions",
            "Built shared work plans and progress trackers for the program team",
            "Kept communication moving smoothly across internal divisions",
        ],
        tech: ["Project Management", "Stakeholder Communication", "Scheduling", "Reporting"],
    },
    {
        period: "2022 - 2023",
        isCurrent: false,
        title: "Online Tutor",
        org: "Marbelika",
        type: "Teaching",
        description:
            "Taught online mathematics sessions, wrote step-by-step practice materials, and helped students get comfortable solving problems on their own.",
        achievements: [
            "Taught live online math classes for students across different grade levels",
            "Wrote clear, step-by-step worksheets and practice sets",
            "Adjusted teaching pace and examples to match how each student learned best",
            "Practiced explaining tricky math concepts in plain language through 1-on-1 tutoring",
        ],
        tech: ["Mathematics", "Online Teaching", "Curriculum Design", "Student Assessment"],
    },
    {
        period: "Mar 2022 - Feb 2023",
        isCurrent: false,
        title: "Head / Leader",
        org: "KSI Ulul Albab",
        type: "Organization",
        description:
            "Led more than 50 active student members across 6 divisions, planned annual campus programs, and partnered with 10+ student organizations.",
        achievements: [
            "Coordinated 50+ active members across 6 operational divisions",
            "Planned and ran 12+ campus and community programs over the year",
            "Worked with 10+ partner organizations on joint events",
            "Supported division leads with regular check-ins and planning sessions",
        ],
        tech: ["Leadership", "Strategic Planning", "Team Management", "Partnership Development"],
    },
];

export const experienceStats = [
    { value: "15+", label: "GAS & Automation Tools Built" },
    { value: "600+", label: "Stakeholders Coordinated" },
    { value: "20", label: "Districts Covered in Banjar" },
    { value: "80%", label: "Manual Work Reduced" },
];
