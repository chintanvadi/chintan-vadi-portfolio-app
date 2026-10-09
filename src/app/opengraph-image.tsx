import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 0%, rgba(200,255,61,0.25), #07080a 55%)",
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#c8ff3d",
              color: "#07080a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            CV
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)" }}>{profile.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#c8ff3d", marginTop: 8 }}>{profile.title}</div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.55)", marginTop: 20 }}>
            React · TypeScript · Browser Extensions · Laravel · Node.js
          </div>
        </div>
      </div>
    ),
    size,
  );
}
