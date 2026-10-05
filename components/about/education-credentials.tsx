import { Reveal } from "@/components/animations/reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { credentialsCopy } from "@/content/about";
import { certificationGroups, certifications, education } from "@/content/credentials";
import { CertificationBrowser } from "./certification-browser";

/** Education, then certifications as a spotlight + capability index — part of the story, not a resume dump. */
export function EducationCredentials() {
  return (
    <Section aria-labelledby="education-title">
      <SectionHeader
        id="education-title"
        label="Education"
        index={4}
        title={credentialsCopy.title}
        intro={credentialsCopy.intro}
      />

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5 lg:col-start-4">
          <section aria-labelledby="education-list-title">
            <h3 id="education-list-title" className="label-mono text-muted-foreground">
              Education
            </h3>
            <ul className="mt-6">
              {education.map((item) => {
                const program = [item.degree, item.field].filter(Boolean).join(", ");
                return (
                  <li key={item.institution} className="border-t pt-6">
                    <p className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                      {item.institution}
                    </p>
                    {program && <p className="mt-3 font-medium text-muted-foreground">{program}</p>}
                    {item.period && (
                      <p className="label-mono mt-3 text-muted-foreground">{item.period}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </Reveal>
      </div>

      {certifications.length > 0 && (
        <Reveal className="mt-20 md:mt-28">
          <section aria-labelledby="certifications-title">
            <h3
              id="certifications-title"
              className="label-mono flex items-center gap-3 text-muted-foreground"
            >
              Courses & certifications
              <span className="text-foreground/40">
                {String(certifications.length).padStart(2, "0")}
              </span>
            </h3>
            <div className="mt-2">
              <CertificationBrowser groups={certificationGroups()} />
            </div>
          </section>
        </Reveal>
      )}
    </Section>
  );
}
