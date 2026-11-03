export type ProjectCategory = "All" | "Team" | "Individual";

export interface ProjectItem {
    id: string;
    title: string;
    shortTitle: string;
    category: "Team" | "Individual";
    bentoSummary?: string;
    description: string;
    challenge: string;
    solution: string;
    architecture: string[];
    features: string[];
    tech: string[];
    liveUrl: string;
    image: string;
}

export const projects: ProjectItem[] = [
    // ========================================================================
    // NEW WORKS (GAS-FIRST + HERMES AGENT + OBSIDIAN + PYTHON AUTOMATION)
    // ========================================================================
    {
        id: "si-prima",
        title: "SI-PRIMA (Madrasah Achievement Information System)",
        shortTitle: "SI-PRIMA",
        category: "Individual",
        bentoSummary:
            "Google Apps Script portal tracking student, teacher, and school achievements across 20 districts, complete with public report cards and a verifier workspace.",
        description:
            "I built SI-PRIMA (Sistem Informasi Prestasi Madrasah) for the Ministry of Religious Affairs in Banjar Regency using Google Apps Script and Google Sheets. It collects academic, non-academic, and institutional achievements across all 20 districts (RA, MI, MTs, MA) and displays them on a public dashboard alongside an internal verifier workspace.",
        challenge:
            "Achievement records from hundreds of madrasahs across 20 districts used to arrive in scattered chat messages and mismatched spreadsheets. Compiling annual reports, checking certificate proofs, and tracking which schools had reported took days of manual sorting.",
        solution:
            "I built a web app inside the Google Workspace environment that school operators already use every day. SI-PRIMA runs from a single Apps Script deployment with five views (Public Dashboard, School Report Cards, Submission Form, User Guide, and Admin Verifier Workspace) backed directly by Google Sheets.",
        architecture: [
            "A single doGet router in Apps Script serves all five views (dashboard, school report card, submission form, guide, and admin verifier workspace).",
            "Records are stored across structured Google Sheets tabs: Parameter_Periode, Master_Madrasah, Data_Gabungan, Log_Pelaporan_Tahunan, and Daftar_Referensi.",
            "The annual reporting tracker separates schools across 20 districts into 'Belum Lapor', 'Sudah Lapor (Prestasi)', and 'Sudah Lapor (Nihil)'.",
            "In the Verifier Workspace, admins review uploaded certificates and mark submissions as Terverifikasi, Bukti Kurang, or Tidak Valid.",
        ],
        features: [
            "Public Rapor Prestasi dashboard with Chart.js charts and printable A4 PDF school report cards",
            "Covers 5 recipient categories (Individual Student, Team, Teacher/Staff, Institution, Alumni)",
            "Tracks competition and extracurricular achievements from District to International and SNBP/SPAN-PTKIN levels",
            "Annual compliance tracking ('Sudah Lapor Prestasi' vs. 'Sudah Lapor Nihil') across 20 districts",
            "Admin Verifier Workspace for checking certificates and validating submissions",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://s.id/SI-PRIMA",
        image: "/projects/siprima-thumb.webp",
    },
    {
        id: "monitor-bap-emis",
        title: "Monitor BAP EMIS & WhatsApp Recap Generator",
        shortTitle: "Monitor BAP EMIS",
        category: "Individual",
        bentoSummary:
            "Apps Script dashboard that pulls live EMIS BAP confirmation status via Bearer Token API into Google Sheets and formats 1-click WhatsApp recaps.",
        description:
            "A Google Apps Script monitoring web app that connects to the central EMIS REST API via Bearer Token to track Berita Acara Pendataan (BAP) confirmation progress across all madrasahs in Banjar Regency, paired with a 1-click WhatsApp recap generator.",
        challenge:
            "During EMIS data cut-off periods, checking which madrasahs (RA, MI, MTs, and MA) had confirmed their BAP meant logging into the central portal, filtering pages one by one, and typing status updates by hand for operator WhatsApp groups.",
        solution:
            "I built a lightweight Apps Script web app backed by Google Sheets that pulls live school confirmation states straight from the EMIS API, saves the latest sync timestamp in ScriptProperties, and formats a copy-ready WhatsApp summary.",
        architecture: [
            "Uses Bearer Token authorization to fetch live BAP confirmation data across all madrasah levels from the EMIS REST API.",
            "Clears old rows and writes fresh NSM, School Name, Level (RA/MI/MTs/MA), Confirmation Status, and Timestamp records into Google Sheets in one batch.",
            "Provides client-side table filters by confirmation status ('Sudah' or 'Belum Konfirmasi'), education level, and search keywords.",
            "The 'Buat Rekap WA' modal counts completed schools and lists unconfirmed ones in a ready-to-send WhatsApp message.",
        ],
        features: [
            "Direct EMIS REST API sync using Bearer Token input",
            "Batch writing to Google Sheets with Last Sync timestamp tracking",
            "Filterable table by level (RA/MI/MTs/MA) and BAP status",
            "1-click WhatsApp Recap Generator ('Buat Rekap WA') for operator follow-ups",
        ],
        tech: ["Google Apps Script", "EMIS API", "Google Sheets", "Tailwind CSS"],
        liveUrl: "https://script.google.com/macros/s/AKfycbz9ONqfDtu3jVpZkULljnSBHbFZV2zWHylQYxwtxJ0G7rzm1ipcoI6gtZUQMmB7ktmJYQ/exec",
        image: "/projects/bap-emis-thumb.webp",
    },
    {
        id: "survei-ikm",
        title: "Public Satisfaction Survey / IKM System (PermenPANRB 14/2017)",
        shortTitle: "Survei IKM",
        category: "Individual",
        bentoSummary:
            "Zero-cost Apps Script and Google Sheets kiosk survey app for the 9 service elements of PermenPANRB No. 14/2017 with automatic NRR/IKM scoring.",
        description:
            "A Community Satisfaction Survey (Survei Kepuasan Masyarakat / IKM) web app built on Google Apps Script and Google Sheets. Visitors fill out feedback on mobile phones or office kiosk tablets, and the system calculates IKM scores and service grades (Mutu A to D) following PermenPANRB No. 14 Tahun 2017.",
        challenge:
            "Public service offices must regularly report their Community Satisfaction Index (IKM) across 9 statutory elements. Paper forms require slow manual tallying, while generic form builders do not output standard PermenPANRB 14/2017 tables.",
        solution:
            "I built a self-contained Google Apps Script web app where a single Google Spreadsheet handles both settings ('Pengaturan' tab) and responses ('Responden' tab). It calculates weighted NRR and IKM scores (25 to 100) automatically and includes a print-ready admin report.",
        architecture: [
            "A 1-click setup function creates and formats the 'Pengaturan' and 'Responden' sheets with 17 standard columns.",
            "The survey screen (Index.html) walks visitors through demographics and the 9 statutory questions (U1 to U9), with an anti-spam timer and automatic kiosk reset.",
            "The calculation script computes NRR per element, weighted NRR (multiplied by 1/9), and IKM conversion (multiplied by 25), mapping scores to Mutu A through D.",
            "A password-protected admin view (?page=admin) shows date-filtered stats, demographic charts, and a printable official report with signature blocks.",
        ],
        features: [
            "Follows PermenPANRB No. 14 Tahun 2017 (9 Elements, 1 to 4 Scale)",
            "Built-in anti-spam timer (blocks rushed clicks) and auto-resetting Kiosk Mode",
            "Spreadsheet-driven settings for agency name, service types, and official signatories",
            "Automatic NRR, IKM score, and Service Grade (Mutu A/B/C/D) calculation",
            "Password-protected Admin Dashboard with printable report layout",
        ],
        tech: ["Google Apps Script", "Google Sheets", "HTML/CSS/JS"],
        liveUrl: "https://script.google.com/macros/s/AKfycbxtZkgTEbXRTlupW5pAxUOKjLIRt_fQ2IS6Fb4x_WNEvlSP9hRAWDDRUADKgdmlOJww/exec",
        image: "/projects/survei-ikm-thumb.webp",
    },
    {
        id: "hermes-multi-agent",
        title: "Hermes Multi-Agent Ecosystem ('Minerva')",
        shortTitle: "Hermes Agent Ecosystem",
        category: "Individual",
        bentoSummary:
            "Personal AI agent team led by 'Minerva' running 9+ cron jobs for official Google Docs generation, daily research, health reminders, and coding.",
        description:
            "A personal multi-agent setup powered by Hermes Agent. Led by 'Minerva' (my main orchestrator agent), the system coordinates 6 role-specific sub-agents connected to Google Workspace, Telegram Forum Topics, and my Obsidian vault.",
        challenge:
            "Juggling daily office statistics, official travel reports (LPD), regulatory reading, Medium drafts, personal finance logs, and workout reminders across separate apps took too much mental energy.",
        solution:
            "I set up a multi-agent team on Hermes Agent ('Minerva' plus The Coder, The Scribe/DocuHelper, The Scout/Researcher, The Writer, The Investor, and The Trainer) running scheduled cron jobs with Python pre-flight health checks and Telegram topic routing.",
        architecture: [
            "Minerva (Lead Agent) runs a 06:00 WITA daily context sync, logs end-of-day tasks to Google Sheets, and compiles Sunday weekly reviews.",
            "The Scribe (DocuHelper) turns short bullet points and Drive photos into formatted Kemenag travel reports (LPD) in Google Docs, while The Coder drafts Apps Script projects from structured specs.",
            "The Scout runs 3 daily research crons (Writing, News, Tech Pulse) where my Telegram replies train weekly topic weights and feed ideas to The Writer.",
            "A custom Python pre-flight wrapper checks tool-calling health before each cron job and restarts the gateway if a session hangs.",
        ],
        features: [
            "Coordinates 6 role agents (Coder, DocuHelper, Researcher, Writer, Finance, Health)",
            "9+ scheduled cron jobs with Python pre-flight health checks and auto-restart",
            "Generates formatted Google Docs LPD reports and updates Google Sheets trackers",
            "Learns topic preferences from my Telegram approvals on daily research briefs",
            "Routes messages to dedicated Telegram Forum Topics for each agent role",
        ],
        tech: ["Hermes Agent", "Python", "Google Workspace", "Telegram API", "Cron"],
        liveUrl: "",
        image: "/projects/hermes-agent-thumb.webp",
    },
    {
        id: "obsidian-second-brain",
        title: "Obsidian Second Brain & AI Agent Memory Vault",
        shortTitle: "Obsidian Second Brain",
        category: "Individual",
        bentoSummary:
            "'One Vault, Two Views' markdown vault synced 2-way in real time (VPS and Laptop) as shared long-term memory for me and my AI agents.",
        description:
            "An Obsidian vault ('One Vault, Two Views') that works both as my personal notebook on Windows and as file-based memory for my Hermes AI agents running on a Linux VPS.",
        challenge:
            "AI agents forget context between sessions when instructions, Kemenag regulations, EMIS notes, and daily logs stay buried in chat history instead of plain files.",
        solution:
            "I organized a shared Markdown vault with clear folder permissions, YAML frontmatter tags, real-time 2-way Syncthing replication between my VPS and laptop, and a daily Knowledge Building Loop.",
        architecture: [
            "Folder rules separate agent-writable directories (agents/<role>/memory.md, skills.md, reports/) from my personal folders (notes/, projects/, meetings/), using shared/context.md as the bridge.",
            "Syncthing keeps files synced in real time between the Linux VPS and my Windows laptop, while an hourly cron job backs up changes to GitHub.",
            "A morning Knowledge Building Loop prompts research on Kemenag rules, EMIS APIs, Verval PD/PDUM, BOS, and Statistician SOPs, saving approved notes into knowledge/.",
            "A weekly Python script (weekly_rekap_update.py) merges daily agent logs into monthly summaries and archives older files.",
        ],
        features: [
            "270+ Markdown notes with consistent YAML frontmatter and tags",
            "Real-time 2-way sync between VPS and laptop via Syncthing plus hourly GitHub backups",
            "Clear folder boundaries between human notes and agent memory files",
            "Reference library for EMIS, Kemenag regulations, GAS snippets, and Statistician SOPs",
            "Automated Python weekly and monthly recap scripts",
        ],
        tech: ["Obsidian", "Syncthing", "Git", "Python", "YAML Taxonomy"],
        liveUrl: "",
        image: "/projects/obsidian-vault-thumb.webp",
    },
    {
        id: "python-browser-automation",
        title: "Kemenag Browser Automation Suite (Ajuan TTE & EMIS BKH)",
        shortTitle: "Python Browser Automation",
        category: "Individual",
        bentoSummary:
            "Python Selenium and Playwright bots that automate 1-by-1 Electronic Signature (TTE) uploads and EMIS Special Needs (BKH) student checks into Excel.",
        description:
            "A set of Python browser scripts using Selenium, Playwright, and OpenPyXL to handle repetitive, high-volume tasks on national Ministry of Religious Affairs (Kemenag) web portals that do not offer bulk-upload APIs.",
        challenge:
            "Portals like tte.kemenag.go.id (Electronic Signatures) and emis.kemenag.go.id require operators to upload PDFs or check student records one by one through web forms. Doing hundreds of SKBK documents or NISN lookups by hand takes days.",
        solution:
            "I wrote Python scripts that drive a real Chrome session to upload and tag PDF batches on the TTE portal one by one, and cross-check student NISNs on EMIS while writing the results straight into Excel.",
        architecture: [
            "The Ajuan TTE bot (Selenium) logs into tte.kemenag.go.id, reads a local folder of PDFs, pulls the 'Perihal' from each filename, picks the document category, sets the signer and '#' tag, and submits each file in sequence.",
            "The EMIS BKH bot (Playwright + OpenPyXL) opens a persistent Chrome profile so I only log in once, reads 10-digit NISNs from Excel, searches emis.kemenag.go.id/pencarian-siswa, and grabs Disability and Special Needs fields.",
            "Both scripts save progress after every row and skip completed items if restarted, so a portal timeout never ruins a batch.",
        ],
        features: [
            "Automated 1-by-1 PDF upload and form filling on tte.kemenag.go.id with Selenium",
            "Handles Select2 dropdowns and dynamic form events automatically",
            "Uses a persistent Playwright Chrome profile to avoid repeated logins and CAPTCHAs",
            "Looks up student NISNs and extracts Special Needs (BKH) status from EMIS",
            "Saves verified rows directly into .xlsx files with auto-resume on interruption",
        ],
        tech: ["Python", "Playwright", "Selenium", "OpenPyXL"],
        liveUrl: "",
        image: "/projects/python-automation-thumb.webp",
    },

    // ========================================================================
    // EXISTING 10 PORTFOLIO PROJECTS
    // ========================================================================
    {
        id: "penmadbanjar",
        title: "Penmadbanjar.com (Madrasah Education Web Portal)",
        shortTitle: "Penmadbanjar.com",
        category: "Team",
        bentoSummary:
            "The official web portal for the Madrasah Education Section (Seksi Penmad) at Kemenag Banjar Regency, bringing announcements, services, and school data into one place.",
        description:
            "Built the official web portal for the Madrasah Education Section (Seksi Pendidikan Madrasah) at the Ministry of Religious Affairs in Banjar Regency. It replaces scattered chat announcements and manual admin requests with a single public website and internal admin panel.",
        challenge:
            "Official announcements, service guides, and institutional data for hundreds of madrasahs in Banjar Regency were previously spread across chat groups and static files without a central, mobile-friendly website.",
        solution:
            "Our team built a full-stack web portal with Next.js 16 and Tailwind CSS featuring a public information portal, technical SEO, and an authenticated admin dashboard for staff.",
        architecture: [
            "Uses the Next.js App Router for fast server-rendered public pages and clean search engine indexing.",
            "Includes an authenticated admin panel with a rich text editor for publishing news, regulations, and announcements.",
            "Uses pure CSS animations and optimized assets to keep the initial JavaScript bundle under 130kB.",
        ],
        features: [
            "Responsive public portal and authenticated admin dashboard",
            "Pure CSS animations with First Load JS kept under 130kB",
            "Automated sitemap, metadata, and SEO setup with a built-in rich text editor",
            "Modular structure ready for new madrasah data integrations",
        ],
        tech: ["Next.js 16", "TypeScript", "Tailwind CSS"],
        liveUrl: "https://penmadbanjar.com",
        image: "/projects/penmadbanjar-thumb.webp",
    },
    {
        id: "humas-award-2026",
        title: "Humas Award Penmad 2026",
        shortTitle: "Humas Award 2026",
        category: "Individual",
        description:
            "A serverless web app built on Google Apps Script to run the Humas Award 2026 submission and scoring process for madrasahs in Banjar Regency, with live leaderboards and multi-link submission forms.",
        challenge:
            "Collecting and checking hundreds of news article and video links submitted by competing madrasahs needed a single portal that could block duplicate URLs and show live submission counts.",
        solution:
            "I built a Google Apps Script web app backed by Google Sheets that lets operators submit multiple publication links at once, checks for duplicates on the server, and renders live Chart.js leaderboards.",
        architecture: [
            "The submission form lets school operators add and validate multiple publication links in one session.",
            "The Apps Script backend checks NSM codes and cleans up URLs before saving rows into Google Sheets.",
            "A live Chart.js dashboard totals submissions by madrasah and media category.",
        ],
        features: [
            "Live leaderboard and submission statistics dashboard",
            "Multi-link submission form with dynamic input rows",
            "Server-side duplicate link and anti-spam validation",
            "Searchable publication archive by madrasah",
            "Single-deployment view switching",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://script.google.com/macros/s/AKfycbwxZQG-NSWwwy1PMOgBXFeSTumyXBlo79sz_OdS0enRI9_NrjFk1UKZoXG3Bdjo68_B8Q/exec",
        image: "/projects/humasaward-thumb.webp",
    },
    {
        id: "icu-inventory-loan",
        title: "Inventory & Loan System RSISA ICU Banjarbaru",
        shortTitle: "Inventory & Loan System",
        category: "Individual",
        bentoSummary:
            "Web app for RSISA ICU to track medical equipment loans across hospital units with live stock status and return deadlines.",
        description:
            "A web application for the Intensive Care Unit (ICU) at RSI Sultan Agung Banjarbaru to track medical equipment loans across hospital rooms, replacing paper logbooks with a live digital ledger.",
        challenge:
            "Tracking high-value ICU medical equipment loans across hospital units on paper logbooks made it hard for nurses to see which devices were available or overdue.",
        solution:
            "I built a Google Apps Script inventory and loan portal using Google Sheets as the database, with instant stock updates, borrowing forms, and return tracking.",
        architecture: [
            "A live equipment catalog reads current stock and borrowed counts straight from Google Sheets.",
            "Borrowing and return forms log the borrower, unit, timestamps, and item condition automatically.",
            "An admin view highlights active loans, overdue returns, and borrowing history.",
        ],
        features: [
            "Live medical equipment catalog with availability badges",
            "Digital borrowing and return workflow",
            "Admin dashboard for managing stock and loans",
            "Overdue loan alerts and deadline tracking",
            "Exportable loan history for hospital reporting",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Tailwind CSS"],
        liveUrl: "https://script.google.com/macros/s/AKfycbwLjJjFmtVY1TOIjEaTuTlifCXgCq6NwqPALjCSHgvDcrhcv6PFwMJITdginwd-Xfc8/exec",
        image: "/projects/icu-inventory-thumb.webp",
    },
    {
        id: "taskly",
        title: "Taskly (Personal To-Do List App)",
        shortTitle: "Taskly",
        category: "Individual",
        bentoSummary:
            "Personal to-do list app with a Neobrutalism UI, list and Kanban views, live user counter, and Google OAuth login.",
        description:
            "A personal to-do list web app styled with a bold Neobrutalism interface. It includes list and Kanban boards, a live online user counter, and Google OAuth login with Supabase.",
        challenge:
            "I wanted a fast, colorful personal task manager that lets me switch between a simple checklist and a Kanban board without slow page loads.",
        solution:
            "Built a web app with Next.js, Tailwind CSS, and Supabase featuring Google OAuth login and real-time task state updates.",
        architecture: [
            "Uses Google OAuth with PKCE flow in Supabase for user sign-in and session handling.",
            "Supports switching between a standard checklist and status-based Kanban columns.",
            "Uses Supabase Realtime to display active user presence and toast alerts.",
        ],
        features: [
            "Google OAuth and Supabase SSR authentication",
            "List and Kanban task boards",
            "Live online user counter",
            "Neobrutalism UI with toast notifications",
        ],
        tech: ["Next.js", "Supabase", "Tailwind CSS"],
        liveUrl: "https://taskly.muhammadaliridho.my.id",
        image: "/projects/taskly-thumb.webp",
    },
    {
        id: "emis-student-automation",
        title: "EMIS Student Data Automation",
        shortTitle: "EMIS Data Automation",
        category: "Individual",
        description:
            "A Google Apps Script tool that pulls student rosters directly from the Ministry's EMIS API across dozens of madrasahs and organizes them into per-school Google Sheets tabs.",
        challenge:
            "Downloading final-year student rosters (RA, MI, MTs, MA) from EMIS used to mean exporting and combining Excel files one school at a time.",
        solution:
            "I wrote Apps Script batch scripts (RA.js, MI.js, MTS.js, MA.js) that paginate through the EMIS API, grab school metadata, and create formatted tabs for each madrasah automatically.",
        architecture: [
            "Iterates through institution IDs and multi-page student lists using UrlFetchApp.",
            "Creates and names individual sheets in the format 'NPSN - Nama Lembaga'.",
            "Extracts 14 key student columns from raw JSON responses into clean tables.",
        ],
        features: [
            "Batch student extraction across RA, MI, MTs, and MA levels",
            "Automatic sheet creation ('NPSN - Nama Lembaga')",
            "Filters raw API responses down to 14 essential columns",
            "Handles multi-page API pagination automatically",
        ],
        tech: ["Google Apps Script", "Google Sheets", "REST API"],
        liveUrl: "",
        image: "/projects/emis-thumb.webp",
    },
    {
        id: "si-pelita",
        title: "SI-PELITA (Information and Data Reporting System)",
        shortTitle: "SI-PELITA",
        category: "Individual",
        bentoSummary:
            "Web helpdesk for madrasah operators to submit and track EMIS and VervalPD student data correction requests on Google Workspace.",
        description:
            "A web helpdesk portal where madrasah operators submit student data correction requests (EMIS and VervalPD). It runs entirely on Google Apps Script, Sheets, and Drive with zero hosting costs.",
        challenge:
            "School operators used to send EMIS and VervalPD fix requests (wrong grade level, duplicate NIK, student reactivation) through WhatsApp chats, making it easy for files and tickets to get lost.",
        solution:
            "I built SI-PELITA on Google Apps Script to route uploaded PDF proofs into categorized Google Drive folders and give operators a ticket number they can track online.",
        architecture: [
            "Serves separate views for Ticket Search, EMIS Issues, VervalPD Issues, Collective Reports, User Guide, and Admin.",
            "Routes uploaded PDF attachments into matching Google Drive folders (Salah Tingkat, Reaktivasi, NIK Ganda, Data Tidak Ada).",
            "Generates ticket IDs, logs status changes in Google Sheets, and plots monthly ticket volume with Chart.js.",
        ],
        features: [
            "Live ticket status lookup by Ticket ID or WhatsApp number",
            "Dedicated forms for EMIS, VervalPD, and collective school requests",
            "Automatic Google Drive folder sorting for uploaded PDFs",
            "Admin dashboard with token login and Chart.js stats",
            "Duplicate submission checks and revision notes",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Google Drive API", "Bootstrap"],
        liveUrl: "https://s.id/SIPELITA",
        image: "/projects/sipelita-thumb.webp",
    },
    {
        id: "icu-leave-monitoring",
        title: "ICU RSISA Leave Monitoring System",
        shortTitle: "ICU Leave Monitoring",
        category: "Individual",
        description:
            "A web application for monitoring staff leave schedules in the hospital ICU. It replaces paper leave requests with an automated calendar that warns admins when too many nurses request the same day off.",
        challenge:
            "In a hospital ICU, overlapping staff leave requests can cause dangerous shift shortages if schedules are not checked against daily staffing limits.",
        solution:
            "I built a Google Apps Script leave request and calendar dashboard backed by Google Sheets that checks date conflicts automatically and tracks remaining annual leave.",
        architecture: [
            "The submission form (index.html) checks requested dates against existing shift limits before saving.",
            "The calendar dashboard (admin.html) displays daily staff coverage and upcoming leave.",
            "The backend script (Code.js) calculates remaining leave quotas and logs every approval.",
        ],
        features: [
            "Online leave submission form",
            "Interactive calendar dashboard",
            "Overlapping schedule conflict detection",
            "Automatic annual leave balance calculation",
            "Approval and activity log",
        ],
        tech: ["Google Apps Script", "Google Sheets", "HTML/CSS/JS", "SweetAlert2"],
        liveUrl: "https://s.id/Cuti2026",
        image: "/projects/cuti-thumb.webp",
    },
    {
        id: "pojok-statistik-madrasah",
        title: "Pojok Statistik Madrasah Kab. Banjar",
        shortTitle: "Pojok Statistik",
        category: "Individual",
        description:
            "An interactive public dashboard for madrasah education statistics in Banjar Regency. It turns static EMIS spreadsheet exports into filterable charts covering schools, students, and teachers.",
        challenge:
            "Staff and the public needed a quick way to check madrasah counts, student numbers, and teacher qualifications by district without digging through large Excel files.",
        solution:
            "I connected cleaned EMIS recapitulation sheets in Google Sheets to an interactive Looker Studio dashboard covering all districts in Banjar Regency.",
        architecture: [
            "Standardized Google Sheets tables hold institutional, student, and personnel data from EMIS.",
            "Interactive filters let viewers drill down by district, school status (Negeri/Swasta), and level.",
            "Includes searchable school tables by NSM and downloadable summary data.",
        ],
        features: [
            "Madrasah distribution across all districts in Banjar Regency",
            "Teacher and student breakdowns by gender and employment status",
            "Searchable directory by madrasah name or NSM code",
            "Downloadable summary tables for offline reports",
            "Accreditation grade and curriculum overview",
        ],
        tech: ["Google Sheets", "Looker Studio", "EMIS Data"],
        liveUrl: "https://lookerstudio.google.com/u/0/reporting/0ea71311-8249-426c-9d96-067c1c282713/page/YOWYF",
        image: "/projects/pojokstatistik-thumb.webp",
    },
    {
        id: "madrasah-profile-system",
        title: "Madrasah Profile & Principal Contact System",
        shortTitle: "Madrasah Profile System",
        category: "Individual",
        description:
            "A Google Apps Script web app for updating madrasah profiles and maintaining a clean directory of principal (Kepala Madrasah) WhatsApp contacts across Banjar Regency.",
        challenge:
            "Keeping school addresses and principal phone numbers up to date across hundreds of madrasahs was messy because of inconsistent phone formats (+62, 08, spaces, dashes) and duplicate rows.",
        solution:
            "I built an Apps Script web form with NPSN/NSM auto-fill, automatic phone number cleanup (converting all inputs to 08xxxxxxxxxx), in-place row updates, and an Admin Contact Directory (?v=admin).",
        architecture: [
            "Looks up existing schools by NPSN or NSM and updates the row in place instead of creating duplicates.",
            "A phone normalizer (normalizePhone_) strips spaces and dashes and converts +62 or 62 prefixes into standard 08xx numbers for 1-click WhatsApp chat links.",
            "The Admin Panel (?v=admin) provides a searchable contact book of madrasah principals.",
        ],
        features: [
            "NPSN and NSM lookup with automatic form pre-fill",
            "Automatic WhatsApp number formatting (08xxxxxxxxxx)",
            "Admin directory for contacting madrasah principals",
            "Client and server input validation with WITA timestamps",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Bootstrap 5"],
        liveUrl: "https://s.id/ProfilLembagaKabBanjar",
        image: "/projects/profilmadrasah-thumb.webp",
    },
    {
        id: "si-perkas",
        title: "SI-PERKAS (Teacher Allowance Filing System)",
        shortTitle: "SI-PERKAS",
        category: "Individual",
        bentoSummary:
            "Digital filing system for collecting and verifying teacher professional allowance (TPG) PDF documents using Apps Script, Sheets, and Drive.",
        description:
            "A digital filing and verification portal for monthly teacher and supervisor professional allowance (TPG) documents, built on Google Apps Script, Google Sheets, and Google Drive.",
        challenge:
            "Collecting physical binders of monthly teacher allowance (TPG) documents from schools across the regency took up shelves of office space and slowed down verification.",
        solution:
            "I built SI-PERKAS on Google Apps Script so teachers can upload PDF files online, while the script organizes them into Google Drive folders and tracks verification status in Google Sheets.",
        architecture: [
            "Checks PDF file sizes and naming rules before uploading files through the Google Drive API.",
            "Sorts uploaded files automatically into Drive folders by period and school.",
            "Provides a cached admin dashboard for verifiers to filter submissions, update statuses, and export Excel reports.",
        ],
        features: [
            "10MB PDF upload validation",
            "Admin verification dashboard with server caching",
            "Automatic Google Drive folder sorting and archiving",
            "Submission status tracking for teachers",
            "Excel recapitulation export",
        ],
        tech: ["Google Apps Script", "Google Sheets", "Google Drive API", "Bootstrap 5", "Chart.js"],
        liveUrl: "https://s.id/SIPERKAS",
        image: "/projects/siperkas-thumb.webp",
    },
];
