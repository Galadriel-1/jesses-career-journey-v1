export function Footer({
  email,
  linkedin,
  github,
}: {
  email: string | null;
  linkedin: string | null;
  github: string | null;
}) {
  return (
    <footer className="border-t border-ink/10 mt-24 py-12 px-6">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-soft">
        <p className="font-heading italic">Thanks for scrolling.</p>
        <div className="flex gap-6">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-ink transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
