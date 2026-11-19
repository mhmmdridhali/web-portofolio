import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { techStack } from "@/data/techStack";
import type { MediumItem } from "@/lib/medium";

const BASE_URL = "https://muhammadaliridho.my.id";
const PERSON_ID = `${BASE_URL}/#person`;
const WEBSITE_ID = `${BASE_URL}/#website`;

const SOCIAL_PROFILES = [
  "https://github.com/mhmmdridhali",
  "https://medium.com/@mhmmdaliridh",
  "https://linkedin.com/in/muhammad-ali-ridho",
  "https://www.instagram.com/mhmmdridhali",
];

function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return BASE_URL;
  return pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${BASE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function toIsoDate(value: string): string {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
}

export function getRootGraphJsonLd() {
  const knowsAbout = Array.from(
    new Set([
      ...techStack.map((item) => item.name),
      "Statistical Data Management",
      "Education Data Reporting",
      "Workflow Automation",
      "Multi-Agent Systems",
    ])
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Muhammad Ali Ridho",
        url: BASE_URL,
        jobTitle: "Statistician",
        description:
          "Statistician in the government sector, practical workflow automation builder, and writer based in South Kalimantan, Indonesia. Focuses on zero-server-cost tools using Google Apps Script, Python automation, Next.js, and multi-agent workflows.",
        homeLocation: {
          "@type": "Place",
          name: "South Kalimantan, Indonesia",
        },
        worksFor: {
          "@type": "Organization",
          name: "Government Sector",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Lambung Mangkurat",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          educationalLevel: "Bachelor's degree",
          name: "B.Ed. in Mathematics",
        },
        knowsAbout,
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BASE_URL,
        name: "Muhammad Ali Ridho | Portfolio",
        description:
          "Portfolio of Muhammad Ali Ridho: Statistician, Tech Enthusiast, and Writer. Less manual work, zero server bills, and tools people actually use.",
        inLanguage: "en-US",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}

export function getAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/about#webpage`,
    url: `${BASE_URL}/about`,
    name: "About | Muhammad Ali Ridho",
    description:
      "Learn about Muhammad Ali Ridho — a Statistician in the government sector wrangling education data, automating daily workflows with Google Apps Script & Python, and writing on Medium.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${BASE_URL}/about`,
        },
      ],
    },
  };
}

export function getExperiencePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/experience#webpage`,
    url: `${BASE_URL}/experience`,
    name: "Experience | Muhammad Ali Ridho",
    description:
      "Career journey of Muhammad Ali Ridho — from campus leadership and math tutoring to building data tools and automation systems in the public sector.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Experience",
          item: `${BASE_URL}/experience`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: experiences.length,
      itemListElement: experiences.map((exp, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Role",
          name: `${exp.title} — ${exp.org}`,
          roleName: exp.title,
          description: `${exp.subPeriod} (${exp.type}): ${exp.description}`,
          keywords: exp.tech.join(", "),
        },
      })),
    },
  };
}

export function getPortfolioPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/portfolio#webpage`,
    url: `${BASE_URL}/portfolio`,
    name: "Portfolio | Muhammad Ali Ridho",
    description:
      "Selected work by Muhammad Ali Ridho — production automation tools, Google Apps Script web apps, Python browser bots, and data portals.",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Portfolio",
          item: `${BASE_URL}/portfolio`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          applicationCategory: "WebApplication",
          operatingSystem: "Web",
          description: project.description,
          author: { "@id": PERSON_ID },
          keywords: project.tech.join(", "),
          ...(project.liveUrl && project.liveUrl !== "#"
            ? { url: project.liveUrl }
            : {}),
          ...(project.image ? { image: toAbsoluteUrl(project.image) } : {}),
        },
      })),
    },
  };
}

export function getArticlesPageJsonLd(articles: MediumItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/articles#webpage`,
    url: `${BASE_URL}/articles`,
    name: "Articles | Muhammad Ali Ridho",
    description:
      "Notes and essays on Medium by Muhammad Ali Ridho — covering education data, Google Apps Script automation, practical tech, and everyday reflections.",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Articles",
          item: `${BASE_URL}/articles`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          headline: article.title,
          url: article.link,
          datePublished: toIsoDate(article.pubDate),
          author: { "@id": PERSON_ID },
          ...(article.categories?.length
            ? { keywords: article.categories.join(", ") }
            : {}),
          ...(article.thumbnail ? { image: article.thumbnail } : {}),
        },
      })),
    },
  };
}
