import Link from "next/link";
import projects from "@/data/projects.json";

type Project = (typeof projects)[number];

export default function BuildsPage() {
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-10 py-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-5xl md:text-6xl text-ink mb-4">
          My AI Builds
        </h1>
        <p className="font-heading italic text-ink-soft text-lg mb-16">
          A growing list of what I&rsquo;ve made and what I&rsquo;ve learned.
        </p>

        <div className="space-y-12">
          {sorted.map((p: Project, idx) => (
            <article key={p.id}>
              <h2 className="font-heading text-3xl md:text-4xl text-ink leading-snug">
                {p.title}
              </h2>
              <p className="mt-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft underline underline-offset-4 hover:text-ink transition-colors break-all"
                >
                  {p.url}
                </a>
              </p>
              <p className="mt-5 text-base md:text-lg text-ink/85 leading-[1.7]">
                {p.description}
              </p>
              <p className="mt-5 text-sm md:text-base italic text-ink-soft">
                Tools I used: {p.toolsLearned.join(", ")}
              </p>
              {idx < sorted.length - 1 && (
                <hr className="mt-12 border-ink/10" />
              )}
            </article>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-ink/10">
          <Link
            href="/"
            className="text-sm text-ink-soft hover:text-ink transition-colors"
          >
            &larr; back to my journey
          </Link>
        </div>
      </div>
    </main>
  );
}
