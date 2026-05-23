import resumeData from "@/data/resume.json";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Path } from "@/components/Path";
import { Milestone } from "@/components/Milestone";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";

type Experience = (typeof resumeData.experience)[number] & {
  emphasis?: "before" | "big-moment";
};
type Education = (typeof resumeData.education)[number] & {
  emphasis?: "before" | "big-moment";
  activities?: string[];
};

const ORNAMENTS = ["star", "flower", "moon"] as const;

function formatRange(start: string | null, end: string | null) {
  if (!start && !end) return "Ongoing";
  const fmt = (s: string | null) => {
    if (!s) return "";
    if (s === "Present") return "Present";
    const [year] = s.split("-");
    return year;
  };
  return [fmt(start), fmt(end)].filter(Boolean).join(" — ");
}

export default function Home() {
  const { name, headline, summary, experience, education, skills, links } =
    resumeData;

  const allExp = experience as Experience[];
  const independent = allExp.find((e) => e.company === "Independent");
  const pathExperience = allExp
    .filter((e) => e.company !== "Independent")
    .sort((a, b) => {
      if (!a.start) return 1;
      if (!b.start) return -1;
      return a.start.localeCompare(b.start);
    });

  const edu = education[0] as Education | undefined;

  const milestones: Array<{
    key: string;
    meta: string;
    title: string;
    subtitle?: string;
    bullets: string[];
    emphasis?: "before" | "big-moment";
  }> = [];

  if (edu) {
    milestones.push({
      key: "edu",
      meta: `${edu.start} — ${edu.end}`,
      title: edu.school,
      subtitle: `${edu.degree}, ${edu.field}`,
      bullets: edu.activities ?? ["Where the story begins."],
      emphasis: edu.emphasis,
    });
  }

  pathExperience.forEach((role, idx) => {
    milestones.push({
      key: `role-${idx}`,
      meta: formatRange(role.start, role.end),
      title: role.company,
      subtitle: role.role,
      bullets: role.bullets ?? [],
      emphasis: role.emphasis,
    });
  });

  return (
    <>
      <Nav />
      <main className="bg-background text-foreground">
        <Hero
          name={name}
          headline={headline}
          summary={summary}
          linkedin={links.linkedin}
        />

        <Path>
          {milestones.map((m, i) => {
            const shape = ORNAMENTS[i % ORNAMENTS.length];
            const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
            const cap = m.key === "edu" ? m.bullets.length : 4;
            return (
              <Milestone
                key={m.key}
                side={side}
                shape={shape}
                emphasis={m.emphasis}
                meta={m.meta}
                title={m.title}
                subtitle={m.subtitle}
                index={i}
              >
                {m.bullets.slice(0, cap).map((b, j) => (
                  <p key={j}>&mdash; {b}</p>
                ))}
              </Milestone>
            );
          })}
        </Path>

        <Skills
          skills={skills}
          alsoCurrently={
            independent
              ? {
                  title: independent.role,
                  description: (independent.bullets ?? []).join(" "),
                }
              : undefined
          }
        />

        <Footer
          email={links.email}
          linkedin={links.linkedin}
          github={links.github}
        />
      </main>
    </>
  );
}
