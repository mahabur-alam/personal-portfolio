import { skillCategories, type SkillCategoryId } from "@/content/skills";

/**
 * Verifiable profile facts (CLAUDE.md §16). Unknown values stay `null` and are not rendered;
 * empty lists render nothing. Reusable later by /llms.txt and JSON-LD.
 */

export type Education = {
  institution: string;
  degree: string | null;
  field: string | null;
  period: string | null;
};

export const education: Education[] = [
  {
    institution: "Daffodil International University",
    // TODO(content): degree, field and years — add only real values.
    degree: null,
    field: null,
    period: null,
  },
];

export type Certification = {
  /** Slug; also the image filename in public/certificates/. */
  id: string;
  name: string;
  /** Capability group on /about — same ids and order as the /skills categories. */
  category: SkillCategoryId;
  provider: string;
  /** Content partner when it differs from the platform. */
  partner?: string;
  issued: string;
  /** ISO date for `<time dateTime>`. */
  issuedIso: string;
  credentialId?: string;
  url?: string;
  /** Certificate image, landscape (~1600px wide, < 250 KB), e.g. `/certificates/<id>.jpg`. */
  image?: string;
};

export const certifications: Certification[] = [
  // TODO(content): owner to add the other certificates (name, provider, date, credential, category, image).
  {
    id: "fundamentals-of-nestjs",
    name: "Fundamentals of NestJS",
    category: "backend",
    provider: "Coursera",
    partner: "Board Infinity",
    issued: "Nov 2024",
    issuedIso: "2024-11-28",
    credentialId: "HS002PTYCOEF",
    url: "https://www.coursera.org/account/accomplishments/verify/HS002PTYCOEF",
  },
];

export type CertificationGroup = {
  category: SkillCategoryId;
  title: string;
  items: Certification[];
};

/** Certificates grouped by capability in /skills order (AI-first), newest first; empty groups dropped. */
export function certificationGroups(list: Certification[] = certifications): CertificationGroup[] {
  return skillCategories
    .map((cat) => ({
      category: cat.id,
      title: cat.title,
      items: list
        .filter((c) => c.category === cat.id)
        .sort((a, b) => b.issuedIso.localeCompare(a.issuedIso)),
    }))
    .filter((g) => g.items.length > 0);
}

export type Publication = {
  title: string;
  /** `self` marks the owner, shown in bold. */
  authors: { name: string; self?: boolean }[];
  venue: string;
  year: string;
  url?: string;
  summary?: string;
};

// Owner decision: no publications listed for now. Add only peer-reviewed / public work.
export const publications: Publication[] = [];
