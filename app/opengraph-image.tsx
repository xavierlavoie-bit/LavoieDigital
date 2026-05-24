import { ImageResponse } from "next/og";

export const alt = "Lavoie Digital — Studio code & web · Québec";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(180,200,255,0.18), transparent 70%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />

        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
            opacity: 0.5,
          }}
        />

        {/* Top row — masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 18,
            }}
          >
            <div style={{ width: 3, height: 9, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
            <div style={{ width: 3, height: 13, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
            <div style={{ width: 3, height: 17, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />
          </div>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>N°001</span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
          <span>Studio · Code &amp; Web</span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
          <span>Québec, CA</span>
        </div>

        {/* Center — wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 144,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 0.9,
              backgroundImage:
                "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            LAVOIE
          </div>
          <div
            style={{
              fontSize: 144,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 0.9,
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            DIGITAL
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Applications full-stack · Sites web premium · Branding
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                letterSpacing: -0.5,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              On code, vous grandissez.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <span>EST. MMXXVI</span>
            <span>lavoiedigital.ca</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
