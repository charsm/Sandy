import { ImageResponse } from "@vercel/og";
import type { CollectionEntry } from "astro:content";
import { Config } from "~/config";

export default async function handler({
  data: { title },
}: CollectionEntry<"posts">) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
          backgroundImage: "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontStyle: "normal",
            color: "white",
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
          }}
        >
          <b>{title}</b>
        </div>
        <div
          style={{
            fontSize: 30,
            display: "flex",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          By {Config.base.author}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
