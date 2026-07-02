import resumeData from "@/data/resume.json";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Path } from "@/components/Path";
import { Milestone, type MilestoneIcon } from "@/components/Milestone";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";

type Experience = (typeof resumeData.experience)[number] & {
  emphasis?: "before" | "big-moment";
};
type Education = (typeof resumeData.education)[number] & {
  emphasis?: "before" | "big-moment";
  activities?: string[];
};

const COMPANY_ICONS: Record<string, MilestoneIcon> = {
  Autodesk: "trending-up",
  Barter: "rocket",
  DoorDash: "truck",
  Flexport: "ship",
  "Dartmouth College": "graduation-cap",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatRange(start: string | null, end: string | null) {
  if (!start && !end) return "Ongoing";
  const fmt = (s: string | null) => {
    if (!s) return "";
    if (s === "Present") return "Present";
    const [year, month] = s.split("-");
    const m = month ? MONTHS[parseInt(month, 10) - 1] : undefined;
    return m ? `${m} ${year}` : year;
  };
  return [fmt(start), fmt(end)].filter(Boolean).join(" — ");
}

export default function Home() {
  const { name, headline, summary, experience, education, skills, links } =
    resumeData;
  const certifications =
    (resumeData as { certifications?: string[] }).certifications ?? [];

  const allExp = experience as Experience[];
  const independent = allExp.find((e) => e.company === "Independent");
  const pathExperience = allExp
    .filter((e) => e.company !== "Independent")
    .sort((a, b) => {
      if (!a.start) return 1;
      if (!b.start) return -1;
      return b.start.localeCompare(a.start);
    });

  const edu = education[0] as Education | undefined;

  const milestones: Array<{
    key: string;
    title: string;
    subtitle?: string;
    icon: MilestoneIcon;
    bullets: string[];
    emphasis?: "before" | "big-moment";
  }> = [];

  pathExperience.forEach((role, idx) => {
    milestones.push({
      key: `role-${idx}`,
      title: role.role,
      subtitle: `${role.company} · ${formatRange(role.start, role.end)}`,
      icon: COMPANY_ICONS[role.company] ?? "briefcase",
      bullets: role.bullets ?? [],
      emphasis: role.emphasis,
    });
  });

  if (edu) {
    milestones.push({
      key: "edu",
      title: edu.school,
      subtitle: `${edu.degree}, ${edu.field} · ${formatRange(edu.start, edu.end)}`,
      icon: COMPANY_ICONS[edu.school] ?? "graduation-cap",
      bullets: edu.activities ?? ["Where the story begins."],
      emphasis: edu.emphasis,
    });
  }

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
            const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
            const cap = m.key === "edu" ? m.bullets.length : 4;
            return (
              <Milestone
                key={m.key}
                side={side}
                icon={m.icon}
                emphasis={m.emphasis}
                title={m.title}
                subtitle={m.subtitle}
                bullets={m.bullets.slice(0, cap)}
                index={i}
              />
            );
          })}
        </Path>

        <Skills
          skills={skills}
          certifications={certifications}
          alsoCurrently={{
            items: [
              ...(independent?.bullets ?? []),
              <>
                Running{" "}
                <a
                  href="https://buildbeautifully.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[color:var(--accent-warm)] underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  Building Beautifully
                </a>{" "}
                — an AI workshop series teaching non-technical people to build
                with Claude Code.
              </>,
            ],
          }}
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
