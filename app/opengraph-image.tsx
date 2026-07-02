import { ImageResponse } from "next/og";
import resumeData from "@/data/resume.json";

export const alt = `${resumeData.name} — ${resumeData.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 1000) return null;
    return buf;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [cormorant, inter] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-500-normal.ttf"
    ),
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf"
    ),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }[] = [];
  if (cormorant) fonts.push({ name: "Cormorant", data: cormorant, weight: 500, style: "normal" });
  if (inter) fonts.push({ name: "Inter", data: inter, weight: 400, style: "normal" });

  const cream = "#F6F2F9";
  const ink = "#241C2E";
  const inkSoft = "#6D6478";
  const accent = "#8A63B8";

  const Star = ({
    sz,
    glow,
    fill,
  }: {
    sz: number;
    glow?: boolean;
    fill: string;
  }) => (
    <svg
      width={sz}
      height={sz}
      viewBox="0 0 40 40"
      style={{
        filter: glow
          ? `drop-shadow(0 0 16px ${accent}aa) drop-shadow(0 0 6px ${accent})`
          : "none",
      }}
    >
      <path
        d="M20 4 L24.2 15.5 L36 16.4 L26.8 24 L29.8 35.6 L20 29 L10.2 35.6 L13.2 24 L4 16.4 L15.8 15.5 Z"
        fill={fill}
        stroke={ink}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );

  const headingFont = cormorant ? "Cormorant" : "Georgia, serif";
  const bodyFont = inter ? "Inter" : "system-ui, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${cream} 0%, #EDE3F4 60%, #DDCCEC 100%)`,
          fontFamily: bodyFont,
          padding: "70px 80px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: inkSoft,
                margin: 0,
              }}
            >
              A career, in milestones
            </p>
            <h1
              style={{
                fontFamily: headingFont,
                fontSize: 160,
                lineHeight: 0.95,
                color: ink,
                margin: "20px 0 0 0",
                fontWeight: 500,
                letterSpacing: -2,
              }}
            >
              {resumeData.name}
            </h1>
            <p
              style={{
                fontFamily: headingFont,
                fontStyle: "italic",
                fontSize: 44,
                color: inkSoft,
                margin: "16px 0 0 0",
                lineHeight: 1.15,
                maxWidth: 720,
              }}
            >
              {resumeData.headline}
            </p>
          </div>
          <p
            style={{
              fontSize: 22,
              color: accent,
              letterSpacing: 4,
              textTransform: "uppercase",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Where I Am Now &nbsp;&#183;&nbsp; Autodesk
          </p>
        </div>

        <div
          style={{
            width: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <svg
            width="200"
            height="490"
            viewBox="0 0 200 490"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path
              d="M 100 0 C 20 100, 180 180, 100 240 C 20 300, 180 400, 100 490"
              stroke={ink}
              strokeOpacity="0.3"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 8"
            />
          </svg>
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            <Star sz={50} fill={cream} />
          </div>
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            <Star sz={50} fill={cream} />
          </div>
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            <Star sz={50} fill={cream} />
          </div>
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            <Star sz={90} fill={accent} glow />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
