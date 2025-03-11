import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HUST Research Clubs Network";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f1f5f9)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.svg`}
          alt="Logo"
          width={200}
          height={200}
          style={{ marginBottom: 40 }}
        />
        <h1
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "#003366",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          HUST Research Clubs Network
        </h1>
        <p
          style={{
            fontSize: 30,
            color: "#64748b",
            textAlign: "center",
          }}
        >
          Kết nối, Thúc đẩy, Đổi mới
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
