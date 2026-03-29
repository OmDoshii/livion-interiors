"use client";

const STRIP_TEXT =
  "PREMIUM INTERIORS\u2002·\u2002HYDERABAD\u2002·\u2002TURNKEY EXECUTION\u2002·\u20022BHK TO VILLAS\u2002·\u2002BESPOKE DESIGN\u2002·\u2002200+ PROJECTS\u2002·\u2002";

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden flex items-center"
      style={{ backgroundColor: "#2C2825", height: "48px" }}
      aria-hidden="true"
    >
      {/* Two identical spans create a seamless loop */}
      <div className="flex animate-marquee whitespace-nowrap shrink-0">
        <span
          className="font-body uppercase shrink-0"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#7A736E",
          }}
        >
          {STRIP_TEXT}
        </span>
        <span
          className="font-body uppercase shrink-0"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#7A736E",
          }}
        >
          {STRIP_TEXT}
        </span>
        {/* Third copy prevents any gap at the wrap point */}
        <span
          className="font-body uppercase shrink-0"
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#7A736E",
          }}
        >
          {STRIP_TEXT}
        </span>
      </div>
    </div>
  );
}
