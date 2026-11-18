import { ImageResponse } from "next/og";

export const alt = "Muhammad Ali Ridho | Portfolio";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc",
                    padding: 48,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff",
                        border: "2px solid #e5e5e5",
                        borderRadius: 40,
                        padding: 64,
                    }}
                >
                    {/* Top Row: Role Pill & Accent Mark */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#0a0a0a",
                                color: "#ffffff",
                                padding: "12px 24px",
                                borderRadius: 9999,
                                fontSize: 16,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                            }}
                        >
                            STATISTICIAN  •  TECH ENTHUSIAST  •  WRITER
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 56,
                                height: 56,
                                borderRadius: 9999,
                                border: "2px solid #e5e5e5",
                                backgroundColor: "#f8fafc",
                                color: "#0a0a0a",
                                fontSize: 18,
                                fontWeight: 800,
                            }}
                        >
                            MAR
                        </div>
                    </div>

                    {/* Center Block: Name, Rule & Slogan */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 72,
                                fontWeight: 800,
                                color: "#0a0a0a",
                                letterSpacing: "-0.03em",
                                lineHeight: 1.08,
                            }}
                        >
                            Muhammad Ali Ridho
                        </div>

                        <div
                            style={{
                                width: 72,
                                height: 4,
                                backgroundColor: "#0a0a0a",
                                marginTop: 24,
                                marginBottom: 24,
                            }}
                        />

                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 500,
                                color: "#525252",
                                lineHeight: 1.4,
                                maxWidth: 880,
                            }}
                        >
                            Less manual work, zero server bills, and tools people actually use.
                        </div>
                    </div>

                    {/* Bottom Bar: Stack Tag & Domain Pill */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            borderTop: "1px solid #e5e5e5",
                            paddingTop: 28,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 500,
                                color: "#737373",
                            }}
                        >
                            GAS-First Automation  •  Data Systems  •  Editorial Writing
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #e5e5e5",
                                color: "#0a0a0a",
                                padding: "10px 22px",
                                borderRadius: 9999,
                                fontSize: 18,
                                fontWeight: 700,
                            }}
                        >
                            muhammadaliridho.my.id
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
